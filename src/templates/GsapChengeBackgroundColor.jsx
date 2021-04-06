import React,{useRef,useEffect,useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger' 
import LocomotiveScroll from 'locomotive-scroll'

import purple from '@material-ui/core/colors/purple';
import blueGrey from '@material-ui/core/colors/blueGrey';
import lightGreen from '@material-ui/core/colors/lightGreen';
import red from '@material-ui/core/colors/red';

const useStyles = makeStyles((theme) => ({
    body:{
        fontFamily: 'termina, sans-serif',
        // color: var(--text-color),
        // background: var(--bg-color),
        // transition: '0.3s ease-out',
        transition: '1s ease-out',
        overflowX: 'hidden',
        color:'white'
    },
    
    section: {
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gridGap: '2rem',
        padding: '50px 10vw',
        maxWidth: '1000px',
        margin: 'auto',
        placeItems: 'center',
        border:'1px solid black'
    },
    
    img:{
        maxHeight: '80vh',
        width: '100%',
        objectFit: 'contain',
        section:{
            'first-child': {
                position: 'absolute'
            }
        }
    },
    h1:{
        display: 'flex',
        fontSize: '4rem',
        zIndex: 2,
        lineHeight: 1.2,
        fontWeight: 700,
        // @media (max-width: 768px) {
        //     font-size: 2rem,
        // }
        [theme.breakpoints.down('sm')]: {  
            fontSize: '2rem',
        },
        border:'1px solid grey'
    },
    h2:{
        fontSize: '2rem',
        maxWidth: '400px',
        border:'1px solid grey'
    }
}))

const GsapChengeBackgroundColor = () => {
    const classes = useStyles()
    const [color, setColor] = useState({
        testColor:'',
        bgColor:''
    })
   const bodyRef = useRef(null)
   const containerRef = useRef(null)
   const sectionElements = [
            {   id:1,
                img:"https://images.pexels.com/photos/3062948/pexels-photo-3062948.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                // dataBgcolor:"#bcb8ad",
                dataBgcolor:"green",
                dataTextcolor:"#032f35"},
            {   id:2,
                img:"https://images.pexels.com/photos/4467879/pexels-photo-4467879.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                // dataBgcolor:"#eacbd1",
                dataBgcolor:"red",
                dataTextcolor:"#536fae"},
            {   id:3,
                img:"https://images.pexels.com/photos/5604966/pexels-photo-5604966.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                // dataBgcolor:"#536fae",
                dataBgcolor:"yellow",
                dataTextcolor:"#eacbd1"},
            {   id:4,
                img:"https://images.pexels.com/photos/4791474/pexels-photo-4791474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                // dataBgcolor:"#e3857a",
                dataBgcolor:"grey",
                dataTextcolor:"#f1dba7"},
   ]

   const sectionRefs = useRef([])
    sectionRefs.current = []
    // セクションへのすべての参照をsectionRefs.current配列に追加する
    const addToRefs = el => {
        // console.log('addToRefs');
        
        if(el && !sectionRefs.current.includes(el)){
            sectionRefs.current.push(el)
            console.log('addToRefs el',el);
            console.log(el.dataset.bgcolor);
            console.log('sectionRefs.current',sectionRefs.current);
        }
    }
    

   useEffect(()=>{
    /* SMOOTH SCROLL */
    const scroller = new LocomotiveScroll({
        el:containerRef.current,
        smooth: true
      });
      console.log('scroller',scroller);
      scroller.on("scroll", ScrollTrigger.update);
      //特定のスクローラー要素のscrollTopおよび/またはscrollLeftゲッター/セッターをハイジャックして、
      //スムーズなスクロールやその他のカスタム効果などを実装できるようにします。
      ScrollTrigger.scrollerProxy(containerRef.current, {
        scrollTop(value) {
          return arguments.length//arguments.length プロパティは、関数に渡された引数の数が入ります。
            ? scroller.scrollTo(value, 0, 0)
            : scroller.scroll.instance.scroll.y;
        },
        //Element.getBoundingClientRect() メソッドは、要素の寸法と、そのビューポートに対する位置を返します。
        getBoundingClientRect() {
          return {
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight
          };
        }
      });
      //次のイベントのいずれかのリスナーを追加します：「scrollStart」、「scrollEnd」、「refreshInit」、「revert」、「matchMedia」、
      //または「refresh」。これらは、そのようなScrollTrigger関連のイベントが発生したときにグローバルにディスパッチされます
      ScrollTrigger.addEventListener("refresh", () => scroller.update());
      //ページ上のすべてのScrollTriggersの位置を再計算します
      ScrollTrigger.refresh();
    
    /* COLOR CHANGER */
    sectionRefs.current.forEach((el,i)=> {
        console.log('useEffect');
        console.log('sectionRefs.current',sectionRefs.current);
        console.log('el',el);
        const scrollColorElems = el.dataset.bgcolor
        console.log('scrollColorElems', scrollColorElems)
        //前のセクションの背景色を保持
        const prevBg = i === 0 ? "" : sectionRefs.current[i - 1].dataset.bgcolor;
        const prevText = i === 0 ? "" :sectionRefs.current[i - 1].dataset.textcolor;
        console.log('bodyRef',bodyRef);
        console.log('containerRef',containerRef);

        // ScrollTrigger.create({
        //     trigger: el,
        //     // scroller: el,
        //     start: "top 50%",
        //     onEnter: () =>
        //       gsap.to(el, {
        //         backgroundColor: el.dataset.bgcolor,
        //         color: el.dataset.textcolor,
        //         overwrite: "auto"
        //     }),
        //     onLeaveBack: () =>
        //       gsap.to(el, {
        //         backgroundColor: prevBg,
        //         color: prevText,
        //         overwrite: "auto"
        //     })
        // });

        ScrollTrigger.create({
            trigger: el,
            // scroller: containerRef.current,
            start: "top 50%",
            onEnter: () =>
              gsap.to(bodyRef.current, {
                backgroundColor: el.dataset.bgcolor,
                color: el.dataset.textcolor,
                overwrite: "auto",
                marker:true,
            }),
            onLeaveBack: () =>
              gsap.to(bodyRef.current, {
                backgroundColor: prevBg,
                color: prevText,
                overwrite: "auto",
                marker:true,
            }),
            
        });

        // gsap.fromTo(el,
        //     { autoAlpha:0},
        //     { duration:1,
        //         autoAlpha:1,
        //         ease:'none',
        //         scrollTrigger:{
        //             id:`section-${index+1}`,
        //             trigger:el,
        //             start:`top center+=100`,
        //             // end: "center top",
        //             toggleActions:`play none none reverse`,
        //             markers: true,
        //             pin: false, 
        //         }
        //     }
        // )
        // const colorChangeHeader = gsap.fromTo(el, 
        //     { backgroundColor: red[500] },
        //     { backgroundColor: blueGrey[500] })

        // ScrollTrigger.create({
        //     trigger: el,
        //     start: "top 50%",
        //     end: "bottom+=300 bottom-=300px",
        //     // start: "buttom buttom",
        //     // end: "botto+=100 center",
        //     scrub: true,
        //     animation: colorChangeHeader,
        //     markers:true,
        // });
    })
   },[sectionRefs.current,containerRef.current,bodyRef.current])
    return (
        <div className={classes.body} ref={bodyRef}>
            <div className='container' ref={containerRef}>
                {sectionElements.map(element =>(
                    <section data-bgcolor={element.dataBgcolor} 
                        data-textcolor={element.dataTextcolor} 
                        className={classes.section} 
                        key={element.id}
                        ref={addToRefs}
                    >
                        <h1 data-scroll data-scroll-speed="3" className={classes.h1}>
                            Change background colour with GSAP ScrollTrigger
                        </h1>
                        <img src={element.img} 
                            alt="" 
                            className={classes.img}/>
                    </section>
                ))}
                {/* <section data-bgcolor="#bcb8ad" data-textcolor="#032f35" className={classes.section}>
                    <h1 data-scroll data-scroll-speed="3" className={classes.h1}>
                        Change background colour with GSAP ScrollTrigger
                    </h1>
                    <img src="https://images.pexels.com/photos/3062948/pexels-photo-3062948.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                         alt="" 
                         className={classes.img}/>
                </section>
                <section data-bgcolor="#eacbd1" data-textcolor="#536fae" className={classes.section}>
                    <img src="https://images.pexels.com/photos/4467879/pexels-photo-4467879.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                         alt="" 
                         className={classes.img}
                    />
                    <h2 data-scroll data-scroll-speed="1" className={classes.h2}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </h2>
                </section>
                <section data-bgcolor="#536fae" data-textcolor="#eacbd1" className={classes.section}>
                    <img src="https://images.pexels.com/photos/5604966/pexels-photo-5604966.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                         alt="" 
                         className={classes.img}
                    />
                    <h2 data-scroll data-scroll-speed="1" className={classes.h2}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </h2>
                </section>
                <section data-bgcolor="#e3857a" data-textcolor="#f1dba7" className={classes.section}>
                    <img src="https://images.pexels.com/photos/4791474/pexels-photo-4791474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                         alt="" 
                         className={classes.img}
                />
                    <h2 data-scroll data-scroll-speed="1" className={classes.h2}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </h2>
                </section> */}
            </div>
        </div>
    )
}

export default GsapChengeBackgroundColor

// https://codepen.io/cameronknight/pen/RwRebNY
// Change background colour with GSAP ScrollTrigger
// CodePen Home