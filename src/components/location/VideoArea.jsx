import React from 'react'
import { VideoPreview } from './index'

const VideoArea = props => {
    const images = props.images
    return (
        <div>
            <div className="p-grid__list-images__edit">
            {
                    images.length > 0 && (
                        images.map((image) => (
                            <VideoPreview
                                    key={image.id}
                                    id={image.id}
                                    path={image.path}
                                    description={image.description}
                            />
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default VideoArea
