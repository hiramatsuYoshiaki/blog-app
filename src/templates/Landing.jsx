import React,{useEffect,useRef} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { fetchPosts } from '../reducks/posts/operators'
import { fetchStages } from '../reducks/stage/operators'
import { getPosts } from '../reducks/posts/selectors'
import { getStages } from '../reducks/stage/selectors'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {makeStyles} from '@material-ui/core/styles'
gsap.registerPlugin(ScrollTrigger)

const useStyles = makeStyles((theme) => ({
    langingWraper:{
        width:'100%',
        height:'100%',
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
        height:'100%',
        width: '60vw',
        display:'flex',
        
        // marginRight: '4vw',
        'nth-child(2n)': {
            background: '#eee',
        },
        '& img':{
            width:'100%',
            height:'auto'
        },
        [theme.breakpoints.up('sm')]: {
            '& img':{
                width:'600px',
                height:'auto'
            },
          },
        [theme.breakpoints.up('md')]: {
            '& img':{
                width:'800px',
                height:'auto'
            },
          },

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
        color:'white'
      }
}))

const Landing = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state)  => state)
    const posts = getPosts(selector)
    const stages = getStages(selector)
    
    
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
    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchStages()) 
    }, [])
    return (
        <div className={classes.landingWraper}> 
            <div className={classes.text}>horizontal scrolling</div>
            <aside id="containerWrapper">
                <main ref={container} className={classes.main}>
                    {posts.map(post => (
                        <section className={classes.section}>
                            <img src= {post.topImages[0].path} alt=""/>
                        </section>
                    ))}
                </main>
            </aside>
            <div className={classes.text}>this is the end</div>
        </div>
    )
}

export default Landing
