import React,{useEffect,useState,useRef} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {fetchPosts} from '../reducks/posts/operators'
import {getPosts} from '../reducks/posts/selectors'
import logo from '../assets/img/h-logo.svg';
import { makeStyles } from '@material-ui/core/styles';
import { gsap } from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {ReactCurtainsSlideshowGSAP, PostsArea} from '../components/landing/index'



gsap.registerPlugin(ScrollTrigger)

const useStyles = makeStyles((theme) => ({
    landingWraper:{
        textAlign:'center',
        width:'100%',
    },
    // appLogo: {
    //     pointerEvents: 'none',
    //     maxWidth: '100%',
    //     width:'200px',
    //     height:'200px;'
    // },
    landingHeader: {
        minHeight: 'calc(100vh - 6.4rem)',
        margin: '0 auto 0 auto', 
        position:'relative',
    },
    landingMain:{
        margin: '100px auto 100px auto',
    },
    landingPostsWraper:{
        margin: '0 auto 100px auto',
    },
    landingStagesWraper:{
        margin: '0 auto 100px auto',
    },
    landingFooter: {
        backgroundColor: '#262626',
        width:'100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        color: 'white',
        margin: '0 auto 100px auto', 
    },
}))


const Landing = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const postsAll = getPosts(selector)
    const displayNumber = 4

    const [posts,setPosts] = useState([])
    
    const footerRef = useRef(null);
    const revealRefs = useRef([])

    revealRefs.current = []

    
    
    // セクションへのすべての参照をrevealRefs.current配列に追加する
    const addToRefs = el => {
        if(el && !revealRefs.current.includes(el)){
            revealRefs.current.push(el)
        }
    }

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
    useEffect(()=>{
        // 我々は持っているすべてのセクションへのアクセスをを使用して新しいGSAPトゥイーンを作成し。次に、それらをループして、scrollTriggerます。
        revealRefs.current.forEach((el,index)=> {
            gsap.fromTo(el,
                { 
                    autoAlpha:0 
                },
                {
                    duration:1,
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
        // <div className="l-container-fluid">
        //     <div className="l-section-fluid ">
                <div className={classes.landingWraper}>
                    <header className={classes.landingHeader} >
                        <ReactCurtainsSlideshowGSAP posts={posts}/>
                    </header>
                  
                    <main className={classes.landingMain}>
                        <div className={classes.landingPostsWraper}>
                            {posts.map((post) => (
                                <div key={post.id} ref={addToRefs}>
                                    <PostsArea post={post}/>
                                </div>
                            ))}
                        </div>
                        <div className={classes.landingPostsWraper}>
                            <h1 style={{color:'white'}}>stages</h1>
                        </div>
                    </main> 

                    <footer ref={footerRef} className={classes.landingFooter} >
                        <h1 className={{color:'white'}}>Footer </h1>
                        {/* <img src={logo} className={classes.appLogo} alt="logo" />
                        <button onClick={() => toggleBackground()}>Change background</button> */}
                    </footer>
                    
                   
                </div>
        //     </div>
        // </div>
    )
}

export default Landing
