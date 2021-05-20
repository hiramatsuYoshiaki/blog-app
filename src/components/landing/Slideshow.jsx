import React,{useRef,useState,useEffect} from 'react' 
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router' 
import {Plane,useCurtains} from 'react-curtains'
import {gsap} from 'gsap'
// import indigo from '@material-ui/core/colors/indigo';
import {makeStyles} from '@material-ui/core/styles'
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MouseIcon from '@material-ui/icons/Mouse';
// import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// import SwapVertIcon from '@material-ui/icons/SwapVert';
// import TouchAppIcon from '@material-ui/icons/TouchApp';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// import { TabList } from '@material-ui/lab';
// import noImage from '../../assets/img/img4121_flat.jpg'
const useStyles = makeStyles((theme) => ({
    Slideshow: {
        position: 'absolute',
        top: '0%',
        right: '4%',
        bottom: '0%',
        left: '4%',
        zIndex: 15,
      
        cursor: 'pointer',
        fontSize: '1em',
        color: 'white',
        '& img':{
            display: 'none',
        },
      }, 
    silderHeader:{
      width:'100%',
      minHeight: 'calc(100vh - 6.4rem)',
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between'
    },
    sliderTop:{
      height:'auto',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      paddingTop:'1.6rem',
      [theme.breakpoints.up('lg')]:{
        height:'50vh',
        paddingTop:'3.2rem',
        justifyContent:'flex-start',
        alignItems:'center',
      },
      overflow:'hidden',
    },
    sliderBottom:{
      display:'block',
      [theme.breakpoints.up('lg')]:{
        display:'flex',
        maxHeight:'50vh',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
      },
      paddingBottom:'2rem',
      overflow:'hidden',
    },
    sliderTitle:{
      width:'100%',
      padding:'.8rem',
      overflow: 'hidden',
      // border:'1px solid blue',
      '& h3':{
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        WebkitLineClamp: 2,
        overflow: 'hidden',
        fontWeight:500,
        opacity:1,
      
      },
      [theme.breakpoints.up('lg')]:{
        width:'50%',
        maxWidth:'600px',
        padding:'0 1.8rem',
      }
    },
    stageNo:{
      dispaly:'inline-block',
        marginRight:'1.4rem',
        textShadow: '2px 2px 4px rgba(0,0,0,1)',
    },
    stageTitle:{
        marginRight:'.4rem',
        textShadow: '2px 2px 4px rgba(0,0,0,1)',
    },
    sliderArticle:{
      width:'100%',
      overflow: 'hidden',
      padding:'.8rem',
      textShadow: '2px 2px 4px rgba(0,0,0,1)',
      
      // border:'1px solid orange',
      
      '& h5':{
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        WebkitLineClamp: 5,
        overflow: 'hidden',
        marginBottom:'1rem',
        opacity:1,
      
      },
      [theme.breakpoints.up('lg')]:{
        width:'50%',
        maxWidth:'600px',
        padding:'0 1.8rem',
      },
    },
    sliderLinkArrow:{
      padding:'2rem 0',
      '&:hover $discoverBorder':{
        padding: '0 0 0 155px',
        transitionDuration:'1s',
        transitionTimingFunction:'ease-in-out'
      },
      '&:hover $discoverBorder:before' :{
        opacity:1,
        transitionDuration:'2s',
        transitionTimingFunction:'ease-in-out'
      },
      '&:hover $discoverBorder:after' :{
        opacity:0,
        transitionDuration:'.5s',
        transitionTimingFunction:'ease-in-out'
      },
    },
    discoverBorder:{
      transition:.4,
      position: 'relative',
      display: 'inline-block',
      padding: '0 155px 0 0',
      fontWeight:600,
      transitionDuration:'1s',
      transitionTimingFunction:'ease-in-out',
      '&:before':{
        content: '""',
        position: 'absolute',
        top: '50%',
        left: 0,
        display: 'inline-block',
        width: '150px',
        height: '4px',
        backgroundColor: 'white',
        opacity:0,
        transitionDuration:'.5s',
        transitionTimingFunction:'ease-in-out',
      },
      '&:after':{
        content: '""',
        position: 'absolute',
        top: '50%',
        right:0,
        display: 'inline-block',
        width: '150px',
        height: '4px',
        backgroundColor: 'white',
        opacity:1,
        transitionDuration:'2s',
        transitionTimingFunction:'ease-in-out',
      }
    },
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
    const dispatch = useDispatch()

    const posts = props.posts

    const [plane, setPlane] = useState(null);

    const sliderBottomRef = useRef([])
    sliderBottomRef.current = []
    // セクションへのすべての参照をrevealRefs.current配列に追加する
    const addToSliderBottomRef = el => {
        if(el && ! sliderBottomRef.current.includes(el)){
             sliderBottomRef.current.push(el)
        }
        // console.log(sliderBottomRef.current);
    }
    useEffect(()=>{
      // console.log('sliderBottomRef',sliderBottomRef.current);
      if (sliderBottomRef.current.length > 0 && sliderBottomRef.current && activeTex.current){
        let tl = gsap.timeline();
        sliderBottomRef.current.forEach((el,index)=> {
          tl.fromTo(el.querySelector('.stageNo'),1,{opacity: 0, x: '100px', duration: 0},{opacity: 1, x: 0,})
          .fromTo(el.querySelector('.stageTitle'),.5,{opacity: 0, x: '100px', duration: 0},{opacity: 1, x: 0,})
          .fromTo(el.querySelector('.article'),1,{opacity: 0, x: '100px', duration: 0},{opacity: 1, x: 0,})
          .fromTo(el.querySelector('.sliderLink'),.5,{opacity: 0, x: '100px', duration: 0},{opacity: 1, x: 0,})
        }) 
      }
    },[sliderBottomRef.current]) 

    // const iconRef = useRef() 
    // useEffect(()=>{
    //     const tl = gsap.timeline();
    //     tl.fromTo(iconRef.current,
    //       { opacity:0, y:-60,repeatDelay:5,duration:5},
    //       { opacity:1, y:0,repeat: -1,repeatDelay:5,duration:5,ease:Power3.easeIn }) 
    // },[iconRef.current,props.id])

    

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
          duration: 2.75,
          value: 90,
          ease: "power3.inOut",
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
    }, [slideshowInner.current]);
    
    return (
      <div>
      {posts.length > 0 &&(
        
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
              
                <div className={classes.silderHeader}>
                  <div className={classes.sliderTop}>
                    <h1 className="c-glitch c-about-glich" 
                        data-text="TOURdeHDR" >TOURdeHDR
                    </h1>

                    <p className="c-about-header-sub" >
                      <span>NEXT POSTS CLICK</span>
                      {/* <span><NavigateNextIcon style={{ fontSize:38, color: indigo[300] }}/></span> */}
                    </p>
                    {/* <div className="c-topimagearea-scroll" ref={iconRef}> */}
                    {/* <h5>SCROLL</h5> */}
                     {/* <MouseIcon /> */}
                     {/* <ExpandMoreIcon style={{ fontSize: 100, color: indigo[100] }}/> */}
                    {/* </div> */}
                  </div>
                  <div >
                    {
                      posts.map((post,index) => (
                        activeTexture === (index + 1) && (
                          <div key={post.topImages[0].id} 
                               className={classes.sliderBottom} 
                               ref={addToSliderBottomRef}
                               >
                            <div className={classes.sliderTitle} 
                                //  onClick={() => dispatch(push('/post/detail/' + post.id))} 
                                //  onClick={() => dispatch(push('/stage/detail/' + post.stage.id))} 
                            > 
                              

                              <h1 className="stageNo">
                                {/* <span className={classes.span}>{post.stage.stageYear}</span> */}
                                <span  className={classes.stageNo}>STAGE</span>
                                <span  className={classes.stageNo}>{post.stage.stageNo}</span>
                              </h1>
                              <h3 className="stageTitle">
                                <span className={classes.stageTitle}>{post.stage.stage}</span>
                              </h3>
                            </div>

                            
                            <div className={classes.sliderArticle} >
                              <h5 className="article">
                                {post.article}
                              </h5>
                              <div className='sliderLink'>
                                  <div className={classes.sliderLinkArrow}>
                                    
                                      <div className={classes.discoverBorder}
                                            onClick={()=>dispatch(push('/stage/detail/' + post.stage.id))}
                                      >
                                        DISCOVER
                                      </div>
                                  </div>
                              </div>
                            </div>
                            
                          </div>
                        )
                      ))
                    }
                  </div>
                  
                 
                </div>
                {/* <div className="c-about-header-wraper">
                  
                  <h1 className="c-glitch c-about-glich" 
                      data-text="TOURdeHDR" >TOURdeHDR
                  </h1>
                  <h5 className="c-about-header-sub" >h-works</h5> 
                  <div className="c-about-header-mouse">
                    <MouseIcon style={{ fontSize: 30 }}/>
                    <div className="c-about-header-click">Click Next Photo!</div>
                    <div className="c-about-header-click">Scroll New Stages & Posts</div>
                   
                  </div>
                </div> */}
                <img
                    src="https://www.curtainsjs.com/examples/medias/displacement.jpg"
                    data-sampler="displacement"
                    alt=""
                    key="displacement"
                />
                {
                  posts.map((post) => (
                    // <img src={post.topImages[0].path} 
                    //   alt={post.title} 
                    //   key={post.topImages[0].id}
                    // />
                    <img src={post.postImages[0].path} 
                      alt={post.postImages[0].description} 
                      key={post.postImages[0].id}
                    />
                  ))
                }
            </div>
        </Plane>
        )
      }
      </div>

    )
}


export default Slideshow
