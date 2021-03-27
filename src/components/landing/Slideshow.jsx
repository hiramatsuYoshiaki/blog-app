import React,{useRef,useState,useEffect} from 'react' 
import {Plane,useCurtains} from 'react-curtains'
import gsap from 'gsap'
import {makeStyles} from '@material-ui/core/styles'
import noImage from '../../assets/img/img4121_flat.jpg'
const useStyles = makeStyles((theme) => ({
    Slideshow: {
        position: 'absolute',
        top: '0%',
        right: '4%',
        bottom: '4%',
        left: '4%',
        zIndex: 15,
      
        cursor: 'pointer',
        fontSize: '1em',
        color: 'white',
      
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        '& img':{
            display: 'none',
            // width:'100%',
            // height:'auto'
        },
        // width:'100vw',
        // heught:'100vh'
      } 
      
}))
const vertexShader = `
  precision mediump float;
  // default mandatory variables
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
  // varyings : notice we've got 3 texture coords varyings
  // one for the displacement texture
  // one for our visible texture
  // and one for the upcoming texture
  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;
  varying vec2 vActiveTextureCoord;
  varying vec2 vNextTextureCoord;
  // textures matrices
  uniform mat4 activeTexMatrix;
  uniform mat4 nextTexMatrix;
  // custom uniforms
  uniform float uTransitionTimer;
  void main() {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    // varyings
    vTextureCoord = aTextureCoord;
    vActiveTextureCoord = (activeTexMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
    vNextTextureCoord = (nextTexMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
    vVertexPosition = aVertexPosition;
  }
`;

const fragmentShader = `
  precision mediump float;
  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;
  varying vec2 vActiveTextureCoord;
  varying vec2 vNextTextureCoord;
  // custom uniforms
  uniform float uTransitionTimer;
  // our textures samplers
  // notice how it matches the sampler attributes of the textures we created dynamically
  uniform sampler2D activeTex;
  uniform sampler2D nextTex;
  uniform sampler2D displacement;
  void main() {
    // our displacement texture
    vec4 displacementTexture = texture2D(displacement, vTextureCoord);
    // slides transitions based on displacement and transition timer
    vec2 firstDisplacementCoords = vActiveTextureCoord + displacementTexture.r * ((cos((uTransitionTimer + 90.0) / (90.0 / 3.141592)) + 1.0) / 1.25);
    vec4 firstDistortedColor = texture2D(activeTex, vec2(vActiveTextureCoord.x, firstDisplacementCoords.y));
    // same as above but we substract the effect
    vec2 secondDisplacementCoords = vNextTextureCoord - displacementTexture.r * ((cos(uTransitionTimer / (90.0 / 3.141592)) + 1.0) / 1.25);
    vec4 secondDistortedColor = texture2D(nextTex, vec2(vNextTextureCoord.x, secondDisplacementCoords.y));
    // mix both texture
    vec4 finalColor = mix(firstDistortedColor, secondDistortedColor, 1.0 - ((cos(uTransitionTimer / (90.0 / 3.141592)) + 1.0) / 2.0));
    // handling premultiplied alpha
    finalColor = vec4(finalColor.rgb * finalColor.a, finalColor.a);
    gl_FragColor = finalColor;
  }
`;


const Slideshow = props => {
    const classes = useStyles()
    console.log('Slideshow');
    console.log(props.posts);
    // const [value, setValue] = React.useState(null)
    // setValue({...value, props.newValue})

    // const [posts, setPosts] = useState([])
    const posts = props.posts
    // setPosts(prevState => [...prevState,propsPosts]);//配列に追加

    // console.log('posts',posts);





    const [plane, setPlane] = useState(null);
    const slideshowInner = useRef(null);
    // slideshow states
    const [activeTexture, setActiveTexture] = useState(1);
    const [maxTextures, setMaxTextures] = useState(0);
    const isChanging = useRef(false);
    const tween = useRef(null);
    const activeTex = useRef(null);
    const nextTex = useRef(null);
    const uniforms = {
        transitionTimer: {
          name: "uTransitionTimer",
          type: "1f",
          value: 0
        }
      };
    const onLoading = (plane, texture) => {
        // improve texture rendering on small screens with LINEAR_MIPMAP_NEAREST minFilter
        texture.setMinFilter(texture.gl.LINEAR_MIPMAP_NEAREST);
      };
    
    const onReady = (plane) => {
      setPlane(plane);
    };
    const onClick = () => {
      if (!isChanging.current && plane) {
        isChanging.current = true;
  
        // check what will be next image
        let nextTextureIndex;
        if (activeTexture < maxTextures) {
          nextTextureIndex = activeTexture + 1;
        } else {
          nextTextureIndex = 1;
        }
        // apply it to our next texture
        nextTex.current.setSource(plane.images[nextTextureIndex]);
  
        tween.current = gsap.to(plane.uniforms.transitionTimer, {
          duration: 1.75,
          value: 90,
          ease: "power2.inOut",
          onComplete: () => {
            isChanging.current = false;
            tween.current = null;
  
            plane.uniforms.transitionTimer.value = 0;
  
            const activeTextureIndex = nextTextureIndex;
            // our next texture becomes our active texture
            activeTex.current.setSource(plane.images[activeTextureIndex]);
            setActiveTexture(activeTextureIndex);
          }
        });
      }
    };
    
    useCurtains(
      (curtains) => {
        if (plane) {
          // first we set our very first image as the active texture
          activeTex.current = plane.createTexture({
            sampler: "activeTex",
            fromTexture: plane.textures[activeTexture]
          });
          // next we set the second image as next texture but this is not mandatory
          // as we will reset the next texture on slide change
          nextTex.current = plane.createTexture({
            sampler: "nextTex",
            fromTexture: plane.textures[activeTexture + 1]
          });
        }
      },
      [plane]
    );
    useEffect(() => {
      if (slideshowInner.current) {
        setMaxTextures(slideshowInner.current.childElementCount - 2);
      }
  
      let currentTween = tween.current;
      return () => {
        if (currentTween) {
          currentTween.kill();
        }
      };
    }, []);
    


 
    return (
        <Plane
            className={classes.Slideshow} 
            // plane init parameters
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
            // plane events
            onLoading={onLoading}
            onReady={onReady}
            onClick={onClick} 
        >
            <div ref={slideshowInner}>
                
                <div className="c-about-header-wraper">
                  <div>Click !</div>
                  <h1 className="c-glitch c-about-glich" 
                      data-text="TOURdeHDR" >TOURdeHDR
                  </h1>
                  <span className="c-about-header-sub" >h-works</span> 
                </div>
               
                <img
                    src="https://www.curtainsjs.com/examples/medias/displacement.jpg"
                    data-sampler="displacement"
                    alt=""
                />
                {/* <img src="https://unsplash.it/1920/1080?random=1" alt="" />
                <img src="https://unsplash.it/1920/1080?random=2" alt="" />
                <img src="https://unsplash.it/1920/1080?random=3" alt="" />
                <img src="https://unsplash.it/1920/1080?random=4" alt="" /> */}

               
                {
                posts.length > 0 ?(
                  posts.map((post) => (
                    <img src={post.topImages[0].path} 
                      alt={post.title} 
                      key={post.topImages[0].id}
                    />
                  ))
                )
                :(
                  <img src={noImage} alt="" />
                )
                }

                {/* <img src={posts[0].topImages[0].path} alt="" /> 
                <img src={posts[1].topImages[0].path} alt="" /> 
                <img src={posts[2].topImages[0].path} alt="" />  */}

            </div>

        </Plane>
    )
}


export default Slideshow
