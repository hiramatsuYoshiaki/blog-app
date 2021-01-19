import React from 'react'

const PostImagesPreview = props => {
    return (
        <div>
             <div>
            <img alt="アイキャッチ画像" src={props.path} className="p-imagePreview__img"/>
            <p>{props.description}</p>
        </div> 
        </div>
    )
}


export default PostImagesPreview
