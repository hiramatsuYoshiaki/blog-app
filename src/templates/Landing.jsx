import React,{useEffect,useState,useRef} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {fetchStages} from '../reducks/stage/operators'
import {fetchPosts} from '../reducks/posts/operators'
import {getStages} from '../reducks/stage/selectors'
import {getPosts} from '../reducks/posts/selectors'
import { makeStyles } from '@material-ui/core/styles';
import {LandingComponent} from '../components/landing/index'
// import {HorizontalScrollArea, FadeinScrollArea, SlideshowArea} from '../components/landing/index'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

// import { gsap } from "gsap";
// import {ScrollTrigger} from 'gsap/ScrollTrigger'
// import {ReactCurtainsSlideshowGSAP, PostsArea} from '../components/landing/index'
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
    
})) 


// gsap.registerPlugin(ScrollTrigger)

// const useStyles = makeStyles((theme) => ({
//     landingWraper:{
//         textAlign:'center',
//         width:'100%',
//     },
//     landingHeader: {
//         minHeight: 'calc(100vh - 6.4rem)',
//         margin: '0 auto 0 auto', 
//         position:'relative',
//     },
//     landingMain:{
//         margin: '100px auto 100px auto',
//     },
//     landingPostsWraper:{
//         margin: '0 auto 100px auto',
//     },
//     landingStagesWraper:{
//         margin: '0 auto 100px auto',
//     },
//     landingFooter: {
//         backgroundColor: '#262626',
//         width:'100%',
//         minHeight: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontSize: 'calc(10px + 2vmin)',
//         color: 'white',
//         margin: '0 auto 100px auto', 
//     },
// }))


const Landing = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const stagesAll = getStages(selector)
    const postsAll = getPosts(selector)
    const displayYear = 2 //今年と昨年表示
    const [stages,setStages] = useState([])
    const displayNumber = 4 //4投稿表示
    const [posts,setPosts] = useState([])
    // fetch stage filter 今年
    useEffect(()=>{
        const now = new Date();
        const selectYear = now.getFullYear()
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
    //ステージデータを取得
    useEffect(()=>{
        dispatch(fetchStages())
        dispatch(fetchPosts()) 
    },[dispatch])

    
    // const footerRef = useRef(null);
    // const revealRefs = useRef([])

    // revealRefs.current = []

    
    
    // セクションへのすべての参照をrevealRefs.current配列に追加する
    // const addToRefs = el => {
    //     if(el && !revealRefs.current.includes(el)){
    //         revealRefs.current.push(el)
    //     }
    // }

    // const [background, setBackground] = useState('#5a7d95');
    // const toggleBackground = () => {
    //     const color = background !== '#5a7d95' ? '#5a7d95' : '#1b4943'; 
    //     setBackground(color);
    // }
    // useEffect(()=>{
    //     gsap.to(footerRef.current, {
    //         backgroundColor: background,
    //         duration: 1, 
    //         ease: 'none'
    //     });
    // },[background])
    // useEffect(()=>{
    //     revealRefs.current.forEach((el,index)=> {
    //         gsap.fromTo(el,
    //             { 
    //                 autoAlpha:0 
    //             },
    //             {
    //                 duration:1,
    //                 autoAlpha:1,
    //                 ease:'none',
    //                 scrollTrigger:{
    //                     id:`section-${index+1}`,
    //                     trigger:el,
    //                     start:'top center+=100',
    //                     toggleActions:`play none none reverse`
    //                 }
    //             }
    //             )
    //     })
    // },[])

    return (
        <>
        <LandingComponent stages={stages} posts={posts}/>
        <Backdrop 
                className={classes.backdrop} 
                open={true} 
                style={{
                    display: (stagesAll.length > 0 && postsAll.length > 0) 
                    ? "none" 
                    : "flex"
                }}
            >
                <CircularProgress color="inherit" />
                <p>Now Loading....</p>
            </Backdrop>
        </>
        // <div className="l-container-fluid">
        //     <div className="l-section-fluid ">
                // <div className={classes.landingWraper}>
                //     <header className={classes.landingHeader} >
                //         <ReactCurtainsSlideshowGSAP posts={posts}/>
                //     </header>
                  
                //     <main className={classes.landingMain}>
                //         <div className={classes.landingPostsWraper}>
                //             {posts.map((post) => (
                //                 <div key={post.id} ref={addToRefs}>
                //                     <PostsArea post={post}/>
                //                 </div>
                //             ))}
                //         </div>
                //         <div className={classes.landingPostsWraper}>
                //             <h1 style={{color:'white'}}>stages</h1>
                //         </div>
                //     </main> 

                //     <footer ref={footerRef} className={classes.landingFooter} >
                //         <h1 className={{color:'white'}}>Footer </h1>
                //     </footer>
                    
                   
                // </div>
        //     </div>
        // </div>
    )
}

export default Landing
