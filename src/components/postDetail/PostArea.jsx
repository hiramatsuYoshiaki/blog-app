import React from 'react'

const PostArea = props => {
    return (
        <div>
            {/* stage={stage} stageNo={stageNo} stageYear={stageYear} stageImages={stageImages}
                        article={article} type={type} postDate={postDate} postImages={postImages}
                        tags={tags} */}
            <div>
                <span>STAGE</span>
                <span>{props.stageNo}</span>
                <span>　</span>
                <span>{props.stageYear}</span>
            </div>
            <div>
                <span>{props.stage}</span>
            </div>
            
            {props.postImages.length > 0 && (
                props.postImages.map(image => (
                    <div key={image.id}>
                        <img src={image.path} alt={image.description} className="p-imagePreview__img" />
                    </div>
                ))
            )}
            <div>
                <span>{props.article}</span>
            </div>
            <div>
                <span>{props.postDate}</span>
            </div>
            {props.tags.length > 0 && (
                props.tags.map(tag => (
                    <div key={tag.id}>
                        <span>{tag.name}</span>
                        <span>/</span>
                    </div>
                ))
            )}
        </div>
    )
}

export default PostArea
