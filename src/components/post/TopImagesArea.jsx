import React from 'react'
import { TopImagesPreview} from './index'

const TopImagesArea = props => {
    const images = props.images
    return (
        <div className="">
            {
                images.length > 0 && (
                    images.map((image,index) => (
                        <TopImagesPreview
                                key={image.id}
                                id={image.id}
                                path={image.path}
                                description={image.description}
                                instagram={image.instagram}
                                twitter={image.twitter}
                                index={index}
                                images={props.images}
                                setImages={props.setImages} 
                        />
                    ))
                )
            }
        </div> 
    )
} 

export default TopImagesArea
