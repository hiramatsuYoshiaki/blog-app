import React,{useState,useEffect} from 'react'
import image from '../assets/img/img4121_flat.jpg'
// const canvasWidth = 600
// const canvasHeight = 400


const CanvasTest = () => {
    const [canvasWidth, setCanvasWidth] = useState(600)
    const [canvasHeight, setCanvasHeight] = useState(400)

    const handleResize = () => {
        setCanvasWidth(window.innerWidth)
        setCanvasHeight(window.innerHeight - 64 - 64 - 8) 
    }

    useEffect(()=>{
        handleResize()
        window.addEventListener('resize',handleResize)    
        return () => {
            window.addEventListener('resize',handleResize)    
        }
    },[])

    useEffect(()=>{
        /* START CONFIG VARS */
        const displayText = 'DG Solutions';
        const textColor = 'lightgrey';
        const textStyle = '30px Arial';
        const circleColor = 'red';
        const positionRadius = 30;
        const animSpeed = 1;
        /* END CONFIG VARS */

        let canvas = document.querySelector("canvas");
        let ctx = canvas.getContext("2d");

        let img = new Image();
        
        
            
        
        let frame = 0;
        let textPosition = 40;


        setInterval(function() {
            frame++;
            
            let shiftText =  textPosition + (frame * animSpeed)
            if( shiftText > 200 ){
                frame = 0
            }
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            ctx.beginPath();
            ctx.fillStyle = textColor;
            ctx.font = textStyle;
            ctx.fillText(displayText, 60, shiftText);
            ctx.globalCompositeOperation = 'xor';
            ctx.fillStyle = circleColor;

        
            // let shiftX = Math.sin(frame / (360 / animSpeed) *  Math.PI) * positionRadius;
            // let shiftY = Math.cos(frame / (360 / animSpeed) *  Math.PI) * positionRadius;
        
            // ctx.beginPath();
            // ctx.arc(50 + shiftX, 130, 20, 0, 2*Math.PI);
            // ctx.fill();
            // ctx.beginPath();
            // ctx.arc(250 - shiftX, 130, 20, 0, 2*Math.PI);
            // ctx.fill();

            ctx.fillStyle = 'red';
            ctx.fillRect(0, 100, canvasWidth, 100);

            // img.src = image;
            // img.onload = function(){
            //     ctx.drawImage(img, 60, 30, 300, 200);
            // }
            
        }, 1000/40); 

       



        //
        // ctx.fillStyle = "red";
        // ctx.fillRect(10, 10, 100, 50);

        // Image オブジェクトを生成
        // let img = new Image();
        // img.src = image;//../assets/img/img4121_flat.jpg

        // 画像読み込み終了してから描画
        // 構文: 幅、高さを指定
        //drawImage(image, x, y, width, height)
        // img.onload = function(){
        //     ctx.drawImage(img, 10, 10, 200, 150);
        // }
    },[])
    // useEffect(() => {
    //     window.addEventListener('mousemove', () => {});
      
    //     return () => {
    //       window.removeEventListener('mousemove', () => {})
    //     }
    //   }, []) 
    return (
        <div className="l-container" >
            <div className="l-section " > 
                <div style={{display:'flex', justifyContent:'center', 
                    alignItems:'center',    
                    width:'100%', 
                    height:'100%'}}>
                    <canvas width={canvasWidth} height={canvasHeight} style={{border:'1px solid white'}}></canvas>
                </div>
                {/* <div >
                    <div style={{width:400, height:200, border:'1px solid white'}}>
                        <h5 >Horizontal stage image 1</h5>
                    </div>
                    <div style={{width:400, height:200, border:'1px solid white'}}>
                        <h5>Horizontal stage image 2</h5>
                    </div>
                    <div style={{width:400, height:200, border:'1px solid white'}}>
                        <h5>Horizontal stage image 3</h5>
                    </div>
                    <div style={{width:400, height:200, border:'1px solid white'}}>
                        <h5>Horizontal stage image 4</h5>
                    </div>
                    <div style={{width:400, height:200, border:'1px solid white'}}>
                        <h5>Horizontal stage image 5</h5>
                    </div>
                </div> 
                <div >
                    <h1>Horizontal stage title 1</h1>
                    <h1>Horizontal stage title 2</h1>
                    <h1>Horizontal stage title 3</h1>
                    <h1>Horizontal stage title 4</h1>
                    <h1>Horizontal stage title 5</h1>
                </div>  */}
                
               
            </div>
       </div>
    )
}

export default CanvasTest
// 2021.4.14 removal animation-page


