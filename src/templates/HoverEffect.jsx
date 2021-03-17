import React,{useEffect,useRef} from 'react'
import hoverEffect from 'hover-effect';
import img21 from '../assets/hoverEffectImg/img/Img21.jpg'
import img22 from '../assets/hoverEffectImg/img/Img22.jpg'
import displacemeny1 from '../assets/hoverEffectImg/img/displacement/1.jpg'
import {makeStyles} from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    root:{
        height:'100vh',
        width:'100%',
        color:'white'
    },
    myDiv:{
        height:'20rem', 
        width:'30rem',
        backgroundColor:'grey'
    }
}))
const HoverEffect = () => {
    const classes = useStyles()
    let myRef = useRef()
    useEffect(()=>{
        const  effect = new hoverEffect({
            parent: myRef.current,
            intensity: 0.3,
            image1: img21,
            image2: img22,
            displacementImage: displacemeny1
        })
    })
    return (
        <div className={classes.myDiv}>
            <h1>Test</h1>
            <div ref={myRef} className={classes.myDiv}></div>
        </div>
    )
}
 
export default HoverEffect
// https://github.com/robin-dela/hover-effect/issues/15
