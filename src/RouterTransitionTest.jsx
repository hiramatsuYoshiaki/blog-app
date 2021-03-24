import React,{useRef} from 'react'
import { Route, Switch } from 'react-router'
import HomeTransitionTest from './templates/HomeTransitionTest'
import ContactTransitionTest from './templates/ContactTransitionTest'
import AboutTransitionTest from './templates/AboutTransitionTest'


import { TransitionGroup, Transition } from "react-transition-group";
import { gsap } from "gsap";




const completeCall = (target, parent) => {
    gsap.set(target, { clearProps: "position, width" });
    parent && gsap.set(parent, { clearProps: "overflow" });
  };

const RouterTransitionTest = (props) => {

    const parentNode = useRef(null);
    // console.log(parentNode);

  const onEnterHandler = (node) => {
    //   console.log('onEnterHandler');
    //   console.log(node);
    gsap.killTweensOf(node);
    // Set initial position and styles
    gsap.set(node, {
      position: "absolute", left: 0,
      x: 100, autoAlpha: 0
    });
    gsap.set(parentNode.current, { overflow: "hidden" })
    // Create the animation for the incoming component
    gsap.to(node, {
      duration: 0.4, autoAlpha: 1,
      x: 0,
      onComplete: completeCall,
      onCompleteParams: [node, parentNode.current]
    });
  };

  const onExitHandler = (node) => {
    // console.log('onExitHandler');
    // console.log(node);
    gsap.killTweensOf(node);
    // Set initial position and styles
    gsap.set(node, {
      position: "absolute", left: 0
    });
    // Create the animation for the incoming component 
    gsap.to(node, {
      duration: 0.4, autoAlpha: 0,
      x: -100
    });
  };
  
    return (
      <main className='l-main' ref={parentNode}>
          <Route render={({ location }) => (
                <TransitionGroup component={null}>
                    <Transition
                        timeout={500}
                        key={location.pathname}
                        onEnter={onEnterHandler}
                        onExit={onExitHandler}
                    >
                        <Switch location={location}>
                            <Route exact path="/homeTransitionTest" 
                                component={HomeTransitionTest} />
                            <Route exact path="/contactTransitionTest" 
                                component={ContactTransitionTest} />
                            <Route exact path="/aboutTransitionTest" 
                                component={AboutTransitionTest} />
                        </Switch> 
                    </Transition>
                </TransitionGroup> 
          )} />
            
    </main>　
    )
}

export default RouterTransitionTest
