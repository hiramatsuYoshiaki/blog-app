import React,{useState, useEffect, useRef} from 'react'

const ImageLoadingTest = () => {
    const [loading, setLoading] = useState(true);
    const counter = useRef(0);
    const imageLoaded = () => {
        counter.current += 1;
        if (counter.current >= urls.length) {
          setLoading(false);
        }
      }
    const urls = [
        "https://placeimg.com/100/100/any&rnd=" + Math.random(),
        "https://placeimg.com/100/100/any&rnd=" + Math.random(),
        "https://placeimg.com/100/100/any&rnd=" + Math.random()
      ];
    return ( 
        <div style={{color:'white'}}>
            <div style={{display: loading ? "block" : "none"}}>
                Loading images,
            </div>
            <div style={{display: loading ? "none" : "block"}}>
                {urls.map(url => 
                    <img key={url} src={url} onLoad={imageLoaded} /> )}
            </div>
        </div>
    )
}

export default ImageLoadingTest
