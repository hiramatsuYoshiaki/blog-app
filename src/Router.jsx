import React from 'react'
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
  

} from './templates/index'
import Auth from './Auth'
const Router = () => {
    return (
      <main className='l-main'>
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
           
            
            
          <Auth>
            <Route exact path="/admin" component={Admin} />
            <Route path="/post/edit(:id)?" component={PostEdit} />
            <Route path="/stage/edit(:id)?" component={StageEdit} />
            <Route path="/tags/edit(:id)?" component={TagsEdit} />
            <Route path="/location/edit(:id)?" component={LocationEdit} />
          </Auth>
        </Switch>
    </main>　
    )
}

export default Router
