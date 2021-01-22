import React from 'react'

const PostArea = props => {
    return (
        <div className="l-container c-postarea">
            <div className="l-section" >
                 {/* stage={stage} stageNo={stageNo} stageYear={stageYear} stageImages={stageImages}
                        article={article} type={type} postDate={postDate} postImages={postImages}
                        tags={tags} */}

                <div className="c-postarea-header">
                    <h3 className="c-postarea-header-stage">
                        <span>STAGE</span>
                        <span>{props.stageNo}</span>
                    </h3>
                    <p  className="c-postarea-header-stagetitle">
                        <span>{props.stageYear}</span>
                        <span>{props.stage}</span> 
                    </p>
                </div>

                {props.postImages.length > 0 && (
                    props.postImages.map(image => (
                        <div key={image.id} className="c-postarea-body-image">
                            <div className="c-postarae-image">
                                <img src={image.path} alt={image.description}  />
                            </div>
                            <div className="c-postarae-description">
                                {image.description}  
                            </div>
                        </div>
                    ))
                )}
                <div className="c-postarea-article">
                    <div>{props.article}</div>
                    <div>{props.postDate.split('T')[0] }</div>
                    <div>
                        {props.tags.length > 0 && (
                            props.tags.map(tag => (
                                <span key={tag.id}>
                                    <span>{tag.name}/</span>
                                </span>
                            ))
                        )} 
                    </div>
                </div>
                
               
            </div>
        </div>
    )
}

export default PostArea
