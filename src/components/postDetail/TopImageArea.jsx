import React from 'react'
 
const TopImageArea = props => {
    return (
        <div className="l-container-fluid c-imagearea">
            <div className="l-section" >
                <div className="c-topimgarea-header ">
                    <h1 className="topimagearea-header__title" >{props.title}</h1>
                    <h2 className="topimagearea-header__subtitle" >
                        <span className="u-margin-right-8">STAGE{props.stageNo}</span>
                        <span className="u-margin-right-8">{props.stageYear}</span>
                        <span className="u-margin-right-8">{props.stage}</span>
                    </h2>
                </div>
                {props.images.length > 0 && (
                    props.images.map(image => (
                        <div key={image.id} className="c-imagearea-body">
                            <div className="c-imagearae-image">
                                <img src={image.path} alt={image.description} />
                            </div>
                        </div>
                    ))
                )}
            </div>  
        </div>
    )
}

export default TopImageArea 
