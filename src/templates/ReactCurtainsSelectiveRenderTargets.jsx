import React from 'react'
import {Curtains} from 'react-curtains'
import SelectiveRenderTargets from '../components/reactCurtains/SelectiveRenderTargets.jsx'

const ReactCurtainsSelectiveRenderTargets = () => {
    return (
        <Curtains pixelRatio={Math.min(1.5, window.devicePixelRatio)}>
            <SelectiveRenderTargets />
        </Curtains>
       
    )
}

export default ReactCurtainsSelectiveRenderTargets
