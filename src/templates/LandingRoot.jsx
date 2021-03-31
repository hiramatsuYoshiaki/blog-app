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



import { gsap } from "gsap";
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
        // display:'flex',
        // justifyContent:'center',
        // alignItems:'center',
        // flexDirection:'column',
        width: '60vw',
        marginRight: '4vw',
        'nth-child(2n)': {
            background: '#eee',
        },
        border:'3px solid white'
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
    },
    bottom: {
        minHeight: '50vh',
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
    },
}))  

const LandingRoot = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const postsAll = getPosts(selector)
    const stagesAll = getStages(selector)
    // console.log('stagesAll',stagesAll);

    const [posts,setPosts] = useState([])
    const [stages,setStages] = useState([])
    const displayNumber = 4 //4投稿表示
    const displayYear = 2 //今年と昨年表示
    // console.log('post',posts);
    // console.log('stages',stages);

    let container = useRef(null)
    // console.log('container.current',container.current);
    // console.log(stages);
    
    const [bottomMarginTop,setbottomMarginTop] = useState(0)
    // let bottomMarginTop = 2000
    
    
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
                        start:`top center+=100`,
                        toggleActions:`play none none reverse`
                    }
                }
            )
        })
    },[])
    //gsap scrolltrigger
    
    useEffect(()=>{

        // console.log(container.current.scrollWidth);
        // console.log('clientWidth',document.documentElement.clientWidth);
        // console.log(container.current.offsetWidth);
        setbottomMarginTop(document.documentElement.clientWidth)
        // console.log('document.documentElement.clientWidth',document.documentElement.clientWidth);

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
              end: () => "+=" + container.current.offsetWidth,
            //   ease:'power1.out',
            }
        })

        
    },[{...container.current}]) 

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
                    <div className={classes.top}>
                        <div className={classes.landingWraper}>
                            <header className={classes.landingHeader} >
                                <ReactCurtainsSlideshowGSAP posts={posts}/>
                            </header>
                        </div>
                    </div>
            
                    <aside id="containerWrapper">
                        <main ref={container} className={classes.main}>
                            {
                                stages.map((stage) => (
                                    <section className={classes.section} key={stage.id}>
                                        <StagesArea stage={stage}/>
                                    </section>
                                ))
                            }
                        </main>
                    </aside>

                    <div className={classes.bottom} style={{marginTop:`${bottomMarginTop}px`}}>
                        <div className={classes.landingPostsWraper}>
                            {posts.map((post) => (
                                <div key={post.id} ref={addToRefs}>
                                    <PostsArea post={post}/> 
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
