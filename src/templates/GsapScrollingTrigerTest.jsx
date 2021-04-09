import React,{useRef,useEffect,useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger' 

const useStyles = makeStyles((theme) => ({
    content:{
        transition:'1s ease-out',
        // overflowX:'hidden',
        color:'white',
        backgroundColor:'red',
        // border:'1px solid green',
        maxWidth: '100%',
        width: '100%',
    },
    container:{
        // border:'5px solid yellow',
        // width:'100%',
        // height:'100%',
    },
    section:{
        // minHeight:'100vh',
        // width:'100%',
        // minWidth:'100vw',
        // position:'relative',
        // paddign:'100px 10vw',
        // display: 'grid',
        // gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        // gridGap: '2rem',
        // padding: '50px 10vw',
        // margin: 'auto',
        // placeItems: 'center',
        // border:'1px solid white',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        left: 0,
        border:'3px solid red',
        margin:0,
        padding:0,
    },
    pinWrap: {
        // width:'3000px',
        height: '100vh',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '50px 10vw',
    
        '& > *': {
            minWidth: '60vw',
            padding: '0 5vw',
            border:'1px solid blue'
        },
        border:'5px solid red'
    },
    // img:{
    //     height: '80vh',
    //     width: 'auto',
    //     objectFit: 'cover',
    // },

}))
const sectionElements = [
    {   id:1,
        img:"https://images.pexels.com/photos/3062948/pexels-photo-3062948.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        dataBgcolor:"#bcb8ad",
        dataTextcolor:"#032f35"},
    {   id:2,
        img:"https://images.pexels.com/photos/4467879/pexels-photo-4467879.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        dataBgcolor:"#eacbd1",
        dataTextcolor:"#536fae"},
    {   id:3,
        img:"https://images.pexels.com/photos/5604966/pexels-photo-5604966.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        dataBgcolor:"#536fae",
        dataTextcolor:"#eacbd1"},
    {   id:4,
        img:"https://images.pexels.com/photos/4791474/pexels-photo-4791474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        dataBgcolor:"#e3857a",
        dataTextcolor:"#f1dba7"},
]

const GsapScrollingTrigerTest = () => {
    const classes = useStyles()

    // const [maxWidth, setMaxWidth] = useState(0)

    const contentRef = useRef(null)
    const containerRef = useRef(null)
    //section
    const sectionRefs = useRef([])
    sectionRefs.current = []
    //Horizontal Scroll
    const HorizontalSectionRefs = useRef([])
    HorizontalSectionRefs.current = []

    const addToRefs = el => {
        // console.log('addToRefs');
        if(el && !sectionRefs.current.includes(el)){
            sectionRefs.current.push(el)
            // console.log('addToRefs el',el);
            // console.log(el.dataset.bgcolor);
            // console.log('sectionRefs.current',sectionRefs.current);
        }
        if(el && !HorizontalSectionRefs.current.includes(el) && el.querySelector(".pinWrap")){
            HorizontalSectionRefs.current.push(el)
            // console.log('HorizontalSectionRefs el ',el);
            console.log('HorizontalSectionRefs.current',HorizontalSectionRefs.current);
        }
    }

    // const getMaxWidth = () => {
    //     HorizontalSectionRefs.current.forEach(HorizontalSectionRef=>{

    //     })
    // }
    
     
    



    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger);
        //Change Color
        sectionRefs.current.forEach((el,i)=>{
            const prevBg = i === 0 ? "" : sectionRefs.current[i - 1].dataset.bgcolor;
            const prevText = i === 0 ? "" :sectionRefs.current[i - 1].dataset.textcolor;
            ScrollTrigger.create({
                trigger:el,
                start:"top 50%",
                onEnter:()=>
                    gsap.to(contentRef.current,{
                        backgroundColor:el.dataset.bgcolor,
                        color:el.dataset.textcolor,
                        overwrite:"auto",
                        marker:"true"
                    }),
                onLeaveBack:()=>
                    gsap.to(contentRef.current,{
                        backgroundColor:prevBg,
                        color:prevText,
                        overwrite:"auto",
                        marker:"true"
                    })
            })


        })
        //Horizontal Scroll
        HorizontalSectionRefs.current.forEach((horizontalSection, i )=>{
            console.log(horizontalSection);
            let pinWrap = horizontalSection.querySelector(".pinWrap")
            console.log('pinWrap',pinWrap);
            // let pinWrapWidth = horizontalSection.offsetWidth
            // console.log(horizontalSection.offsetWidth);
            let pinWrapWidth = pinWrap.offsetWidth
            // let pinWrapWidth = 5000
            let horizontalScrollLength = pinWrapWidth - window.innerWidth
            console.log('pinWrapWidth',pinWrapWidth);
            console.log('pinWrap.offsetWidth',pinWrap.offsetWidth);
            console.log('pinWrap.clientWidth', 
            horizontalSection.querySelector(".pinWrap").clientWidth);
            console.log('window.innerWidth',window.innerWidth);
            console.log('horizontalScrollLength',horizontalScrollLength);
            gsap.to(pinWrap,{
                x: -horizontalScrollLength,
                ease: "none", 
                scrollTrigger:{
                    id:`section-${i+1}`,
                    scrub:true,
                    trigger:horizontalSection,
                    pin:true,
                    start:"top top",
                    end:()=> `+=${pinWrapWidth}`,
                    invalidateOnRefresh: true,
                    // markers: true,
                },
            })
        })

    },[{...sectionRefs},{...HorizontalSectionRefs}])
   
    return (
        <div className={classes.content} ref={contentRef}>
            <div className={classes.container} ref={containerRef}>
                {sectionElements.map((element,i) =>(
                    <section className={classes.section} 
                        data-bgcolor={element.dataBgcolor} 
                        data-textcolor={element.dataTextcolor} 
                        key={element.id}
                        ref={addToRefs}
                    >
                        <h1  className={classes.h1}>
                            SECTION{i+1} 
                        </h1>
                        <img src={element.img} 
                            alt="" 
                            className={classes.img}/>
                        <div className={classes.pinWrap + " pinWrap"} >
                            <h2>This whole horizontal section should be brown</h2>
                            <img src="https://images.pexels.com/photos/5207262/pexels-photo-5207262.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900" alt="" />
                            <img src="https://images.pexels.com/photos/3371358/pexels-photo-3371358.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900" alt="" />
                            <img src="https://images.pexels.com/photos/3618545/pexels-photo-3618545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=900" alt="" />
                        </div>
                    </section>
                ))}
            </div>
        </div>
        
    )
    
}

export default GsapScrollingTrigerTest
