import React from 'react'
import {Curtains, Plane} from 'react-curtains'
import {makeStyles} from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    BasicPlane: {
        width: '100%',
        height: '100vh',
        margin: '10vh auto',
        '& img':{
            display:'none',
        },
      },
})) 
const basicVs = `
    precision mediump float;
    
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;
    
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    
    uniform mat4 uTextureMatrix0;
    
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;
    
    void main() {
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
        
        // varyings
        vVertexPosition = aVertexPosition;
        vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
    }
`;


const basicFs = `
    precision mediump float;

    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;
    
    uniform sampler2D uSampler0;
    
    uniform float uTime;
    
    void main() {
        vec2 textureCoord = vTextureCoord;
        // displace our pixels along the X axis based on our time uniform
        // textures coords are ranging from 0.0 to 1.0 on both axis
        textureCoord.x += sin(textureCoord.y * 25.0) * cos(textureCoord.x * 25.0) * (cos(uTime / 50.0)) / 25.0;
        
        gl_FragColor = texture2D(uSampler0, textureCoord);
    }
`;
const  ReactCurtainsBasicPlane = () => { 
    const classes = useStyles()
    const basicUniforms = {
        time: {
            name:'uTime',
            type:'1f',
            value: 0
        }
    }
    const onRender = (plane) => {
        plane.uniforms.time.value++
    }
    return (
        <Curtains pixelRatio={Math.min(1.5, window.devicePixelRatio)}>
            <Plane
                className={classes.BasicPlane}
                // plane init parameters
                vertexShader={basicVs}
                fragmentShader={basicFs}
                uniforms={basicUniforms}

                // plane events
                onRender={onRender}
            >
            <img src="https://unsplash.it/1920/1080?random=1" alt="" />
            </Plane>
        </Curtains> 
    )
}

export default ReactCurtainsBasicPlane

//curtains.js
// https://www.npmjs.com/package/react-curtains
// https://codesandbox.io/s/react-curtains-vertex-coordinates-helper-b0b06?file=/src/styles.css:105-198
