import React,{useRef,useState,useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
//react-curtains
// import {Plane,useCurtains,useCurtainsEvent} from 'react-curtains'
// import SinglePlaneHorizontal from "./SinglePlaneHorizontal.jsx";
import {Plane,useCurtains} from 'react-curtains'
// gsap
import {gsap} from  'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const useStyles = makeStyles((theme) => ({
    //gsap
    root:{
        width:'100%',
        height:'100%',
        backgroundColor:'white',
        overflow:'hidden'
    },
    main: {
        display:'flex',
        flexWrap:'wrap',
        flexDirection:'column',
        height:'70vh',
        willChange: 'transform',
      },
      
      section: {
        background: 'blue',
        height:'100%',
        display:'flex',
        width: '60vw',
        marginRight: '4vw',
        'nth-child(2n)': {
            background: '#eee',
        },
        position: 'relative',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',

      },
      text: {
        height: '80vh',
        padding: '5%',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2em',
        width: '100%',
        overflowX: 'hidden',
      },
      //react-curtains
    //   MultiplePlanes: {
    //     width: '80vw',
    //     margin: '0 auto',
    //     padding: '40px 0',
    //     position: 'relative',
    //     zIndex: 2,
    //     textAlign: 'center',
    //     overflowAnchor: 'none',
    // },
    
    // MultiplePlanesWrapper: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    // },
    
    // MultiplePlanesAddPlanes: {
    //     '-webkit-appearance': 'none',
    //     border: 0,
    //     font: 'inherit',
    //     cursor: 'pointer',
    //     background: '#ee6557',
    //     color: 'white',
    //     display: 'inline-block',
    //     padding: '0.25em 0.5em',
    //     '&:hover': {
    //         background: 'black',
    //     }
    // },
    Slideshow: {
        position: 'absolute',
        top: '5%',
        right: '5%',
        bottom: '5%',
        left: '5%',
        zIndex: 15,
      
        cursor: 'pointer',
        fontSize: '3em',
        color: 'white',
      
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        '& img':{
            display: 'none'
        }
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

const MultiplePanelWithScrollTriger = props => {
    const classes = useStyles()
    //react-curtains
    // const [nbPlanes, setNbPlanes] = useState(4);
    // const [planes, setPlanes] = useState([]);

    // const planesDeformations = useRef(0);
    // useCurtainsEvent(
    //     "onRender",
    //     (curtains) => {
    //       // update our planes deformation
    //       // increase/decrease the effect
    //       planesDeformations.current = curtains.lerp(
    //         planesDeformations.current,
    //         0,
    //         0.075
    //       );
    
    //       // update planes deformations
    //       planes.forEach((plane) => {
    //         plane.uniforms.planeDeformation.value = planesDeformations.current;
    //       });
    //     },
    //     [planes]
    //   );
    // useCurtainsEvent("onScroll", (curtains) => {
    //     // get scroll deltas to apply the effect on scroll
    //     const delta = curtains.getScrollDeltas();
    
    //     // invert value for the effect
    //     delta.y = -delta.y;
    
    //     // threshold
    //     if (delta.y > 60) {
    //       delta.y = 60;
    //     } else if (delta.y < -60) { 
    //       delta.y = -60;
    //     }
    
    //     if (Math.abs(delta.y) > Math.abs(planesDeformations.current)) {
    //       planesDeformations.current = curtains.lerp(
    //         planesDeformations.current,
    //         delta.y,
    //         0.5
    //       );
    //     }
    //   });
    // // const addPlanes = () => {
    // //     setNbPlanes(nbPlanes + 4);
    // //   };
    
    // const onPlaneReady = (plane) => {
    //     setPlanes((planes) => [...planes, plane]);
    //   };

    // const buildPlane = (index) => {
    //     return (
    //         <SinglePlaneHorizontal 
    //             key={index} 
    //             index={index} 
    //             onPlaneReady={onPlaneReady} 
    //         />
    //     );
    //   };
    // const allPlanes = [];
    // for (let i = 0; i < nbPlanes; i++) {
    //     allPlanes.push(buildPlane(i));
    // }
    // console.log(allPlanes);
    const [plane, setPlane] = useState(null);
    const slideshowInner = useRef(null);
    // slideshow states
    const [activeTexture, setActiveTexture] = useState(1);
    const [maxTextures, setMaxTextures] = useState(0);
    const isChanging = useRef(false);
    const tween = useRef(null);
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

    //gsap
    let container = useRef(null)
    useEffect(()=>{
        gsap.to(container.current, {
            x: () => -(container.current.scrollWidth - document.documentElement.clientWidth) + "px",
            scrollTrigger: {
              start: "center center",
              trigger: container.current,
              invalidateOnRefresh: true,
              pin: true,
              scrub: 1,
              anticipatePin: 1, // can help avoid flash
              end: () => "+=" + container.current.offsetWidth
            }
        })
    },[])
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
                <span>Click me !</span>
                <img
                    src="https://www.curtainsjs.com/examples/medias/displacement.jpg"
                    data-sampler="displacement"
                    alt=""
                />
                <img src="https://unsplash.it/1920/1080?random=1" alt="" />
                <img src="https://unsplash.it/1920/1080?random=2" alt="" />
                <img src="https://unsplash.it/1920/1080?random=3" alt="" />
                <img src="https://unsplash.it/1920/1080?random=4" alt="" />

            </div>

        </Plane>
        // <div className={classes.root}>
        //     <div className={classes.text}>horizontal scrolling</div>
        //     <aside id="containerWrapper">
        //         <main ref={container} className={classes.main}>

        //             <section className={classes.section}></section>
        //             <section className={classes.section}></section>
        //             <section className={classes.section}></section>
        //             <section className={classes.section}></section>
        //             <section className={classes.section}></section>
        //             <section className={classes.section}></section>

                    
        //                 {/* {allPlanes.map((planeEl,index) =>(
        //                     <section className={classes.section} key={index}>
        //                         <div className={classes.MultiplePlanesWrapper}>
        //                             {planeEl}
        //                         </div>
        //                     </section>
        //                 ))} */}
                   
                    
        //         </main>
        //     </aside>
        //     <div className={classes.text}>this is the end</div>
        // </div>
    )
}


export default MultiplePanelWithScrollTriger
