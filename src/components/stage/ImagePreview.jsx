import React from 'react'

const ImagePreview = props => {
    return (
        <div>
            <img alt="アイキャッチ画像" src={props.path} className="p-imagePreview__img"/>
            <p>{props.description}</p>
        </div> 
    )
}

export default ImagePreview
