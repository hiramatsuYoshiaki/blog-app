import React from 'react'
import gsap from 'gsap'
import {useCurtains} from 'react-curtains'
// import MultiplePanelWithScrollTriger from  './MultiplePanelWithScrollTriger.jsx'
import MuitiplePlaneScroll from  './MuitiplePlaneScroll.jsx'

const MultipleplanesUsingGSAP = props => {
    useCurtains((curtains) => {
        // use gsap ticker to render our curtains scene
        gsap.ticker.add(curtains.render.bind(curtains));
      });
    return (
        // <MultiplePanelWithScrollTriger />
        <MuitiplePlaneScroll />
    )
}

export default MultipleplanesUsingGSAP  
