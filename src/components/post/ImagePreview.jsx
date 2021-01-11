import React from 'react' 

const ImagePreview = (props) => {
    
    return (
        <div className="p-media__thumb" >
            <img alt="アイキャッチ画像" src={props.path} />
            {/* <p>{props.id}</p>
            <p>{props.path}</p> */}
            <p>{props.description}</p>
        </div>

    );
}

export default ImagePreview
