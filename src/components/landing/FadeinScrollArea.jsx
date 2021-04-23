import React,{useRef,useEffect} from 'react'
import {PostsArea} from './index'
import {makeStyles} from '@material-ui/core/styles'
import { gsap} from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger' 
gsap.registerPlugin(ScrollTrigger)
const useStyles = makeStyles((theme) => ({
    posts: {
        minHeight: '50vh',
        width: '100vw',
        overflowX: 'hidden', 
        padding:'1.6rem 0 0 0'
    },
    title:{
        color:'white',
        padding:'0 0 1.6rem .8rem'
    }
})) 

const FadeinScrollArea = props => {
    const classes = useStyles()
    const posts = props.posts
    let postsBox = useRef(null)
    let container = useRef(null)
    // Gsap fadein arrey
    const revealRefs = useRef([])
    revealRefs.current = []
    // セクションへのすべての参照をrevealRefs.current配列に追加する
    const addToRefs = el => {
        if(el && !revealRefs.current.includes(el)){
            revealRefs.current.push(el)
        }
    }
    useEffect(()=>{
        // すべてのセクションへのアクセスをを使用して新しいGSAPトゥイーンを作成し。次に、それらをループして、scrollTriggerます。
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
    },[])

    return (
        <div ref={postsBox} className={classes.posts}>
            <div className={classes.title}>
                <h3>POSTS</h3>
                <p>最新の投稿</p>
            </div>
            <div ref={container}>
                {posts.map((post) => (
                    <div key={post.id} 
                         ref={addToRefs}
                            // className={classes.postArea}
                            > 
                        <PostsArea post={post} />  
                    </div>
                ))}
            </div>
        </div>
    )
}


export default FadeinScrollArea
