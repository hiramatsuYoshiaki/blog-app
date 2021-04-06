import React,{useRef,useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {gsap,power2} from 'gsap'
import purple from '@material-ui/core/colors/purple';
import blueGrey from '@material-ui/core/colors/blueGrey';
import lightGreen from '@material-ui/core/colors/lightGreen';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';


const useStyles = makeStyles((theme) => ({
    topWraper:{
        color:'white' 
    },
    header:{
        width:'100%',
        height:'100vh',
        backgroundColor:red[500],
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    stages:{
        width:'100%',
        height:'100vh',
        backgroundColor:blueGrey[500],
    },
    posts:{
        width:'100%',
        height:'100vh',
        backgroundColor:lightGreen[500],
    },
    other:{
        width:'100%',
        height:'100vh',
        backgroundColor:purple[500],
    }
}))

const Top = () => {
    const classes = useStyles()
    const header = useRef(null)
    const stages = useRef(null)
    const posts = useRef(null)
    const other = useRef(null)
    useEffect(()=>{
        // let tl = gsap.timeline()
        gsap.fromTo(stages.current,
            { autoAlpha:0 },
            { duration:1,autoAlpha:1,ease:'"power2.out"',
                scrollTrigger:{trigger:stages.current,start:`top center+=100`,
                toggleActions:`play none none reverse`}
            }
        )
        gsap.fromTo(posts.current,
            { autoAlpha:0 },
            { duration:1,autoAlpha:1,ease:'"power2.out"',
                scrollTrigger:{trigger:posts.current,start:`top center+=100`,
                toggleActions:`play none none reverse`}
            }
        )
        gsap.fromTo(other.current,
            { autoAlpha:0 },
            { duration:1,autoAlpha:1,ease:'"power2.out"',
                scrollTrigger:{trigger:other.current,start:`top center+=100`,
                toggleActions:`play none none reverse`}
            }
        )
    },[])
    return (
        <div className={classes.topWraper}>
            <div ref={header} className={classes.header}>header</div>
            <div ref={stages} className={classes.stages}>stages</div>
            <div ref={posts} className={classes.posts}>posts</div>
            <div ref={other} className={classes.other}>other</div>
        </div>
    )
}

export default Top
