import React from 'react'

const VideoPreview = props => {
    return (
        <div>
            <video muted controls className="p-videoPreview__img">
                <source src={props.path} type="video/mp4" />
            </video>
            <p>{props.description}</p>
        </div>
    )
}

export default VideoPreview
