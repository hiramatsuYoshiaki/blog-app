import React from 'react'
import { Route, Switch } from 'react-router'

import {
  Home,
  HomeBlog,
  SignIn,
  SignOut,
  Admin,
  PostEdit,
  PostList,
  PostDetail,
  PostPage,
  StageEdit,
  StageList,
  StagePage,
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
  Top,
  Landing,
  LandingRoot,
  LandingHorizontalScroll,
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
  ComponentTransitionTest,
  LoadingDisplayTest,
  ImageLoadingTest,
  LoadingDispalyFetchDataTest,
  ScrollTriggerHorizontal,
  GsapChengeBackgroundColor,
  LocomotiveScrollSimpleTest,
  GsapDynamicBackgroundColorHorizontal,
  GsapHorizontal,
  GsapScrollingTrigerTest,
  ReactTransitionTest

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


                <Route exact path="(/)?" component={Landing} />
                {/* <Route exact path="(/)?" component={GsapDynamicBackgroundColorHorizontal} /> */}
                {/* <Route exact path="(/)?" component={HomeBlog} /> */}
                <Route exact path="/home" component={Home} />

                <Route exact path="/post/list" component={PostList} />
                <Route exact path="/post/listgrid" component={PostListGrid} />
                <Route exact path="/post/listgridImage" component={PostListGridImage} />
                <Route exact path="/blog/data" component={BlogData} />
                <Route exact path="/stage/listgridline" component={StageListGridLine} />
                <Route exact path="/stage/List" component={StageList} />
                <Route exact path="/location/List" component={LocationList} />
                <Route exact path="/location/map" component={LocationMap} /> 

                {/* blog test page ++++++++++++++++++++++++++++++++++++++++ */}
                <Route exact path="/landingroot" component={LandingRoot} />
                <Route exact path="/LandingHorizontalScroll" component={LandingHorizontalScroll} />
                <Route exact path="/landing" component={Landing} />
    
                <Route exact path="/tags/List" component={TagsList} />
                <Route exact path="/about" component={About} />
                <Route path="/post/detail(:id)?" component={PostDetail} /> 
                <Route path="/post/page(:id)?" component={PostPage} /> 
                {/* <Route path="/post/selected(:id)?" component={PostSelected} />  */}
                <Route path="/location/detail(:id)?" component={LocationDetail} /> 
                
                {/* syuuseicyuu  landingRoot --> stagelistGrid*/}
                <Route path="/stage/detail(:id)?" component={StageListGridLine} />  
                <Route path="/stage/page(:id)?" component={StagePage} />  

                {/* test--------------------------------------------------------------------- */}
                {/*LoadingDispalyFetchDataTest */}
                <Route exact path="/LoadingDispalyFetchDataTest" component={LoadingDispalyFetchDataTest} /> 


                {/* test remove XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */}
                {/* dell */}
                <Route exact path="/landingpage" component={LandingPage} /> 
                <Route exact path="/topPage" component={TopPage} />
                <Route exact path="/top" component={Top} />
                <Route exact path="/HomeBlog" component={HomeBlog} />
                {/* canvas test  remove*/}
                <Route exact path="/canvasTest" component={CanvasTest} />
                {/* canvas circle animatin test remove*/}
                <Route exact path="/canvasCircle" component={CanvasCircle} />
                {/* gsap ScrollTrigger timeline tutorial test remove*/}
                <Route exact path="/greenSockTest" component={GreenSockTest} />
                {/* WebGL Distortion Hover Effects test  remove*/}
                <Route exact path="/hoverEffect" component={HoverEffect} /> 
                {/* Three.js test  remove*/}
                <Route exact path="/threeTest" component={ThreeTest} />  
                {/* gsap ScrollTrigger Test remove */}
                <Route exact path="/ScrollTriggerTest" component={ScrollTriggerTest} />
                {/* react-curtains Basic plane test (curtains.js WebGL) remove */}
                <Route exact path="/ReactCurtainsBasicPlane" component={ReactCurtainsBasicPlane} />
                {/* react-curtains Simple plane test (curtains.js WebGL) remove*/}
                <Route exact path="/ReactCurtainesSimplePlane" component={ReactCurtainesSimplePlane} />
                {/* react-curtains Multiple plane test (curtains.js WebGL) remove*/}
                <Route exact path="/ReactCurtainsMultiplePlanes" component={ReactCurtainsMultiplePlanes} />
                {/* react-curtains Slideshow useing GSAP test (curtains.js WebGL) remove*/}
                <Route exact path="/ReactCurtainsSlideshowGSAP" component={ReactCurtainsSlideshowGSAP} />
                {/* react-curtains Selective Render Targets test (curtains.js WebGL) remove*/}
                <Route exact path="/ReactCurtainsSelectiveRenderTargets" component={ReactCurtainsSelectiveRenderTargets} />
                {/* react-curtains Multiple plane useing GSAPtest (curtains.js WebGL) remove*/}
                <Route exact path="/ReactCurtainsMultipleplanesUsingGSAP" component={ReactCurtainsMultipleplanesUsingGSAP} />
                {/* gsapTest remove */}
                <Route exact path="/gsapTest" component={GsapTest} />
                {/* ScrollTriggerHorizontal remove */}
                <Route exact path="/ScrollTriggerHorizontal" component={ScrollTriggerHorizontal} />
                
                {/* ComponentTransitionTest removal*/}
                <Route exact path="/ComponentTransitionTest" component={ComponentTransitionTest} />
                {/* loading display test remove*/}
                <Route exact path="/LoadingDisplayTest" component={LoadingDisplayTest} />
                {/*ImageLoadingTest  remove*/}  
                <Route exact path="/ImageLoadingTest" component={ImageLoadingTest} />

                
                
                {/*GsapChengeBackgroundColor remove*/} 
                <Route exact path="/GsapChengeBackgroundColor" component={GsapChengeBackgroundColor} />
                {/*LocomotiveScrollSimpleTest remove*/}
                <Route exact path="/LocomotiveScrollSimpleTest" component={LocomotiveScrollSimpleTest} />
                {/*GsapDynamicBackgroundColorHorizontal remove*/}
                <Route exact path="/GsapDynamicBackgroundColorHorizontal" component={GsapDynamicBackgroundColorHorizontal} />
              
                {/*GsapHorizontal remove*/}
                <Route exact path="/GsapHorizontal" component={GsapHorizontal} />
                {/*GsapScrollingTrigerTest remove*/}
                <Route exact path="/GsapScrollingTrigerTest" component={GsapScrollingTrigerTest} />

                {/* ReactTransitionTest */}
                <Route exact path="/ReactTransitionTest" component={ReactTransitionTest} />

              

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
