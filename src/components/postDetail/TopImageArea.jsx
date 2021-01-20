import React from 'react'

const TopImageArea = props => {
    return (
        <div>
            <div>
                <span>{props.title}</span>
                <span>@</span>
                <span>{props.stage}</span>
            </div>
            
            {props.images.length > 0 && (
                props.images.map(image => (
                    <div key={image.id}>
                        <img src={image.path} alt={image.description} className="p-imagePreview__img" />
                    </div>
                ))
            )}
        </div>
    )
}

export default TopImageArea
