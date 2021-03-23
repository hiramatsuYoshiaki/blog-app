import React,{useRef,useEffect,useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';
import teal from '@material-ui/core/colors/teal';
import Button from '@material-ui/core/Button';
gsap.registerPlugin(ScrollTrigger)
const useStyles = makeStyles((theme) => ({
    content:{
        width:'100%',
        height:'100%',
        paddign:'20px',
        border:'1px solid white',
        color:'white',
        padding:'10px',
    },
    // nav:{
    //     display:'flex',
    //     padding:'4px 0',
    // },
    box:{
        width:'100px',
        height:'100px',
        borderRadius:'5px',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        fontSize:'1rem',
    },
    boxGreen800:{
        backgroundColor:green[800]
    },
    boxGreen600:{
        backgroundColor:green[600]
    },
    boxGreen400:{
        backgroundColor:green[400]
    },
    boxBlue800:{
        backgroundColor:blue[800]
    },
    boxRed800:{
        backgroundColor:red[800]
    },
    boxPink800:{
        backgroundColor:pink[800]
    },
    boxPink600:{
        backgroundColor:pink[600]
    },
    boxTeal800:{
        backgroundColor:teal[600]
    },
    spacer:{
        height:'10px',
    },
    spacer200:{
        height:'200px',
    },
    button:{
        marginLeft:'8px'
    }
}))

const GsapTest = () => {
    const classes = useStyles()
    const [ctl,setCtl] = useState()
    const boxGreen800 = useRef(null)
    const boxGreen600 = useRef(null)
    const boxGreen400 = useRef(null)
    const boxBlue800 = useRef(null)
    const boxRed800 = useRef(null)
    const boxPink800 = useRef(null)
    const boxPink600 = useRef(null)
    const boxTeal800 = useRef(null)
    useEffect(()=> {
        // gsap.To()
        let tlTo = gsap.timeline();
        tlTo.to(boxGreen800.current,{
            x:'50vw',
            duration: 2,
        })
        .to(boxGreen600.current,{
            x:'50vw',
            y:'220px',
            duration: 2,
        })
        .to(boxGreen400.current,{
            x:'50vw',
            duration: 2,
            rotation: 360,
        })
        // .seek(2)
        // .progress(0.5)
        // .play()
        // gsap.from()
        let tlFrom = gsap.timeline();
        tlFrom.from(boxBlue800.current,{opacity: 0, x: '50vw', duration: 2})
        // gsap.fromTo()
        let tlFromTo = gsap.timeline();
        // tlFromTo.fromTo(boxRed800.current, {x: '50vw'}, {opacity: 0.5, duration: 1})
        tlFromTo.fromTo(boxRed800.current, {opacity: 0,x: '50vw'}, {opacity: 0.5, x: '25vw', duration: 3})

        //control
        const tlCtl = gsap.timeline()
        const control = tlCtl.to(boxPink800.current,{
                            x:'50vw',
                            duration: 2,
                        })
                        .to(boxPink600.current,{
                            x:'50vw',
                            duration: 2,
                            rotation: 360,
                        })
        tlCtl.pause()
        setCtl(control)

        //ScrollTriger
        const tlScroll = gsap.timeline({
            scrollTrigger: {
                trigger: boxTeal800.current, 
                start: "top center",
                end: "center top",
                scrub: true,
                markers: true
            }}
        )
        tlScroll.to(boxTeal800.current, {
            x: 500,
          });

    },[])
    return (
        <div className={classes.content}>
            <h5>timeline + gsap.to</h5>
            <div ref={boxGreen800} className={classes.box + " " + classes.boxGreen800}>
                <div>x:50</div>
            </div>
            <div className={classes.spacer}></div>
            <div ref={boxGreen600} className={classes.box + " " + classes.boxGreen600}>
                <div>x:50vw</div>
                <div>y:220</div>
            </div>
            <div className={classes.spacer}></div>
            <div ref={boxGreen400} className={classes.box + " " + classes.boxGreen400}>
                <div>rotation:360</div>
            </div>
            <div className={classes.spacer200}></div>

            <h5>timeline + gsap.from</h5>
            <div className={classes.spacer}></div>
            <div ref={boxBlue800} className={classes.box + " " + classes.boxBlue800}>
                <div>w:50vw</div>
            </div>

            <h5>timeline + gsap.fromTo</h5>
            <div className={classes.spacer}></div>
            <div ref={boxRed800} className={classes.box + " " + classes.boxRed800}>FromTo</div>

            <h5>controle</h5>
            <div className={classes.spacer}></div>
            <div class="nav">
                <Button onClick={()=>ctl.play()} variant="outlined" color="secondary" className={classes.button}>play()</Button>
                <Button onClick={()=>ctl.pause()} variant="outlined" color="secondary" className={classes.button}>pause()</Button>
                <Button onClick={()=>ctl.resume()} variant="outlined" color="secondary" className={classes.button}>resume()</Button>
                <Button onClick={()=>ctl.reverse()} variant="outlined" color="secondary" className={classes.button}>revers()</Button>
                <Button onClick={()=>ctl.restart()} variant="outlined" color="secondary" className={classes.button}>restart()</Button>
            </div>
            <div className={classes.spacer}></div>
            <div ref={boxPink800} className={classes.box + " " + classes.boxPink800}>control </div>
            <div className={classes.spacer}></div>
            <div ref={boxPink600} className={classes.box + " " + classes.boxPink600}>control </div>
            <div className={classes.spacer}></div>

            <h5>ScrollTriger</h5>
            <div className={classes.spacer}></div>
            <div ref={boxTeal800} className={classes.box + " " + classes.boxTeal800}>ScrollTrigger </div>
            <div className={classes.spacer}></div>









            
            <div className={classes.spacer200}></div>
            <div className={classes.spacer200}></div>
            <div className={classes.spacer200}></div>
            <div className={classes.spacer200}></div>
            <div className={classes.spacer200}></div>
            <div className={classes.spacer200}></div>

        </div>
    )
}

export default GsapTest
