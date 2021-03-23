import React,{useRef,useState} from 'react'
import {
    Plane,
    RenderTarget,
    ShaderPass,
    useCurtainsEvent
  } from "react-curtains";
import { Vec2 } from "curtainsjs";
import {makeStyles} from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    SelectiveRenderTargets: {
        width: '80vw',
        margin: '0 auto',
        padding: '40px 0',
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
    },
    
    SelectiveRenderTargetsElement: {
        width: '75%',
        height: '60vh',
        margin: '10vh 25% 10vh 0',
        position: 'relative',
        'nth-child(even)':{
            margin: '10vh 0 10vh 25%',
            '& SelectiveRenderTargetsPlane':{
                right: 0,
                left: '15%',
            },
            '& SelectiveRenderTargetsSmallPlane':{
                right: 'auto',
                left: 0,
            }
        },
        'first-child':{
            marginTop: '5vh'
        },
        'last-child':{
            marginBottom:' 20vh'
        },
    },
    
    // SelectiveRenderTargetsElement:nth-child(even) {
    //     margin: '10vh 0 10vh 25%',
    // },
    
    // SelectiveRenderTargetsElement:first-child {
    //     marginTop: '5vh',
    // },
    
    // SelectiveRenderTargetsElement:last-child {
    //     marginBottom:' 20vh',
    // },
    
    SelectiveRenderTargetsElementInner: {
        boxSizing: 'border-box',
        padding: '40px',
    },
    
    SelectiveRenderTargetsTitle: {
        color: 'white',
        position: 'absolute',
        top: '25%',
        left: '25%',
        fontSize: '2em',
        fontWeight: 700,
        background: '#ee6557',
        display: 'inline-block',
        padding: '0.125em 0.25em',
    },
    
    SelectiveRenderTargetsPlane: {
        position: 'absolute',
        top: 0,
        right: '15%',
        bottom: '17.5vh',
        left: 0,
        '& img':{
            display: 'none'
        }
    },
    
    // SelectiveRenderTargetsElement:nth-child(even) .SelectiveRenderTargetsPlane {
    //     right: 0,
    //     left: '15%',
    // },
    
    SelectiveRenderTargetsSmallPlane: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        
        width: '45%',
        height: '45vh',
        '& img':{
            display: 'none'
        }
    },
    
    // SelectiveRenderTargetsElement:nth-child(even)
    // SelectiveRenderTargetsSmallPlane {
    //     right: 'auto',
    //     left: 0,
    // },
    
    // SelectiveRenderTargetsPlane img,
    // SelectiveRenderTargetsSmallPlane img {
    //     display: 'none',
    // },
})) 
// shaders-------------------------------------------------------------------
//panel
const vertexShader = `
  precision mediump float;
      
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;

  uniform mat4 planeTextureMatrix;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  void main() {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    
    // varyings
    vVertexPosition = aVertexPosition;
    vTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
  }
`
//panel
const fragmentShader = `
  precision mediump float;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;
  
  uniform sampler2D planeTexture;
  
  void main() {
    gl_FragColor = texture2D(planeTexture, vTextureCoord);
  }
`
// 上下に少し揺れる
//ShaderPass
const distortionFs = `
  precision mediump float;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform sampler2D uRenderTexture;

  uniform float uScrollEffect;

  void main() {
    vec2 textureCoords = vTextureCoord;
    vec2 texCenter = vec2(0.5, 0.5);

    // distort around scene center
    textureCoords.y += cos((textureCoords.x - texCenter.x) * 3.141592) * uScrollEffect / 500.0;

    gl_FragColor = texture2D(uRenderTexture, textureCoords);
  }
`
// ブラー効果　カラーRGBシャドー
//ShaderPass
const rgbFs = `
  precision mediump float;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform sampler2D uRenderTexture;

  uniform float uScrollEffect;

  void main() {
    vec2 textureCoords = vTextureCoord;

    vec2 redTextCoords = vec2(vTextureCoord.x, vTextureCoord.y - uScrollEffect / 300.0);
    vec2 greenTextCoords = vec2(vTextureCoord.x, vTextureCoord.y - uScrollEffect / 600.0);
    vec2 blueTextCoords = vec2(vTextureCoord.x, vTextureCoord.y - uScrollEffect / 900.0);

    vec4 red = texture2D(uRenderTexture, redTextCoords);
    vec4 green = texture2D(uRenderTexture, greenTextCoords);
    vec4 blue = texture2D(uRenderTexture, blueTextCoords);

    vec4 finalColor = vec4(red.r, green.g, blue.b, min(1.0, red.a + blue.a + green.a));
    gl_FragColor = finalColor;
  }
`
// ブラー効果　縦スリッド効果
//ShaderPass
const blurFs = `
  precision mediump float;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform sampler2D uRenderTexture;

  uniform float uScrollEffect;
  uniform vec2 uResolution;


  // taken from https://github.com/Jam3/glsl-fast-gaussian-blur
  vec4 blur5(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
      vec4 color = vec4(0.0);
      vec2 off1 = vec2(1.3333333333333333) * direction;
      color += texture2D(image, uv) * 0.29411764705882354;
      color += texture2D(image, uv + (off1 / resolution)) * 0.35294117647058826;
      color += texture2D(image, uv - (off1 / resolution)) * 0.35294117647058826;
      return color;
  }

  void main() {
    vec4 original = texture2D(uRenderTexture, vTextureCoord);
    vec4 blur = blur5(uRenderTexture, vTextureCoord, uResolution, vec2(0.0, 1.0));

    gl_FragColor = mix(original, blur, min(1.0, abs(uScrollEffect) / 5.0));
  }
`
const SelectiveRenderTargets = props => {
    const classes = useStyles()
    
    const [nbPlanes] = useState(4);

    const planesDeformations = useRef(0);
    useCurtainsEvent("onRender", (curtains) => {
        // update our planes deformation
        // increase/decrease the effect
        planesDeformations.current = curtains.lerp(
          planesDeformations.current,
          0,
          0.075
        );
      });
      useCurtainsEvent("onScroll", (curtains) => {
        // get scroll deltas to apply the effect on scroll
        const delta = curtains.getScrollDeltas();
    
        // invert value for the effect
        delta.y = -delta.y;
    
        // threshold
        if (delta.y > 60) {
          delta.y = 60;
        } else if (delta.y < -60) {
          delta.y = -60;
        }
    
        if (Math.abs(delta.y) > Math.abs(planesDeformations.current)) {
          planesDeformations.current = curtains.lerp(
            planesDeformations.current,
            delta.y,
            0.5
          );
        }
      });

    const passUniforms = {
        scrollEffect: {
          name: "uScrollEffect",
          type: "1f",
          value: 0
        }
    };
    // render passes
    const onPassRender = (pass) => {
        // update the uniform
        pass.uniforms.scrollEffect.value = planesDeformations.current;
    };

    // additional blur pass
    const blurUniforms = {
        scrollEffect: {
        name: "uScrollEffect",
        type: "1f",
        value: 0
        },
        resolution: {
        name: "uResolution",
        type: "2f",
        value: new Vec2()
        }
    };
    const setPassResolution = (pass) => {
        const passBBox = pass.getBoundingRect();
        pass.uniforms.resolution.value = new Vec2(passBBox.width, passBBox.height);
    };

    const buildPlane = (index) => {
        const imageIndex = (index % 4) + 1;
    
        return (
          <div className={classes.SelectiveRenderTargetsElement} key={index}>
            <div className={classes.SelectiveRenderTargetsTitle}>
              {"Title " + (index + 1)}
            </div>
            <div className={classes.SelectiveRenderTargetsElementInner}>
              <RenderTarget uniqueKey="distortionTarget">
                <ShaderPass
                  fragmentShader={distortionFs}
                  uniforms={passUniforms}
                  onRender={onPassRender}
                >
                  <Plane
                    className={classes.SelectiveRenderTargetsPlane}
                    // plane init parameters
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                  >
                    <img
                      src={"https://unsplash.it/1920/1080?random=" + imageIndex}
                      data-sampler="planeTexture"
                      alt=""
                    />
                  </Plane>
                </ShaderPass>
              </RenderTarget>
    
              <RenderTarget uniqueKey="rgbTarget">
                <ShaderPass

                // ブラー効果　カラーRGBシャドー
                  fragmentShader={rgbFs}
                // ブラー効果　上下に揺れ
                //   fragmentShader={distortionFs}　
                // ブラー効果　縦スリッドエフェクト
                //   fragmentShader={blurFs}　

                  depthTest={false}
                  uniforms={passUniforms}
                  onRender={onPassRender}
                >
                  <Plane
                    className={classes.SelectiveRenderTargetsSmallPlane}
                    // plane init parameters
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                  >
                    <img
                      src={"https://unsplash.it/1920/1080?random=" + imageIndex}
                      data-sampler="planeTexture"
                      alt=""
                    />
                  </Plane>
                </ShaderPass>
              </RenderTarget>
            </div>
          </div>
        );
      };
    const allPlanes = [];
    for (let i = 0; i < nbPlanes; i++) {
        allPlanes.push(buildPlane(i));
    }
    return (
        <div className={classes.SelectiveRenderTargets}>
            <div className={classes.SelectiveRenderTargetsWrapper}>
                {allPlanes.map((planeEl) => {
                    return planeEl
                })}

                <ShaderPass
                    fragmentShader={blurFs}
                    uniforms={blurUniforms}
                    onRender={onPassRender}
                    onReady={setPassResolution}
                    onAfterResize={setPassResolution}
                />
            </div>
        </div>
    )
}


export default SelectiveRenderTargets
