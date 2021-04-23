import React,{useRef,useEffect} from 'react'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {makeStyles} from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({ 
    //loading screen 
    root: {
        margin:0,
        padding:0,
      },
    slideShowArea:{
        width:'100%',
        minHeight:'100vh',
        backgroundColor:'green',
    },
    HorizontalScrollArea:{
        width:'100%',
        minHeight:'100vh',
        backgroundColor:'lightBlue',

    },
    FadeinScrollArea:{
        width:'100%',
        minHeight:'100vh',
        backgroundColor:'pink',

    },
})) 
const LandingComponent = (props) => {
    const classes = useStyles()
    const posts = props.posts
    const stages = props.stages
    // console.log(posts);
    // console.log(stages);
    const slideShowAreaRef = useRef()
    const horizontalScrollAreaRef = useRef()
    const fadeinScrollAreaRef = useRef()

    const revealRefs = useRef([])
    revealRefs.current = []
    // セクションへのすべての参照をrevealRefs.current配列に追加する
    const addToRefs = el => {
        if(el && !revealRefs.current.includes(el)){
            revealRefs.current.push(el)
        }
    }

    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger)
        gsap.fromTo(horizontalScrollAreaRef.current,
                {
                    autoAlpha:0
                },{
                    autoAlpha:1,
                    ease:'power2.out',
                    scrollTrigger:{
                        // scrub: 1,
                        trigger:horizontalScrollAreaRef.current,
                        start:`top center+=100`,
                        toggleActions:`play none none reverse`,
                        markers:true, 
                    }
                }
        )
        gsap.fromTo(fadeinScrollAreaRef.current,
                {
                    autoAlpha:0
                },{
                    autoAlpha:1,
                    ease:'power2.out',
                    scrollTrigger:{
                        // scrub: 1,
                        trigger:fadeinScrollAreaRef.current,
                        start:`top center+=100`,
                        toggleActions:`play none none reverse`,
                        markers:true, 
                    }
                }
        )
        revealRefs.current.forEach((el,index)=> {
            gsap.fromTo(el,
                { autoAlpha:.1},
                { duration:.5,
                    autoAlpha:1,
                    // ease:"power2",
                    scrollTrigger:{
                        id:`section-${index+1}`,
                        trigger:el,
                        start:`top center+=100`,
                        // end: "center top",
                        toggleActions:`play none none reverse`,
                        // markers: true,
                    }
                }
            )
        }) 

    },[horizontalScrollAreaRef.current,fadeinScrollAreaRef.current,revealRefs.current])
    return (
        <div className={classes.root}>
            <div className={classes.slideShowArea}
                 ref={slideShowAreaRef}
            >
                SlideShowArea
            </div>
            <div className={classes.HorizontalScrollArea}
                 ref={horizontalScrollAreaRef}
            >
                <div >
                    <h3>STAGES</h3>
                    <p>最新のステージ</p>
                </div>
            </div>
            <div className={classes.FadeinScrollArea}
                 ref={fadeinScrollAreaRef}
            >
                <div >
                    <h3>POSTS</h3>
                    <p>最新の投稿</p>
                </div>
                <div>
                {posts.map((post) => (
                    <div key={post.id} 
                         ref={addToRefs}
                            // className={classes.postArea}
                            > 
                        {/* <PostsArea post={post} />   */}
                        <h1>Posts element</h1>
                    </div>
                ))}
            </div>
            </div>
           
        {/* <SlideshowArea posts={posts}/> */}
        {/* <HorizontalScrollArea stages={stages} /> */}
        {/* <FadeinScrollArea posts={posts}/> */}
        </div>
    )
}

export default LandingComponent
