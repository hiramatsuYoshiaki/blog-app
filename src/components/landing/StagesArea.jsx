import React,{useEffect,useRef} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { gsap } from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
const useStyles = makeStyles((theme) => ({
    root:{
        width:'100%',
        height:'100%',
        backgroundColor:'white',
        overflow:'hidden'
    },
    main: {
        display:'flex',
        flexWrap:'wrap',
        flexDirection:'column',
        height:'70vh',
        willChange: 'transform',
      },
      
      section: {
        background: 'blue',
        height:'100%',
        display:'flex',
        width: '60vw',
        marginRight: '4vw',
        'nth-child(2n)': {
            background: '#eee',
        }
      },
      text: {
        height: '80vh',
        padding: '5%',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2em',
        width: '100%',
        overflowX: 'hidden',
      }
})) 

const StagesArea = () => {
    const classes = useStyles()
    let container = useRef(null)
    useEffect(()=>{
        gsap.to(container.current, {
            x: () => -(container.current.scrollWidth - 
                document.documentElement.clientWidth) + "px",
            scrollTrigger: {
              start: "center center",
              trigger: container.current,
              invalidateOnRefresh: true,
              pin: true,
              scrub: 1,
              anticipatePin: 1, // can help avoid flash 
              end: () => "+=" + container.current.offsetWidth
            }
        })
    },[]) 
    return (
        <>
            <div className={classes.text}>最近のステージ </div>
            <aside id="containerWrapper">
                <main ref={container} className={classes.main}>
                    <div className={classes.section}></div>
                    <div className={classes.section}></div>
                    <div className={classes.section}></div>
                    <div className={classes.section}></div>
                    <div className={classes.section}></div>
                    <div className={classes.section}></div>
                    <div className={classes.section}></div>
                    <div className={classes.section}></div>
                    <div className={classes.section}></div>
                    {/* <section className={classes.section}></section>
                    <section className={classes.section}></section>
                    <section className={classes.section}></section>
                    <section className={classes.section}></section> */}
                </main>
            </aside>
            <div className={classes.text}>TOURdeHDR</div>
        </>
    )
}

export default StagesArea
