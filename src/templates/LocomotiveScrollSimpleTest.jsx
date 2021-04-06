import React,{useEffect,useRef} from 'react'
import locomotiveScroll from "locomotive-scroll";
import {makeStyles} from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    body: {
        margin: 0,
        textAlign: 'center',
        font: '900 120% system-ui, sans-serif',
        backgroundColor:'white'
      },
      
      section: {
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
        border:'1px solid black',
        color:'black'
      }
      
    // App: {
    //     textAlign: 'center',
    //     color:'white'
    //   },
      
    //   h1: {
    //     margin: '500px 0 50px',
    //   },
      
    //   scroll: {
    //     padding: '0 0 200vh'
    //   }
}))


const LocomotiveScrollSimpleTest = () => {
    const classes = useStyles()
    const scrollRef = useRef()
    useEffect(()=>{
        const scroll = new locomotiveScroll({
            el: scrollRef.current,
            smooth: true
          });
        //   console.log(scroll);
    },[])
    return (
        <div data-scroll-container ref={scrollRef} className={classes.body}>
            <div className={classes.section} data-scroll-section>
                <div>
                    <h1 data-scroll>Hey</h1>
                    <p data-scroll data-scroll-direction="horizontal" data-scroll-speed="12" style={{marginLeft: '20vw'}}>👋</p>
                </div>
            </div>
            <div className={classes.section} data-scroll-section>
                <div>
                    <h2 data-scroll data-scroll-speed="1">Looks like rain</h2>
                    <p data-scroll data-scroll-speed="9">🌧</p>
                </div>
            </div>
            <div className={classes.section} data-scroll-section>
                <div>
                    <h2 data-scroll data-scroll-speed="1">Have an apple</h2>
                    <p data-scroll data-scroll-direction="horizontal" data-scroll-speed="8">🍎</p>
                </div>
            </div>

        </div>
        // <div className={classes.App}>
        //     <div className={classes.scroll} 
        //          ref={scrollRef} 
        //          >
        //             <h1 className={classes.h1}
        //                 data-scroll 
        //                 data-scroll-speed="3" 
        //                 data-scroll-position="top"
        //             >
        //                 Locomotive Scroll in React
        //             </h1>
        //             <h2
        //             data-scroll
        //             data-scroll-speed="1"
        //             data-scroll-position="top"
        //             data-scroll-direction="horizontal"
        //             >
        //                 Go Sideways!!
        //             </h2>  
        //          </div>
                
        // </div>
    )
}

export default LocomotiveScrollSimpleTest
