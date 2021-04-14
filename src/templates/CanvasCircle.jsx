import React,{useEffect,useRef} from 'react'
const getPixelRatio = context => {
    var backingStore = 
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1
    return (window.devicePixelRatio || 1) / backingStore
}


const CanvasCircle = () => {
    let ref = useRef()//ref.currentcanvas
    
    useEffect(()=>{
        let canvas = ref.current
        let context = canvas.getContext('2d')

        let ratio = getPixelRatio(context)
        let width = getComputedStyle(canvas)
            .getPropertyValue('width').slice(0,-2)
        let height = getComputedStyle(canvas)
            .getPropertyValue('height').slice(0,-2)
        canvas.width = width * ratio 
        canvas.height = height * ratio 
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`

        let requestId,
            i = 0

        const render = () => {
            context.clearRect(0,0,canvas.width,canvas.height)
            context.beginPath()
            // context.arc(50,50,50,0, 2 * Math.PI)
            context.arc(
                canvas.width / 2,
                canvas.height / 2,
                (canvas.width / 2) * Math.abs(Math.cos(i)),
                0,
                2 * Math.PI)
            context.fillStyle='white'
            context.fill()
            i += 0.05
            requestId = requestAnimationFrame(render)
        }

        render()

        return () => {
            cancelAnimationFrame(requestId)
        }
    },[])
    return (
       <canvas 
            ref={ref}
            style={{width:'100px',height:'100px'}} 
       />
    )
}

export default CanvasCircle

// http://www.petecorey.com/blog/2019/08/19/animating-a-canvas-with-react-hooks/
// 2021.4.14 removal animation-page