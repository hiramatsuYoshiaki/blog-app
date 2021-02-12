import React from 'react'
import {Enbed} from '../instagram/index'

const SNSArea = props => {
    return (
      <div className="l-container-fluid c-snsarea">
            <div className="l-section-fluid" >
                <h1 className="c-snsarea-header">SNS INSTAGRAM</h1>

                <div className="c-snsarea-body" >
                  
                    {props.images.length > 0 && (
                        props.images.map(image => (
                          // <div className="c-snsarea-body-element">
                             <Enbed path={image.instagram} key={image.id}/>
                          // </div>
                        ))
                      )}
                    {props.postImages.length > 0 && (
                        props.postImages.map(postImage => (
                          // <div className="c-snsarea-body-element">
                            <Enbed path={postImage.instagram} key={postImage.id}/>
                            // </div>
                        ))
                      )}
                  
                </div>   
        </div>
      </div>
    )
}


export default SNSArea
