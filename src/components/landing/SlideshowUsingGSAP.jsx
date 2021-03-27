import React from 'react'
import gsap from 'gsap'
import {useCurtains} from 'react-curtains'
import {Slideshow} from './index'

const SlideshowUsingGSAP = props => {
    console.log('SlideshowUsingGSAP');
    console.log(props.posts);
    useCurtains((curtains) => {
        // use gsap ticker to render our curtains scene
        gsap.ticker.add(curtains.render.bind(curtains));
      });
    return (
        <Slideshow posts={props.posts}/>
    )
}


export default SlideshowUsingGSAP    
