import React from 'react'
import {Curtains} from 'react-curtains'
import MuitiplePlane from '../components/reactCurtains/MultiplePlane.jsx'

const ReactCurtainsMultiplePlanes = () => {
    return (
        <Curtains pixelRatio={Math.min(1.5, window.devicePixelRatio)}>
            <MuitiplePlane />
        </Curtains>
    )
}

export default ReactCurtainsMultiplePlanes
// react-curtains
// https://www.npmjs.com/package/react-curtains
// https://codesandbox.io/s/react-curtains-multiple-planes-zh9bt?file=/src/components/MultiplePlanes/index.js:1959-1978