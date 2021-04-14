import React from 'react'
import {Plane} from 'react-curtains'
import {makeStyles} from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    MultiplePlanesLandscape: {
        position: 'relative',
        height: 0,
        width: '100%',
        overflow: 'hidden',
        paddingBottom: '66.6%',
      },
      
      MultiplePlanesLandscapeInner: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      
      MultiplePlanesElement: {
        flexBasis: '50%',
        position: 'relative',
      },
      
      MultiplePlanesElementInner: {
        boxSizing: 'border-box',
        padding: '40px',
      },
      
      MultiplePlanesTitle: {
        background: '#ee6557',
        color: 'white',
        position: 'absolute',
        top: '0.25em',
        left: 0,
        fontSize: '2em',
        fontWeight: 'bold',
        display: 'inline-block',
        padding: '0.125em 0.25em',
      },
      
      MultiplePlanesPlane: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        '& img': {
            display: 'none',
          }
      },
    //   @media screen and (max-width: 980px) {
    //     .MultiplePlanes-element {
    //       flex-basis: 100%;
    //     }
    //   }
      [theme.breakpoints.up('md')]: {
        MultiplePlanesElement: {
            flexBasis: '100%'
          }
      },
}))
const vertexShader = `
  precision mediump float;
      
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;

  uniform mat4 planeTextureMatrix;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform float uPlaneDeformation;

  void main() {
    vec3 vertexPosition = aVertexPosition;

    // cool effect on scroll　スクロール時の縦方向の変化
    //縦方向の変化
    vertexPosition.y += sin(((vertexPosition.x + 1.0) / 2.0) * 3.141592) * (sin(uPlaneDeformation / 90.0));
    //横方向の変化
    vertexPosition.x += sin(((vertexPosition.y + 1.0) / 2.0) * 3.141592) * (sin(uPlaneDeformation / 90.0));

    //画像サイズ
    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1);
    
    // varyings
    vVertexPosition = aVertexPosition;
    vTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
  }
`;

const fragmentShader = `
  precision mediump float;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;
  
  uniform sampler2D planeTexture;
  
  void main() {
    gl_FragColor = texture2D(planeTexture, vTextureCoord);
  }
`;
const SinglePlane = ({ index = 1, onPlaneReady = () => {} }) => {
    const classes = useStyles()
    const uniforms = {
        planeDeformation: {
          name: "uPlaneDeformation",
          type: "1f",
          value: 0
        }
      };
    
      const drawCheckMargins = {
        top: 100,
        right: 0,
        bottom: 100,
        left: 0
      };
    
    const imageIndex = (index % 4) + 1;
    return (
    <div className={classes.MultiplePlanesElement}>
      <div className={classes.MultiplePlanesTitle}>{"Title " + (index + 1)}</div>
      <div className={classes.MultiplePlanesElementInner}>
        <div className={classes.MultiplePlanesLandscape}>
          <div className={classes.MultiplePlanesLandscapeInner}>
            <Plane
              className={classes.MultiplePlanesPlane}
              // plane init parameters
              vertexShader={vertexShader}
              fragmentShader={fragmentShader}
              shareProgram={true}
              widthSegments={10}
              heightSegments={10}
              drawCheckMargins={drawCheckMargins}
              uniforms={uniforms}
              // plane events
              onReady={onPlaneReady}
            >
              <img
                src={"https://unsplash.it/1920/1080?random=" + imageIndex}
                data-sampler="planeTexture"
                alt=""
              />
            </Plane>
          </div>
        </div>
      </div>
    </div>
    )
}


export default SinglePlane
// react-curtains
// https://www.npmjs.com/package/react-curtains
// https://codesandbox.io/s/react-curtains-multiple-planes-zh9bt?file=/src/components/MultiplePlanes/index.js:1959-1978
// 2021.4.14 removal animation-page 