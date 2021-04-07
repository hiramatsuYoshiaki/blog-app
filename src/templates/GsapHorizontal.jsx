import React,{useRef,useEffect,useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger' 
const useStyles = makeStyles((theme) => ({
    body:{
        '--text-color': '#111',
        '--bg-color': '#b9b3a9',
        fontFamily: 'termina, sans-serif',
        color: 'var(--text-color)',
        background: 'var(--bg-color)',
        transition: '.5s ease-out',
        maxWidth: '100%',
        width: '100%',
        overscrollBehavior: 'none',//overscroll-behavior プロパティは、スクロール領域の境界に達したときにブラウザーが何をするかを設定します。
    },
    
    section: {
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gridGap: '2rem',
        padding: '50px 10vw',
        margin: 'auto',
        placeItems: 'center',
        border:'1px solid white'
    },
    horizontalScroll: {
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        left: 0,
        // border:'3px solid red'
      },
    credit: {
        fontFamily: 'Termina, sans-serif',
        '& a': {
            '--text-color': '#111',
            color: 'var(--text-color)',
        }
    },
    
    pinWrap: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '50px 10vw',
    
        '& > *': {
        minWidth: '60vw',
        padding: '0 5vw',
    }
    },
    
    img:{
        height: '80vh',
        width: 'auto',
        objectFit: 'cover',
    },
    h1:{
        fontSize: '5rem',
        lineHeight: 1,
        fontWeight: 800,
        marginBottom: '1rem',
        position: 'absolute',
        top: '10vw',
        left: '10vw',
        zIndex: 4,
        overflowWrap: 'break-word',
        hyphens: 'auto',//文字列を複数行にわたって折り返す際に、単語のハイフネーションを行う方法を指定します。
        [theme.breakpoints.down('sm')]: {  
            fontSize: '16vw',
        },
        // border:'1px solid grey',
    },
    h2:{
        fontSize: '2rem',
        maxWidth: '400px',
        border:'1px solid grey'
    },
    p: {
        position: 'absolute',
        bottom: '10vw',
        right: '10vw',
        width: '200px',
        lineHeight: 1.5,
      },
    span:{
        display:'block'
    }
}))

const GsapHorizontal = () => {
    const classes = useStyles()
    const bodyRef = useRef(null)
    const containerRef = useRef(null)

    //test
    const horizontalRef = useRef(null)

    const sectionRefs = useRef([])
    sectionRefs.current = []
    const HorizontalSectionRefs = useRef([])
    HorizontalSectionRefs.current = []
    // セクションへのすべての参照をsectionRefs.current配列に追加する
    const  addToRefs = el => {
        // console.log('HorizontalSectionRefs');
        // console.log('addToRefs el',el);
        // if(el.querySelector(".pinWrap")){
        //     console.log('pinWrap',el.querySelector(".pinWrap"));
        // }
        // section all chenge background color
        if(el && !sectionRefs.current.includes(el) ){
            sectionRefs.current.push(el)
            // console.log('addToRefs el',el);
            // console.log('addToRefs el',el.dataset.bgcolor);
            // console.log('sectionRefs.current',sectionRefs.current);
        }
        //horizontal section slide
        if(el && !HorizontalSectionRefs.current.includes(el) && el.querySelector(".pinWrap")){
            HorizontalSectionRefs.current.push(el)
            // console.log('HorizontalSectionRefs el ',el);
            // console.log('HorizontalSectionRefs.current',HorizontalSectionRefs.current);
        }
    }
    useEffect(()=>{
        // Pinning and horizontal scrolling
        // HorizontalSectionRefs.current.forEach(horizontalSection =>{
            
        //     let pinWrap = horizontalSection.querySelector(".pinWrap")
            
        //     let pinWrapWidth = pinWrap.offsetWidth
        //     let horizontalScrollLength = pinWrapWidth - window.innerWidth

        //     console.log(horizontalSection);
        //     console.log('pinWrap',pinWrap);
        //     console.log('pinWrapWidth',pinWrapWidth);
        //     console.log('window.innerWidth',window.innerWidth);
        //     console.log('horizontalScrollLength',horizontalScrollLength);
        //     gsap.to(pinWrap,{
        //             x: -horizontalScrollLength,
        //             ease: "none", 
        //             scrollTrigger:{
        //                 scroller:containerRef.current,
        //                 scrub:true,
        //                 trigger:horizontalSection,
        //                 pin:true,
        //                 start:"top top",
        //                 end:()=> `+=${pinWrapWidth}`,
        //                 invalidateOnRefresh: true,
        //                 anticipatePin: 1,
        //             },
        //     })
        // })
        // console.log('useEffect');
        // console.log('horizontalRef.current.scrollWidth',horizontalRef.current.scrollWidth);
        // console.log('document.documentElement.clientWidth',document.documentElement.clientWidth);
        // console.log('horizontalRef.current.offsetWidth',horizontalRef.current.offsetWidth);
       
        gsap.to(horizontalRef.current, {
            x: () => -(horizontalRef.current.scrollWidth - document.documentElement.clientWidth) + "px",
            scrollTrigger: {
                scroller:containerRef.current,
              start: "center center",
              trigger: horizontalRef.current,
              invalidateOnRefresh: true,
              pin: true,
              scrub: 1,
            //   anticipatePin: 1, // can help avoid flash
              end: () => "+=" + horizontalRef.current.offsetWidth
            }
          })

    },[bodyRef.current,containerRef.current,sectionRefs.current,HorizontalSectionRefs.current,addToRefs,    horizontalRef.current])
    return (
        <div className={classes.body} ref={bodyRef}>
            
            <div className={classes.container} ref={containerRef}>
                <section className={classes.section} data-textcolor="#bcb8ad" data-bgcolor="#032f35" ref={addToRefs}>
                    <div>
                        <h1>
                            <span data-scroll data-scroll-direction="horizontal" data-scroll-speed="-1" className={classes.span}>Horizontal</span> 
                            <span data-scroll data-scroll-direction="horizontal" data-scroll-speed="-2" className={classes.span}>scroll</span> 
                            <span data-scroll data-scroll-direction="horizontal" data-scroll-speed="-3" className={classes.span}>+ colors</span></h1>
                        <p data-scroll data-scroll-speed="2" data-scroll-delay="0.2">with GSAP ScrollTrigger & Locomotive Scroll. NOT WORKING :(</p>
                    </div>
                </section>

                <section className={classes.horizontalScroll} data-textcolor="#bcb8ad" data-bgcolor="#815946" ref={addToRefs} >
                    <div className={classes.pinWrap + " pinWrap"} ref={horizontalRef}>
                        <h2>This whole horizontal section should be brown</h2>
                        <img src="https://images.pexels.com/photos/5207262/pexels-photo-5207262.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900" alt="" />
                        <img src="https://images.pexels.com/photos/3371358/pexels-photo-3371358.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900" alt="" />
                        <img src="https://images.pexels.com/photos/3618545/pexels-photo-3618545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900" alt="" />
                    </div>
                </section>

                <section className={classes.section} data-textcolor="#032f35" data-bgcolor="#bcb8ad" ref={addToRefs}>
                    <div>
                        <h2 data-scroll data-scroll-speed="1">
                            <span>This should be a light cream background</span>
                        </h2>
                    </div>
                </section>
        
                <section className={classes.section} data-bgcolor="#e3857a" data-textcolor="#f1dba7" ref={addToRefs}>
                    <img src="https://images.pexels.com/photos/4791474/pexels-photo-4791474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                    <h2 data-scroll data-scroll-speed="1">This should be a pink background</h2>
                </section>
                <section className={classes.horizontalScroll} data-textcolor="#bcb8ad" data-bgcolor="#815946"  ref={addToRefs}>
                    <div className={classes.pinWrap + " pinWrap"} >
                        <h2>This whole horizontal section should be brown</h2>
                        <img src="https://images.pexels.com/photos/5207262/pexels-photo-5207262.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900" alt="" />
                        <img src="https://images.pexels.com/photos/3371358/pexels-photo-3371358.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900" alt="" />
                        <img src="https://images.pexels.com/photos/3618545/pexels-photo-3618545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900" alt="" />
                    </div>
                </section>
                <section className={classes.section} data-textcolor="#032f35" data-bgcolor="#bcb8ad" ref={addToRefs}>
                    <div>
                        <h2 data-scroll data-scroll-speed="1">
                            <span>This should be a light cream background</span>
                        </h2>
                    </div>
                </section>
        
                <section className={classes.section} data-bgcolor="#e3857a" data-textcolor="#f1dba7" ref={addToRefs}>
                    <img src="https://images.pexels.com/photos/4791474/pexels-photo-4791474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                    <h2 data-scroll data-scroll-speed="1">This should be a pink background</h2>
                </section>
        </div>
      </div>
    )
}

export default GsapHorizontal
