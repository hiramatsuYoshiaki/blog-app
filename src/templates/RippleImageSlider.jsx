import React,{useEffect,useRef} from 'react'
// import TweenMax from "gsap/TweenMax";
// import {TweenMax} from 'gsap'
// import { TimelineLite, Power2, Elastic, CSSPlugin } from "gsap/TweenMax";
import { TweenLite,TweenMax,TimelineLite, TimelineMax,Linear,Expo,Power2} from "gsap/all";  
import * as twgl from 'twgl.js'
// import * as twgl from './ twgl.js'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    canvas:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform:'translate(-50%,-50%)',
        width: '300px',
        height: '300px',
        zIndex: 1000,
        border:'1px solid white', 
    }
}))

const RippleImageSlider = () => {
    const classes = useStyles()
    let ref = useRef()
    const ticker = TweenMax.ticker
    console.log(ticker);
    const vert = `
                    precision mediump float;

                    attribute vec3 position;
                    attribute vec2 texcoord;

                    uniform mat4 uMatrix;
                    uniform mat4 uTmatrix;

                    uniform float uTime;
                    uniform vec2 uRes;
                    uniform vec2 uOffset;
                    uniform float uPower;

                    varying vec2 vTexcoord;

                    void main() {
                        vec3 pos = position.xzy;

                        float dist = distance(uOffset, vec2(pos.x, pos.y));
                        float rippleEffect = cos(15.0 * (dist - (uTime / 60.0)));
                        float distortionEffect = rippleEffect * uPower;

                        pos.x += (distortionEffect / 30.0 * (uOffset.x - pos.x));
                        pos.y += distortionEffect / 30.0 * (uOffset.y - pos.y);

                        gl_Position = uMatrix * vec4(pos, 1.0);
                        vTexcoord = (uTmatrix * vec4(texcoord - vec2(.5), 0, 1)).xy + vec2(.5);
                    }  
                `

    const frag = `
                    precision mediump float;

                    uniform sampler2D uTexOne;
                    uniform sampler2D uTexTwo;
                    uniform float uProgress;

                    varying vec2 vTexcoord;

                    void main() {
                        vec2 uv = vTexcoord;
                    
                        vec4 color = vec4(1.0);

                        vec4 texOne = texture2D(uTexOne, uv);
                        vec4 texTwo = texture2D(uTexTwo, uv);

                        float effect = step(uv.x, uProgress);
                        color = mix(texOne, texTwo, effect);

                        gl_FragColor = color;
                    }
                    `
    const images = [
        'https://images.unsplash.com/photo-1548532333-6ba7cb80cd57?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        'https://images.unsplash.com/photo-1542908220-73cc48ad0af3?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        'https://images.unsplash.com/photo-1503058474900-cb76710f9cd1?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ'
    ];
    const textures = [];

    let values = {
        total: images.length - 1,
        power: 0,
        progress: 0,
        time: 0,
        offset: [0, 0],
        current: 0,
        next: 1 };
    let isAnimating = false;

    useEffect(()=>{
        // let canvas = document.querySelector('#canvas')
        // let ctx = canvas.getContext("2d");
        // ctx.fillStyle = 'red';
        // ctx.fillRect(0, 0, 300, 300);
        // const canvas = document.querySelector('#canvas')
        

        // const  createTexture = (info, src) => {
        //     let texture = gl.createTexture()
        //     gl.bindTexture(gl.TEXTURE_2D, texture)
        
        //     const level = 0
        //     const internalFormat = gl.RGB
        //     const width = 1
        //     const height = 1
        //     const border = 0
        //     const srcFormat = gl.RGB
        //     const srcType = gl.UNSIGNED_BYTE
        //     const pixel = new Uint8Array([0, 0, 0, 0])
        
        //     gl.texImage2D(
        //       gl.TEXTURE_2D, 
        //       level, 
        //       internalFormat, 
        //       width, 
        //       height, 
        //       border, 
        //       srcFormat, 
        //       srcType, 
        //       pixel
        //     )
        
        //     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        //     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        //     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        
        //     const image = document.createElement('img')
        
        //     image.addEventListener('load', () => {
        //       gl.bindTexture(gl.TEXTURE_2D, texture)
        //       gl.texImage2D(
        //         gl.TEXTURE_2D, 
        //         level, 
        //         internalFormat, 
        //         srcFormat, 
        //         srcType, 
        //         image
        //       )
        
        //       info.width = image.width
        //       info.height = image.height
        //     })
        
        //     image.crossOrigin = ''
        //     image.src = src
            
        //     return texture
        //   }
        // const createTextures = ()  => {
        //     images.forEach(src => {
        //       const info = {
        //         texture: null,
        //         width: 1,
        //         heigth: 1        
        //       }
              
        //       info.texture = createTexture(info, src)
              
        //       textures.push(info)
        //     })
        //   }

        // const render = () => {
        //     twgl.resizeCanvasToDisplaySize(gl.canvas)
        
        //     gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
        //     gl.clearColor(0, 0, 0, 0)
        //     gl.clear(gl.COLOR_BUFFER_BIT)
        
        //     let matrix = m4.identity()
        //     let tMatrix = m4.identity()
            
        //     const texAspect = textures[0].width / textures[0].height
        //     const imgAspect = gl.canvas.width / gl.canvas.height
        
        //     let scaleY = 0
        //     let scaleX = 0
            
        //     if (imgAspect < texAspect) {
        //       scaleY = 1
        //       scaleX = imgAspect / texAspect
        //     } else if (imgAspect > texAspect) {
        //       scaleY = texAspect / imgAspect
        //       scaleX = 1
        //     }
             
        //     m4.scale(tMatrix, [scaleX, scaleY, 1], tMatrix)
        
        //     values.time++
            
        //     m4.ortho(0, gl.canvas.width, gl.canvas.height, 0, -1, 1, matrix)
        //     m4.translate(matrix, [gl.canvas.width / 2, gl.canvas.height / 2, 1], matrix)
        //     m4.scale(matrix, [gl.canvas.width / 1.5, gl.canvas.height / 1.5, 1], matrix)
        
        //     gl.useProgram(programInfo.program)
            
        //     twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
            
        //     twgl.setUniforms(programInfo, {
        //       uMatrix: matrix,
        //       uTmatrix: tMatrix,
        //       uTexOne: textures[values.current].texture,
        //       uTexTwo: textures[values.next].texture,
        //       uTime: values.time,
        //       uPower: values.power,
        //       uProgress: values.progress,
        //       uRes: [gl.canvas.width, gl.canvas.height],
        //       uOffset: values.offset
        //     })
            
        //     twgl.drawBufferInfo(gl, bufferInfo)
        //   }
        // const changeSlide = () => {
        //     values.current = values.next
        //     values.next = values.next === values.total ? 0 : values.next + 1
        //   }
        // const onClick = (e) => {
        //     if (isAnimating) return
        //     isAnimating = true
            
        //     values.offset = [
        //       e.clientX / gl.canvas.width * 2 - 1,
        //       e.clientY / gl.canvas.height * 2 - 1
        //     ]
            
        //     const master =  TimelineMax({ 
        //         onComplete: () => {
        //           isAnimating = false
        //           values.progress = 0
        //           changeSlide()
        //         }
        //     })
            
        //     const sub =  TimelineLite({ paused: true })

        
        //     sub.to(values, 0.5, { power: 1, ease: Linear.easeNone }, 0)
        //     sub.to(values, 1, { power: 0, ease: Linear.easeNone })
            
        //     master.to(sub, 1.5, { progress: 1, ease: Power2.easeInOut })
        //     master.to(values, 1.15, { progress: 1, ease: Expo.easeInOut }, 0) 
        //   }
        // const  listeners = () => {
        //     canvas.addEventListener('click', onClick)
        // }


        const render = () => {

        }


        let canvas = ref.current
        const gl = canvas.getContext('webgl')
        console.log('useEffect');
        console.log(canvas);
        console.log(gl);

        const m4 = twgl.m4;
        console.log(m4);

        const programInfo = twgl.createProgramInfo(gl, [vert, frag]);
        const bufferInfo = twgl.primitives.createPlaneBufferInfo(gl, 1, 1, 30, 30);

        // createTextures()
        // listeners()
        
        // TweenMax.ticker.addEventListener('tick', render)
        // const aaa = TweenLite.ticker
        // aaa.addEventListener('tick', render)
        console.log('ticker');
        console.log(ticker);
       
    },[])
    
    return (
        <canvas id="canvas" ref={ref} className={classes.canvas}></canvas>
    )
}

export default RippleImageSlider

