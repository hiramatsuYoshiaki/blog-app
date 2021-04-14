import React from 'react'
import {Curtains} from 'react-curtains'
import SlideshowUsingGSAP from '../components/reactCurtains/SlideshowUsingGSAP.jsx'

const ReactCurtainsSlideshowGSAP = () => {
    return (
        <Curtains
            pixelRatio={Math.min(1.5, window.devicePixelRatio)}
            autoRender={false} // we'll use gsap ticker in App.js instead
        >
            <SlideshowUsingGSAP /> 
        </Curtains> 
    )
}

export default ReactCurtainsSlideshowGSAP
// 2021.4.14 removal animation-page 
