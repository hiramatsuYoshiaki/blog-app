import React,{useRef} from 'react'
import {gsap,Back,TweenLite} from 'gsap'
import Transition from 'react-transition-group/Transition'
const duration = 5000
const defaultStyle = {
    opacity:.1,
    transform:'translate(300px,0)'
}
// const transitionStyle = {
//     entering:{opacity:0.1},
//     entered:{opacity:1}
// }


const ChildrenTest = props => {

    return (
        <Transition
        in={props.in}
        timeout={duration}
        mountOnEnter={true}
        unmountOnExit={true}
        addEndListener={(n,done) =>{
            if (props.in) {
            TweenLite.to(n, 1, {
              autoAlpha: 1,
              x: 0,
              ease: Back.easeOut,
              onComplete: done
            });
          } else {
            TweenLite.to(n, 1, { 
              autoAlpha: 0,
              x: -100,
              onComplete: done });
          }
        }}
        >
            <div style={{...defaultStyle,marginTop:'10px'}}>
                <div>
                    <h1 style={{color:'white'}}>
                        FADE IN/OUT
                    </h1>
                </div>
            </div>

            
        </Transition>
    )
}


export default ChildrenTest
