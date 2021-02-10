import React from 'react'
import { ReplaceImagesUpload, PostImagesPreview} from './index'

const PostImagesArea = props => {
    const images = props.images
    return (
        <div> 
            <div className="p-grid__list-images__edit">
                {
                    images.length > 0 && (
                        images.map((image,index) => (
                            <div key={image.id}>
                                <PostImagesPreview 
                                        id={image.id}
                                        path={image.path}
                                        description={image.description}

                                        instagram={image.instagram}
                                        twitter={image.twitter}
                                        index={index}
                                        images={props.images}
                                        setImages={props.setImages}  
                                />
                                <ReplaceImagesUpload  
                                    images={props.images}
                                    setImages={props.setImages}
                                    index={index}
                                />
                            </div> 
                        ))
                    )
                    
                }
            </div> 
        </div>
    )
}

export default PostImagesArea
