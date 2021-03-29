import React from 'react'
import {Curtains} from 'react-curtains'
import {SlideshowUsingGSAP} from './index'

const ReactCurtainsSlideshowGSAP = (props) => {
    return (
        <Curtains
            pixelRatio={Math.min(1.5, window.devicePixelRatio)}
            autoRender={false} // we'll use gsap ticker in App.js instead
        >
            <SlideshowUsingGSAP posts={props.posts}/> 
        </Curtains>  
    )
}

export default ReactCurtainsSlideshowGSAP
