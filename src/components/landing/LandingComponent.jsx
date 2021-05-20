import React,{useRef,useEffect} from 'react'
import {gsap,Power2} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {makeStyles} from '@material-ui/core/styles'
import {SlideshowArea} from './index'
// import {SlideshowArea,HorizontalScrollArea} from './index'
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router' 
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
gsap.registerPlugin(ScrollTrigger)


const useStyles = makeStyles((theme) => ({ 
    //loading screen 
    root: {
        margin:0,
        padding:0,
      },
    slideShowArea:{
        width:'100%',
        minHeight:'100vh',
    },
    HorizontalScrollArea:{
        width:'100%',
        minHeight:'100vh',
    },
    FadeinScrollArea:{
        width:'100%',
        minHeight:'100vh',
        color:'white',
    },
    stageArea:{
        display:'flex',
        flexWrap:'wrap',
        flexDirection:'column',
        height:'50vh',
        willChange: 'transform',
    },
    horezontalArea:{
        background: ' hsl(0, 0%, 96%)',  //$white-ter 
        height:'100%',
        width: '60vw', 
        marginRight: '4vw',
        'nth-child(2n)': {
            background: '#eee',
        },
    },
    postArea:{
        color:'white',
        minHeight:'80vw',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'cneter',
        alignItems:'center',
        [theme.breakpoints.up('md')]: {
            minHeight:'40vw',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
        },
    },
    postImageArea:{
        width:'100%',
        
        // height:'60%',
        [theme.breakpoints.up('md')]: {
            height:'40vw',
           width:'50vw',
        },
        // border:'1px solid white',
    },
    postSbscrive:{
        width:'100%',
        // height:'40%',
        padding:'1rem 1rem',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        [theme.breakpoints.up('md')]: {
            height:'40vw',
            width:'50vw',
            padding:'1rem 3rem',
        },
        
    },
    postImg:{
        width:'100%',
        height:'100%',
        objectFit: 'contain',
        // border:'1px solid yellow',
    }, 
    postTitle:{
        '& h3':{
            margin:'0 1.6rem 1rem 1.6rem ',
            fontWeight: '300',
            fontSize:'1.8rem',
            [theme.breakpoints.up('md')]: {
                fontSize:'3rem',
                margin:'0 3.2rem 3.2rem 3.2rem ',
            },
            [theme.breakpoints.up('lg')]: { 
                fontSize:'4rem',
            },
            cursor:'pointer',
            '&:hover': {
                opacity: .7
            },
        }
    },
    postText:{
        color:'hsl(0, 0%, 98%)', 
        maxWidth: '50%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        [theme.breakpoints.up('md')]: {
            maxWidth: '80%',
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: '50%',
        },
    },
    linkbutton:{
        fontSize:'1.5rem',
        fontWeight:600,
        margin:'.4rem 0 0 -1.2rem',
        '& span':{
            marginRight:'.4rem',
        }
    },
    postHeader:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        margin:'0  0 .8rem 0',
        [theme.breakpoints.up('md')]: {
            margin:'4rem 0 0 0',
        },
        // border:'1px solid white',
    },
})) 
const LandingComponent = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    
    // const posts = props.posts
    // const stages = props.stages
    const postsCover = props.postsCover
    const covers = props.covers
    // console.log('landingComponent');
    // console.log(covers);
    const slideShowAreaRef = useRef()
    // const horizontalScrollAreaRef = useRef()
    const fadeinScrollAreaRef = useRef()
    const postHeaderRef = useRef()

    const revealRefs = useRef([])
    revealRefs.current = []
    // セクションへのすべての参照をrevealRefs.current配列に追加する
    const addToRefs = el => {
        if(el && !revealRefs.current.includes(el)){
            revealRefs.current.push(el)
        }
    }

    useEffect(()=>{ 
        // gsap.registerPlugin(ScrollTrigger)
        // gsap.fromTo(horizontalScrollAreaRef.current,
        //         {
        //             autoAlpha:0
        //         },{ 
        //             autoAlpha:1,
        //             ease:Power2.in,
        //             scrollTrigger:{
        //                 // scrub: 1,
        //                 trigger:horizontalScrollAreaRef.current,
        //                 start:`top center+=100`,
        //                 toggleActions:`play none none reverse`,
        //                 // markers:true, 
        //             }
        //         }
        // )

        //posts area
        gsap.fromTo(fadeinScrollAreaRef.current,
                {
                    autoAlpha:0
                },{
                    autoAlpha:1,
                    ease:Power2.in,
                    scrollTrigger:{
                        // scrub: 1,
                        trigger:fadeinScrollAreaRef.current,
                        start:`top center+=100`,
                        toggleActions:`play none none reverse`,
                        // markers:true, 
                    }
                }
        )
        revealRefs.current.forEach((el,index)=> {
            gsap.fromTo(el,
                { autoAlpha:0},
                { duration:.4,
                    autoAlpha:1,
                    ease:Power2.in,
                    scrollTrigger:{
                        id:`section-${index+1}`,
                        trigger:el,
                        start:`top center+=100`,
                        toggleActions:`play none none reverse`,
                        // markers: true,
                    }
                }
            )
            gsap.fromTo(el.querySelector('img'),1,
                { opacity: 0, x: '100px', duration: 0},
                { duration:.4,
                    opacity: 1, 
                    x: 0,
                    ease:Power2.in,
                    scrollTrigger:{
                        id:`section-${index+1}`,
                        trigger:el.querySelector('img'),
                        start:`top center+=100`,
                        toggleActions:`play none none reverse`,
                        // markers: true,
                    }
                }
            )
            gsap.fromTo(el.querySelector('section'),1,
                { opacity: 0, x: '100px', duration: 0,},
                { duration:.4,
                    opacity: 1,
                    delay:.5, 
                    x: 0,
                    ease:Power2.in,
                    scrollTrigger:{
                        id:`section-${index+1}`,
                        trigger:el.querySelector('section'),
                        start:`top center+=100`,
                        toggleActions:`play none none reverse`,
                        // markers: true,
                    }
                }
            )
        //   tl.fromTo(el.querySelector('.stageNo'),1,{opacity: 0, x: '100px', duration: 0},{opacity: 1, x: 0,})

        }) 

    // },[horizontalScrollAreaRef.current,fadeinScrollAreaRef.current,revealRefs.current])
    },[fadeinScrollAreaRef.current,revealRefs.current])
    useEffect(()=>{
        
        gsap.fromTo(postHeaderRef.current,
            {
                autoAlpha:0,
                x:'100px'
            },{
                autoAlpha:1,
                x:0,
                ease:Power2.in,
                scrollTrigger:{
                    // scrub: 1,
                    trigger:postHeaderRef.current,
                    start:`top center+=100`,
                    toggleActions:`play none none reverse`,
                    // markers:true, 
                }
            }
    )
    },[postHeaderRef.current])
    return (
        <div className={classes.root}>
            <div className={classes.slideShowArea}
                 ref={slideShowAreaRef}
            >
                {/* <SlideshowArea posts={posts}/> */}
                <SlideshowArea posts={covers}/>
            </div>
            {/* <div className={classes.HorizontalScrollArea}
                 ref={horizontalScrollAreaRef}
            >
                <HorizontalScrollArea stages={stages} posts={posts} />
            </div> */}
            
            
            <div className={classes.FadeinScrollArea}
                 ref={fadeinScrollAreaRef}
            >
                <div ref={postHeaderRef} className={classes.postHeader}>
                        <h3>POSTS</h3>
                        <p>最新の投稿</p>
                </div>
                <div>
                    {postsCover.map((post) => (
                        <div className={classes.postArea}
                             key={post.id} 
                             ref={addToRefs}
                        > 
                           
                            <div className={classes.postImageArea + " img" }> 
                                <img src={post.topImages[0].path} 
                                    alt={post.title} 
                                    key={post.topImages[0].id}
                                    className={classes.postImg}
                                />
                            </div>

                            <section className={classes.postSbscrive + " subscrive"}>
                                <div className={classes.postTitle}>
                                    <h3 className="c-glitch c-about-glich" 
                                        data-text={post.title} 
                                        onClick={() => dispatch(push('/post/detail/' + post.id))}
                                    >
                                        {post.title}
                                    </h3>
                                </div>
                                
                                <p className={classes.postText}>{post.postDate.split('T')[0] }</p>
                                <p className={classes.postText}>{post.article}</p>
                                
                                <Button 
                                    onClick={() => dispatch(push('/post/detail/' + post.id))} 
                                    size="large"
                                    color="secondary"
                                    className={classes.linkbutton}
                                >
                                    <span>この投稿を見る</span>
                                    <ArrowForwardIosIcon />
                                </Button>
                            </section>
                        </div>
                    ))}
            </div>
            </div>
       
        </div>
    )
}

export default LandingComponent
