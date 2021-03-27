import React,{useEffect,useState,useRef,useCallback} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {fetchPosts} from '../reducks/posts/operators'
import {getPosts} from '../reducks/posts/selectors'
import logo from '../assets/img/h-logo.svg';
import { makeStyles } from '@material-ui/core/styles';
import { gsap } from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {ReactCurtainsSlideshowGSAP} from '../components/landing/index'

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
    landingSection:{
        maxWidth: 'calc(80% - 50px)',
        margin: '0 auto 100px auto',
        padding: '50px',
        backgroundColor: '#fff',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    landingFooter: {
        backgroundColor: '#262626',
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
const sections = [
    {
        title:'Stage 1',
        subtitle:'Subtitle 1'
    },
    {
        title:'Stage 2',
        subtitle:'Subtitle 2'
    },
    {
        title:'Stage 3',
        subtitle:'Subtitle 3'
    },
    {
        title:'Stage 4',
        subtitle:'Subtitle 3'
    },
    {
        title:'Stage 5',
        subtitle:'Subtitle 3'
    },
]

const Landing = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    // const posts = getPosts(selector)
    const [posts, setPosts] = useState(getPosts(selector))

    console.log('Landing');
    console.log(posts);
   
   
    useEffect(()=>{
        dispatch(fetchPosts())
    },[])
    useEffect(()=>{
        setPosts(getPosts(selector))
    },[getPosts(selector)])
    
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
    return (
        // <div className="l-container-fluid">
        //     <div className="l-section-fluid ">
                <div className={classes.landingWraper}>
                    <header className={classes.landingHeader} >
                        <ReactCurtainsSlideshowGSAP posts={posts}/>
                    </header>
                    {sections.map(({title,subtitle}) => (
                        <div className={classes.landingSection} key={title} ref={addToRefs}>
                            <h2>{title}</h2>
                            <p>{subtitle}</p>
                        </div>
                    ))}
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
