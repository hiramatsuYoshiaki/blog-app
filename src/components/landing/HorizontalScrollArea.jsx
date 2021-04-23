import React,{useEffect,useRef} from 'react'
import { StagesArea} from './index'
import {makeStyles} from '@material-ui/core/styles'
import { gsap} from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger' 
gsap.registerPlugin(ScrollTrigger)
const useStyles = makeStyles((theme) => ({
    stage:{
        margin:0,
        padding:0,
    },
    title:{ 
        dispaly:'fixed',
        width:'100%',
        height:'100%',
        overflow:'hidden',
        textAling:'center',
        color:'white',
        padding:'2rem 1rem',
    },
    main: {
        display:'flex',
        flexWrap:'wrap',
        flexDirection:'column',
        height:'50vh',
        willChange: 'transform',
      },
      
    section: {
        background: ' hsl(0, 0%, 96%)',  //$white-ter 
        height:'100%',
        width: '60vw', 
        marginRight: '4vw',
        'nth-child(2n)': {
            background: '#eee',
        },
    },

}))

const HorizontalScrollArea = props => { 
    const classes = useStyles()
    const stages = props.stages

    const stagesBox = useRef(null)
    const container = useRef(null)
    const titleStage = useRef(null)

    //gsap scrolltrigger horizontal
    useEffect(()=>{
        gsap.to(container.current, {
            x: () => -(container.current.scrollWidth - 
                document.documentElement.clientWidth) + "px", 
            duration:.2,
            scrollTrigger: {
              start: "center center",
              trigger: container.current,
              invalidateOnRefresh: true,
              pin: true, 
              scrub: 1,
              anticipatePin: 1, // can help avoid flash 
              end: () => "+=" + container.current.offsetWidth,
            }
        })
        gsap.fromTo(stagesBox.current,
            { autoAlpha:0 },
            { duration:.2,
                autoAlpha:1,
                // ease:'power2.out',
                scrollTrigger:{
                    // scrub: 1,
                    trigger:stagesBox.current,
                    start:`top center+=100`,
                    toggleActions:`play none none reverse`, 
                    invalidateOnRefresh: true,
                }
            }
        )
    },[]) 

    return (
        <div className={classes.stage} 
                ref={stagesBox} 
                >
            <div className={classes.title} ref={titleStage}>
                <h3>STAGES</h3>
                <p>最新のステージ</p>
            </div>
            <div className={classes.main}  ref={container}>
            {
                stages.map((stage) => (
                    <section 
                        className={classes.section} 
                        key={stage.id}>
                        <StagesArea stage={stage}/>
                    </section>
                ))
            }
            </div>
        </div>
    )
}

export default HorizontalScrollArea
