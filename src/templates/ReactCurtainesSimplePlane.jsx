import React from 'react'
import {Curtains} from 'react-curtains'
import SimplePlane from '../components/reactCurtains/SimplePlane.jsx'

const ReactCurtainesSimplePlane = () => {
    return (
        <Curtains pixelRatio={Math.min(1.5, window.devicePixelRatio)}>
            <SimplePlane />
        </Curtains>
    )
}

export default ReactCurtainesSimplePlane
