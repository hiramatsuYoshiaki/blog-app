import React,{useEffect} from 'react'
import image from '../assets/img/img4121_flat.jpg'
const canvasWidth = 600
const canvasHeight = 400

const CanvasTest = () => {
    useEffect(()=>{
        let canvas = document.querySelector("canvas");
        let context = canvas.getContext("2d");

        //
        context.fillStyle = "red";
        context.fillRect(10, 10, 100, 50);

        // Image オブジェクトを生成
        let img = new Image();
        img.src = image;//../assets/img/img4121_flat.jpg

        // 画像読み込み終了してから描画
        // 構文: 幅、高さを指定
        //drawImage(image, x, y, width, height)
        img.onload = function(){
            context.drawImage(img, 200, 200, 200, 150);
        }
    },[])
    // useEffect(() => {
    //     window.addEventListener('mousemove', () => {});
      
    //     return () => {
    //       window.removeEventListener('mousemove', () => {})
    //     }
    //   }, [])
    return (
        <div className="l-container" >
            <div className="l-section " style={{position:'relative'}}> 
                <div >
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
                </div> 
                {/* <div> */}
                    {/* <h1 style={{color:'white'}}>Hello Canvas</h1>
                    <p  style={{color:'white'}}>This is a paragraph</p> */}
                    <div style={{display:'flex', justifyContent:'center', 
                        alignItems:'center',    
                        width:'100%', 
                        height:'100vh'}}>
                        <canvas width={canvasWidth} height={canvasHeight} style={{border:'1px solid white'}}></canvas>
                    </div>
                {/* </div> */}
               
            </div>
       </div>
    )
}

export default CanvasTest

