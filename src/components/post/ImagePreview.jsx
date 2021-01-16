import React from 'react' 

const ImagePreview = (props) => {
    
    return (
        <div className="p-media__thumb" >
            {props.media.type}
            {props.path}
            {props.media === "video" && ( 
                <div>
                     <video muted controls>
                        <source src={props.path} type="video/mp4" />
                    </video>
                </div>
            )}
            {props.media === "image" && (
                <img alt="アイキャッチ画像" src={props.path} />
            )}
            
            {/* <img alt="アイキャッチ画像" src={props.path} />
            <div>
                <video autoplay="autoplay" loop muted playsinline controls>
                    <source src={props.path} type="video/mp4" />
                </video>
            </div>  */}
            <p>{props.description}</p>
        </div>

    );
}

export default ImagePreview
