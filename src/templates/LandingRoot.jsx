import React,{useEffect,useState,useRef} from 'react' 
import {makeStyles} from '@material-ui/core/styles'
import {useDispatch,useSelector} from 'react-redux'
import {fetchPosts} from '../reducks/posts/operators'
import { fetchStages } from '../reducks/stage/operators'
import {getPosts} from '../reducks/posts/selectors'
import { getStages } from '../reducks/stage/selectors'

import {ReactCurtainsSlideshowGSAP, PostsArea,StagesArea} from '../components/landing/index'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'



import { gsap,power2} from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger' 
gsap.registerPlugin(ScrollTrigger)

const useStyles = makeStyles((theme) => ({
    //loading screen 
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        backgroundColor:'black',
        '& p':{ 
            margin:'16px'
        },
        display:'flex',
        justifyContent:'center', 
        alignItems:'center',
        flexDirection:'column',
        
      },
    
    root:{
        width:'100%',
        height:'100%',
        overflow:'hidden'
    },
    stage:{
        // border:'1px solid green'
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
        // border:'1px solid red',
        // padding:'30px 0'
      },
      
    section: {
        background: ' hsl(0, 0%, 96%)',  //$white-ter 
        height:'100%',
        // display:'flex',
        // justifyContent:'center',
        // alignItems:'center',
        // flexDirection:'column',
        width: '60vw', 
        // maxWidth:'400px',
        marginRight: '4vw',
        'nth-child(2n)': {
            background: '#eee',
        },
    },
    top: {
        minHeight: '50vh',
        width: '100%',
        overflowX: 'hidden',

        // padding: '5%',
        // display:'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // flexDirection:'column',
        // fontSize: '2em',
        // border:'1px solid red'
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
    // posts
    posts: {
        minHeight: '50vh',
        width: '100vw',
        overflowX: 'hidden', 
    },
    landingPostsWraper:{
        margin: '0 auto 100px auto',
        overflow:'hidden',
        backgroundColor:'hsl(0, 0%, 7%)'//$black-bis
    },
    postArea:{
        // minHeight:'800px',
        border:'1px solid white',
        width:'100%',
        margin: '0 auto',
        // md 960
        [theme.breakpoints.up('md')]: {  
            width:'960px',
            height:'640px',
        },
        [theme.breakpoints.up('lg')]: {
            width:'1200px',
            height:'900px',
        },
    }
}))  

const LandingRoot = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const postsAll = getPosts(selector)
    const stagesAll = getStages(selector)

    const [posts,setPosts] = useState([])
    const [stages,setStages] = useState([])
    const displayNumber = 4 //4投稿表示
    const displayYear = 2 //今年と昨年表示

    let stagesBox = useRef(null)
    let postsBox = useRef(null)
    let container = useRef(null)
    const [bottomMarginTop,setbottomMarginTop] = useState(0)
    let titleStage = useRef(null)
    let titlePosts = useRef(null)
    
    
    // Gsap fadein arrey
    const revealRefs = useRef([])
    revealRefs.current = []
    // セクションへのすべての参照をrevealRefs.current配列に追加する
    const addToRefs = el => {

        // console.log('addToRefs');
        // console.log(el);
        if(el && !revealRefs.current.includes(el)){
            revealRefs.current.push(el)
            // console.log(revealRefs.current);
            // console.log(revealRefs.current.el);
        }
    }
    useEffect(()=>{
        console.log('gsap fade in');
        // 我々は持っているすべてのセクションへのアクセスをを使用して新しいGSAPトゥイーンを作成し。次に、それらをループして、scrollTriggerます。
       
        revealRefs.current.forEach((el,index)=> {
            console.log(el);
            gsap.fromTo(el,
                { autoAlpha:0},
                { duration:1,
                    autoAlpha:1,
                    ease:'none',
                    scrollTrigger:{
                        id:`section-${index+1}`,
                        trigger:el,
                        start:`top center+=100`,
                        // end: "center top",
                        toggleActions:`play none none reverse`,
                        // markers: true,
                        pin: false, 
                    }
                }
            )
        })
    },[{...revealRefs.current}])

    //gsap scrolltrigger horizontal
    useEffect(()=>{

        console.log(container.current.scrollWidth);
        console.log('clientWidth',document.documentElement.clientWidth);
        console.log(container.current.offsetWidth);
        setbottomMarginTop(document.documentElement.clientWidth)
        // console.log('document.documentElement.clientWidth',document.documentElement.clientWidth);

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
                ease:'power2.out',
                scrollTrigger:{
                    // scrub: 1,
                    trigger:stagesBox.current,
                    start:`top center+=100`,
                    toggleActions:`play none none reverse`
                    
                }
            }
        )
        
   
    },[{...container.current},{...stagesBox.current}]) 
    

    //fetch posts
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
        setPosts(postsSort.slice(0, displayNumber))
    },[postsAll])
    // fetch stage filter 今年
    useEffect(()=>{
        const now = new Date();
        const selectYear = now.getFullYear()
        // console.log('selectYear',selectYear);
        let stagesSort = []
        stagesSort = stagesAll
        stagesSort = stagesAll.filter(stage => stage.stageYear > selectYear - displayYear)//strageYear:number
        stagesSort.sort(function(a,b){
            if(a.sort < b.sort) return -1;
            if(a.sort > b.sort) return 1;
            return 0;
        });
        setStages(stagesSort)
    },[stagesAll])

    useEffect(()=>{
        dispatch(fetchPosts())  
        dispatch(fetchStages())
    },[])

    return (
        // <div className="l-container-fluid">
        //     <div className="l-section ">
                <div className={classes.root} >
                    {/* content header slideshow with curtain.js */}
                    <div className={classes.top} >
                        <div className={classes.landingWraper}>
                            <header className={classes.landingHeader} >
                                <ReactCurtainsSlideshowGSAP posts={posts}/>
                            </header>
                        </div>
                    </div>
                    
                    {/* stage area with gsap scrollTggre horizontal  */}
                    <aside id="containerWrapper" 
                        className={classes.stage} 
                        ref={stagesBox}
                    >
                        <div className={classes.title} ref={titleStage}>
                            <h3>STAGES</h3>
                        </div>
                        <main ref={container} className={classes.main}>
                            {
                                stages.map((stage) => (
                                    <section 
                                        className={classes.section} 
                                        key={stage.id}>
                                        <StagesArea stage={stage}/>
                                    </section>
                                ))
                            }
                        </main> 
                    </aside>
                    
                    {/* new post area   */}
                    <div className={classes.posts} style={{marginTop:`${bottomMarginTop}px`}} ref={postsBox}>
                        <div className={classes.title} ref={titlePosts}>
                                <h3>POSTS</h3>
                        </div>
                        
                        <div className={classes.landingPostsWraper}>
                            {posts.map((post) => (
                                <div key={post.id} ref={addToRefs}
                                     className={classes.postArea}> 
                                    <PostsArea post={post} />  
                                </div>
                            ))}
                        </div>
                    </div> 

                    {/* loading screen */}
                    <Backdrop className={classes.backdrop} 
                                open={true} 
                                style={{display: postsAll.length > 0 ? "none" : "flex"}}
                    >
                        <CircularProgress color="inherit" />
                        <p>Now Loading....</p>
                        
                    </Backdrop> 
                </div>
        //     </div>
        // </div>
    )
}

export default LandingRoot
