import React,{useRef,useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger' 

import purple from '@material-ui/core/colors/purple';
import blueGrey from '@material-ui/core/colors/blueGrey';
import lightGreen from '@material-ui/core/colors/lightGreen';
import red from '@material-ui/core/colors/red';

const useStyles = makeStyles((theme) => ({
    content:{
        width:'100vw',
        height:'100vh',
        overflow:'hidden',
        border:'1px solid blue'
    },
    container: {
        width: '600%',
        height: '100%',
        display: 'flex',
        flexWrap: 'nowrap',
        backgroundColor: '#ADD8E6',
        // backgroundColor: 'lightblue',
        border:'1px solid green'

      },
      panel: {
        position: 'relative',
        color: 'black',
        width:'100vw',
        border:'1px solid red'
      },
      extra: {
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'white',
        height: '20vh',
      },
      
      
}))

const ScrollTriggerHorizontal = () => {
    const classes = useStyles()
    const container = useRef(null)
    const sections = useRef([])
    const addToRefs = el => {

        console.log('addToRefs');
        console.log(el);
        if(el && !sections.current.includes(el)){
            sections.current.push(el)
            console.log(sections.current);
            console.log(sections.current.el);
        }
    }
    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger);
        const tl = gsap.timeline({
            scrollTrigger: {
            trigger: container.current,
            pin: true,
            scrub: true,
            end: () => container.current.offsetWidth
          }
        })
        tl
        .to(sections.current, { duration: 2, xPercent: -100 * (sections.length - 1), ease: "none" })
        .to(container.current, { duration: 1, backgroundColor: '#FF0000', ease: "none" }, 0)
        .to(container.current, { duration: 1, backgroundColor: '#0000FF', ease: "none" }, 1)

    },[])

    return (
        <div className={classes.content}>
            <div className={classes.extra}>
            <p>scroll down</p>
            </div>

            <div className={classes.container} ref={container}>
                <section className={classes.panel} ref={addToRefs}>
                    ONE
                </section>
                <section className={classes.panel} ref={addToRefs}>
                    TWO
                </section>
                <section className={classes.panel} ref={addToRefs}>
                    THREE
                </section>
                <section className={classes.panel} ref={addToRefs}>
                    FOUR
                </section>
            </div>
        </div>

    )
}

export default ScrollTriggerHorizontal

// https://codepen.io/akapowl/pen/ff7dabf8f0946c406bdc61487b4f3f04
// 2021.4.13 removal animation-page