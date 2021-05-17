import React,{useEffect,useRef} from 'react'
import { StagesArea} from './index'
import {makeStyles} from '@material-ui/core/styles'
import { gsap,Power2} from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger' 
import indigo from '@material-ui/core/colors/indigo';
import PostsArea from './PostsArea';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    stage:{
        margin:0,
        padding:0,
    }, 
    postArea:{
        width:'100%',
        // height:'50vh',
        backgroundColor:indigo[700],
        overflow:'hidden',
        color:'white',
        padding:0,
        [theme.breakpoints.up('md')]:{
            flexDirection:'row',
            padding:'2rem 1rem',

        }
    },
    postListWraper:{
        display:'flex',
        flexDirection:'column',
        padding:'1.6rem .8rem',
        [theme.breakpoints.up('md')]:{
            flexDirection:'row',
        }
    },
    postListNav:{
        display:'none',
        width:'100%',
        [theme.breakpoints.up('md')]:{
            display:'block',
            width:'30%',
        },
        border:'1px solid white'
    },
    postListItems:{
        width:'100%',
        padding:'0 .8rem',
        [theme.breakpoints.up('md')]:{
            width:'70%',
            // flexGrow:1,
        },
        border:'1px solid white',
        '& ul':{
            margin:0,
            padding:0,
        },
        '& ul div':{
            boxShadow:'none',
        }

    },
    accordionSummary:{
        backgroundColor:indigo[700],
        color:'white',
        border:'none',
        '& ul':{
            boxShadow:'none',
            border:'none',
        }
    },
    accordionDetails:{
        backgroundColor:indigo[700],
        color:'white',
        border:'none',
    },

    title:{ 
        // dispaly:'fixed',
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
    const posts = props.posts

    const stagesBox = useRef(null)
    const container = useRef(null)
    const titleStageRef = useRef(null)
    const titlePostRef = useRef(null)

    //gsap scrolltrigger horizontal
    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger)
        gsap.to(container.current, {
            x: () => -(container.current.scrollWidth - 
                document.documentElement.clientWidth) + "px", 
            duration:.2,
            scrollTrigger: {
              start: "center center",
              trigger: container.current,
              invalidateOnRefresh: true,
            //   pin: true, 
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
        gsap.fromTo(titleStageRef.current,
            {
                autoAlpha:0,
                x:'100px'
            },{
                autoAlpha:1,
                x:0,
                ease:Power2.in,
                scrollTrigger:{
                    // scrub: 1,
                    trigger:titleStageRef.current,
                    start:`top center+=100`,
                    toggleActions:`play none none reverse`,
                    // markers:true, 
                }
            })
        gsap.fromTo(titlePostRef.current,
            {
                autoAlpha:0,
                x:'100px'
            },{
                autoAlpha:1,
                x:0,
                ease:Power2.in,
                scrollTrigger:{
                    // scrub: 1,
                    trigger:titlePostRef.current,
                    start:`top center+=100`,
                    toggleActions:`play none none reverse`,
                    // markers:true, 
                }
            })
    },[container.current,stagesBox.current,titleStageRef.current]) 

    return (
        <div className={classes.stage} 
                ref={stagesBox} 
                >
            <div className={classes.postArea} >
                <div ref={titlePostRef}>
                    <h3>POST</h3>
                    <p>最新の投稿</p>
                </div>
                <div className={classes.postListWraper}>
                    <div className={classes.postListNav}>
                        <ul>
                        {posts.map(post => (
                                    <li key={post.id}>
                                        <h3>{post.title}</h3>
                                    </li>
                            ))}
                        </ul>
                    </div>
                    <div className={classes.postListItems}>
                        <ul>
                            {posts.map(post => (
                                    // <li key={post.id}>
                                    //     <h3>{post.title}</h3>
                                    // </li>
                                    <Accordion key={post.id}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        className={classes.accordionSummary}
                                        >
                                        <h3 >{post.title}</h3>
                                        </AccordionSummary>
                                        <AccordionDetails className={classes.accordionDetails}>
                                        <p>
                                        {post.article}
                                        </p>
                                        </AccordionDetails>
                                    </Accordion>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={classes.title} ref={titleStageRef}>
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
            <div></div>
            

        </div>
    )
}

export default HorizontalScrollArea
