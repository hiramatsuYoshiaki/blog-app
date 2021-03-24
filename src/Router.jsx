import React,{useRef} from 'react'
import { Route, Switch } from 'react-router'

import {
  Home,
  SignIn,
  SignOut,
  Admin,
  PostEdit,
  PostList,
  PostDetail,
  StageEdit,
  StageList,
  TagsEdit,
  TagsList,
  LocationEdit,
  LocationList,
  LocationMap,
  LocationDetail,
  PostListGrid,
  PostListGridImage,
  StageListGridLine,
  BlogData,
  About,
  Landing,
  LandingPage,
  TopPage,
  CanvasTest,
  CanvasCircle,
  GreenSockTest,
  HoverEffect,
  ThreeTest,
  ScrollTriggerTest,
  ReactCurtainsBasicPlane,
  ReactCurtainesSimplePlane,
  ReactCurtainsMultiplePlanes,
  ReactCurtainsSlideshowGSAP,
  ReactCurtainsSelectiveRenderTargets,
  ReactCurtainsMultipleplanesUsingGSAP,
  GsapTest,
  PageTransitionTest,
  ComponentTransitionTest

} from './templates/index'
import Auth from './Auth'
import { TransitionGroup, Transition } from "react-transition-group";
import { gsap } from "gsap";

const completeCall = (target, parent) => {
  gsap.set(target, { clearProps: "position, width" });
  parent && gsap.set(parent, { clearProps: "overflow" });
};

const Router = () => {
  
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
      <main className='l-main'>
        <Route render={({ location }) => (
              <TransitionGroup component={null}>
                  <Transition
                      timeout={500}
                      key={location.pathname}
                      onEnter={onEnterHandler}
                      onExit={onExitHandler}
                  >

            <Switch>
                {/* test page */} 
                {/* <Route exact path="/css" component={CssDesign} /> */}
                
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signout" component={SignOut} />
                <Route exact path="(/)?" component={Home} />
                <Route exact path="/post/list" component={PostList} />
                <Route exact path="/post/listgrid" component={PostListGrid} />
                <Route exact path="/post/listgridImage" component={PostListGridImage} />
                <Route exact path="/blog/data" component={BlogData} />
                <Route exact path="/stage/listgridline" component={StageListGridLine} />
                <Route exact path="/stage/List" component={StageList} />
                <Route exact path="/location/List" component={LocationList} />
                <Route exact path="/location/map" component={LocationMap} />
                <Route exact path="/landing" component={Landing} />


                {/* blog test page ++++++++++++++++++++++++++++++++++++++++ */}
                <Route exact path="/landingpage" component={LandingPage} />
                <Route exact path="/topPage" component={TopPage} />

    
                <Route exact path="/tags/List" component={TagsList} />
                <Route exact path="/about" component={About} />
                <Route path="/post/detail(:id)?" component={PostDetail} /> 
                <Route path="/location/detail(:id)?" component={LocationDetail} /> 

                {/* test--------------------------------------------------------------------- */}
                {/* canvas test  */}
                <Route exact path="/canvasTest" component={CanvasTest} />
                {/* canvas circle animatin test */}
                <Route exact path="/canvasCircle" component={CanvasCircle} />
                {/* gsap ScrollTrigger timeline tutorial test */}
                <Route exact path="/greenSockTest" component={GreenSockTest} />
                {/* WebGL Distortion Hover Effects test  */}
                <Route exact path="/hoverEffect" component={HoverEffect} /> 
                {/* Three.js test npm i */}
                <Route exact path="/threeTest" component={ThreeTest} />  
                {/* gsap ScrollTrigger Test*/}
                <Route exact path="/ScrollTriggerTest" component={ScrollTriggerTest} />
                {/* react-curtains Basic plane test (curtains.js WebGL) */}
                <Route exact path="/ReactCurtainsBasicPlane" component={ReactCurtainsBasicPlane} />
                {/* react-curtains Simple plane test (curtains.js WebGL) */}
                <Route exact path="/ReactCurtainesSimplePlane" component={ReactCurtainesSimplePlane} />
                {/* react-curtains Multiple plane test (curtains.js WebGL) */}
                <Route exact path="/ReactCurtainsMultiplePlanes" component={ReactCurtainsMultiplePlanes} />
                {/* react-curtains Slideshow useing GSAP test (curtains.js WebGL) */}
                <Route exact path="/ReactCurtainsSlideshowGSAP" component={ReactCurtainsSlideshowGSAP} />
                {/* react-curtains Selective Render Targets test (curtains.js WebGL) */}
                <Route exact path="/ReactCurtainsSelectiveRenderTargets" component={ReactCurtainsSelectiveRenderTargets} />
                {/* react-curtains Multiple plane useing GSAPtest (curtains.js WebGL) */}
                <Route exact path="/ReactCurtainsMultipleplanesUsingGSAP" component={ReactCurtainsMultipleplanesUsingGSAP} />
                {/* gsapTest */}
                <Route exact path="/gsapTest" component={GsapTest} />
                {/* PageTransitionTest */}
                <Route exact path="/PageTransitionTest" component={PageTransitionTest} />
                {/* ComponentTransitionTest */}
                <Route exact path="/ComponentTransitionTest" component={ComponentTransitionTest} />
                
              <Auth>
                <Route exact path="/admin" component={Admin} />
                <Route path="/post/edit(:id)?" component={PostEdit} />
                <Route path="/stage/edit(:id)?" component={StageEdit} />
                <Route path="/tags/edit(:id)?" component={TagsEdit} />
                <Route path="/location/edit(:id)?" component={LocationEdit} />
              </Auth>
            </Switch>
                    </Transition>
                </TransitionGroup> 
        )} />
    </main>　
    )
}

export default Router
