import React,{useEffect,useState,useRef} from 'react' 
import {makeStyles} from '@material-ui/core/styles'
import {useDispatch,useSelector} from 'react-redux'
import {fetchPosts} from '../reducks/posts/operators'
import {getPosts} from '../reducks/posts/selectors'
import {ReactCurtainsSlideshowGSAP, PostsArea} from '../components/landing/index'



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
        justifyContent:'center',
        alignItems:'center',
        width: '60vw',
        marginRight: '4vw',
        'nth-child(2n)': {
            background: '#eee',
        }
    },
    top: {
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',

        // padding: '5%',
        // display:'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // flexDirection:'column',
        // fontSize: '2em',
    },
    bottom: {
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',

        // padding: '5%',
        // display:'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // fontSize: '2em',
    
    },
    //header---
    landingWraper:{
        textAlign:'center',
        width:'100%',
    },
    landingHeader: {
        minHeight: 'calc(100vh - 6.4rem)',
        margin: '0 auto 0 auto', 
        position:'relative',
        overflow:'hidden',
    },
    landingPostsWraper:{
        margin: '100px auto 100px auto',
        overflow:'hidden',
        height:'100%',
    },
})) 

const LandingRoot = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const postsAll = getPosts(selector)
    const [posts,setPosts] = useState([])
    const displayNumber = 4
    console.log(posts);
    
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
        // 我々は持っているすべてのセクションへのアクセスをを使用して新しいGSAPトゥイーンを作成し。次に、それらをループして、scrollTriggerます。
        revealRefs.current.forEach((el,index)=> {
            gsap.fromTo(el,
                { autoAlpha:0 },
                { duration:1,
                    autoAlpha:1,
                    ease:'none',
                    scrollTrigger:{
                        id:`section-${index+1}`,
                        trigger:el,
                        start:'top center+=100',
                        toggleActions:`play none none reverse`
                    }
                }
            )
        })
    },[])
    //gsap scrolltrigger
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

    //retch posts
    useEffect(()=>{
        let postsSort = []
        //投稿記事を選択------
        postsSort = postsAll.filter(posts => posts.type === 'post')
        // ソート降順
        postsSort.sort(function(a,b){
            if(a.created_at > b.created_at) return -1;
            if(a.created_at < b.created_at) return 1;
            return 0;
        });
        // setPosts(postsSort)
        setPosts(postsSort.slice(0, displayNumber))
    },[postsAll])
    useEffect(()=>{
        dispatch(fetchPosts())  
    },[])

    return (
        <div className={classes.root}>
            <div className={classes.top}>
                <div className={classes.landingWraper}>
                    <header className={classes.landingHeader} >
                        <ReactCurtainsSlideshowGSAP posts={posts}/>
                    </header>
                </div>
                
            </div>
            <aside id="containerWrapper">
                <main ref={container} className={classes.main}>
                    <section className={classes.section}>
                        <h1>STAGE section</h1>
                        <h1> prev</h1>
                    </section>
                    <section className={classes.section}>
                        <h1>1</h1>
                    </section>
                    <section className={classes.section}>
                        <h1>2</h1>
                    </section>
                    <section className={classes.section}>
                        <h1>3</h1>
                    </section>
                    <section className={classes.section}>
                        <h1>4</h1>
                    </section>
                    <section className={classes.section}>
                    <h1>STAGE section</h1>
                    <h1>back</h1>
                    </section>
                </main>
            </aside>
            <div className={classes.bottom}>
                <div className={classes.landingPostsWraper}>
                    {posts.map((post) => (
                        <div key={post.id} ref={addToRefs}>
                            <PostsArea post={post}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LandingRoot
