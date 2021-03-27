import React,{useEffect,useState,useRef} from 'react'
import logo from '../assets/img/h-logo.svg';
import { makeStyles } from '@material-ui/core/styles';
import { gsap } from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const useStyles = makeStyles((theme) => ({
    app:{
        textAlign:'center',
    },
    appLogo: {
        pointerEvents: 'none',
        maxWidth: '100%',
        width:'200px',
        height:'200px;'

    },
    appHeader: {
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
    appSection:{
        maxWidth: 'calc(80% - 50px)',
        margin: '0 auto 100px auto',
        padding: '50px',
        backgroundColor: '#fff',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    }
}))
const sections = [
    {
        title:'Title 1',
        subtitle:'Subtitle 1'
    },
    {
        title:'Title 2',
        subtitle:'Subtitle 2'
    },
    {
        title:'Title 3',
        subtitle:'Subtitle 3'
    },
]


const GreenSockTest = () => {
    const classes = useStyles()
    const headerRef = useRef(null);
    const revealRefs = useRef([])
    revealRefs.current = []
    
    // セクションへのすべての参照をrevealRefs.current配列に追加する
    const addToRefs = el => {
        if(el && !revealRefs.current.includes(el)){
            revealRefs.current.push(el)
        }
    }

    const [background, setBackground] = useState('#5a7d95');
    const toggleBackground = () => {
        const color = background !== '#5a7d95' ? '#5a7d95' : '#1b4943'; 
        setBackground(color);
    }
    // useEffect(()=>{
    //     gsap.from(headerRef.current, {
    //         autoAlpha: 0,
    //         ease: 'none',
    //         delay: 1
    //     });
    // },[])
    useEffect(()=>{
        gsap.to(headerRef.current, {
            backgroundColor: background,
            duration: 1, 
            ease: 'none'
        });
    },[background])
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
        <div className={classes.app}>
            <header ref={headerRef} className={classes.appHeader} >
                <h1 className={{color:'white'}}>GreenSockText</h1>
                <img src={logo} className={classes.appLogo} alt="logo" />
                <button onClick={() => toggleBackground()}>Change background</button>
            </header>
            {/* 複数のセクションと個別にそれらをトリガーする、我々はする必要があり、引用文献の配列を作成します  */}
            {sections.map(({title,subtitle}) => (
                <div className={classes.appSection} key={title} ref={addToRefs}>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                </div>
            ))}
        </div>
    )
}

export default GreenSockTest 

//https://ihatetomatoes.net/react-and-greensock-tutorial-for-beginners/
