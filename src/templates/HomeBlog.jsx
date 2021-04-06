import React,{useRef,useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger' 

import purple from '@material-ui/core/colors/purple';
import blueGrey from '@material-ui/core/colors/blueGrey';
import lightGreen from '@material-ui/core/colors/lightGreen';
import red from '@material-ui/core/colors/red';

const useStyles = makeStyles((theme) => ({
    // topWraper:{
    //     color:'white'
    // },
    header:{
        width:'100%',
        height:'100vh',
        // backgroundColor:red[500],
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        border:'1px solid white'
    },
    stages:{
        width:'100%',
        height:'100vh',
        // backgroundColor:blueGrey[500],
        border:'1px solid white'
    },
    posts:{
        width:'100%',
        height:'100vh',
        // backgroundColor:lightGreen[500],
        border:'1px solid white'
    },
    other:{
        width:'100%',
        height:'100vh',
        // backgroundColor:purple[500],
        border:'1px solid white'
    }
    // ourMission:{
    //     width:'100%',
    //     height:'2000px',
    //     backgroundColor:blueGrey[500],
    //     border:'1px solid red'
    // },
    // gridContainer:{
    //     height: '100%',
    //     display: 'flex',
    //     alignItems: 'center',
    // },
    // titleContainer:{
    //     display: 'flex',
    //     border:'1px solid yellow'

    // },
}))


const HomeBlog = () => {
    const classes = useStyles()
    const content = useRef(null)
    const header = useRef(null)
    const stages = useRef(null)
    const posts = useRef(null)
    const other = useRef(null)
    // const ourMission = useRef(null)
    // const titleContainer = useRef(null)
    useEffect(()=>{

       
        const colorChangeHeader = gsap.fromTo(content.current, 
            { backgroundColor: red[100] },
            { backgroundColor: red[500] })

        ScrollTrigger.create({
            trigger: header.current,
            start: "top-=500px top+=200px",
            end: "bottom+=300 bottom-=300px",
            // start: "buttom buttom",
            // end: "botto+=100 center",
            scrub: true,
            animation: colorChangeHeader,
            markers:true,
        });
        // const colorChangePosts = gsap.fromTo(content.current, 
        //     { backgroundColor: red[500] },
        //     { backgroundColor: blueGrey[500] })

        // ScrollTrigger.create({
        //     scroller: content.current,
        //     trigger: stages.current,
        //     start: "top-=500px top+=200px",
        //     end: "bottom+=300 bottom-=300px",
        //     // start: "buttom buttom",
        //     // end: "center center",
        //     scrub: true,
        //     animation: colorChangePosts,
        //     markers:true,
        // });
        
        // .to(sections.current, { duration: 2, xPercent: -100 * (sections.length - 1), ease: "none" })
        // .to(container.current, { duration: 1, backgroundColor: '#FF0000', ease: "none" }, 0)
        // .to(container.current, { duration: 1, backgroundColor: '#0000FF', ease: "none" }, 1)

        // gsap.fromTo(content.current, 
        //     {   backgroundColor:red[200]}, 
        //     {   duration: 1, 
        //         backgroundColor:red[800], 
        //         ease:"linear", 
        //         // markers:true,
        //         // start:"bottom 50%",
        //         scrollTrigger: {
        //             trigger: content.current,
        //             start:"center 50%", //when top of herman passes 75% viewport height
        //             end:"bottom 0%", //when bottom of herman passes 25% viewport height
        //             toggleActions:`play none none reverse`,
        //             markers:true,
        //         }
        //     }
        // )
        // gsap.fromTo(header.current, 
        //     {   backgroundColor:red[500]}, 
        //     {   duration: 1, 
        //         backgroundColor:red[500], 
        //         ease:"linear", 
        //         // markers:true,
        //         // start:"top 50%",
        //         scrollTrigger: {
        //             trigger: header.current,
        //             // start:"top top", //when top of herman passes 75% viewport height
        //             // end:"bottom 0%", //when bottom of herman passes 25% viewport height
        //             toggleActions:`play none none reverse`,
        //             // markers:true,
        //         }
        //     }
        // )
        // gsap.fromTo(stages.current, 
        //     {   backgroundColor:red[500],}, 
        //     {   duration: 1, 
        //         backgroundColor:blueGrey[500], 
        //         ease:"linear", 
        //         scrollTrigger: {
        //             trigger: stages.current,
        //             start:"top 50%", 
        //             // end:"bottom 0%",
        //             toggleActions:`play none none reverse`,
        //             markers:true,
        //         }
        //     }
        // )
        // gsap.fromTo(posts.current, 
        //     {   backgroundColor:blueGrey[500],}, 
        //     {   duration: 1, 
        //         backgroundColor:lightGreen[500], 
        //         ease:"linear", 
        //         scrollTrigger: {
        //             trigger: posts.current,
        //             start:"top 50%", 
        //             // end:"bottom 0%",
        //             toggleActions:`play none none reverse`,
        //             markers:true,
        //         }
        //     }
        // )
        // gsap.fromTo(other.current, 
        //     {   backgroundColor:lightGreen[500],}, 
        //     {   duration: 1, 
        //         backgroundColor:purple[500], 
        //         ease:"linear", 
        //         scrollTrigger: {
        //             trigger: other.current,
        //             start:"top 50%", 
        //             end:"bottom 0%",
        //             toggleActions:`play none none reverse`,
        //             // markers:true,
        //         }
        //     }
        // )
        // const colorChange = gsap.fromTo(ourMission.current, 
        //     { backgroundColor: "white" },
        //     { backgroundColor: "#232E3E" })

        // ScrollTrigger.create({
        //     trigger: titleContainer.current,
        //     start: "top-=500px top+=200px",
        //     end: "bottom+=300 bottom-=300px",
        //     scrub: true,
        //     animation: colorChange,
        //     markers:true,
        // });

        // const colorToWhite= gsap.fromTo(ourMission.current, 
        //     { backgroundColor: "#232E3E" },
        //     { backgroundColor: "#ffffff" })

        // ScrollTrigger.create({
        //     trigger: titleContainer.current,
        //     start: "bottom top+=200px",
        //     end: "+=500px",
        //     scrub: true,
        //     animation: colorToWhite,
        //     markers:true,
        // });
        // const tl = gsap.timeline({
        //     scrollTrigger: {
        //     trigger: container.current,
        //     pin: true,
        //     scrub: true,
        //     end: () => container.current.offsetWidth
        //   }
        // })
        // tl
        // .to(sections.current, { duration: 2, xPercent: -100 * (sections.length - 1), ease: "none" })
        // .to(container.current, { duration: 1, backgroundColor: '#FF0000', ease: "none" }, 0)
        // .to(container.current, { duration: 1, backgroundColor: '#0000FF', ease: "none" }, 1)

    },[])
    return (
        <div className={classes.topWraper} ref={content}>
            <div ref={header} className={classes.header}>
                header 1
            </div>
            <div ref={stages} className={classes.stages}>
                stages 2
            </div>
            <div ref={posts} className={classes.posts}>
                posts 3
            </div>
            <div ref={other} className={classes.other}>
                other 4
            </div>
        </div>
        // <div className={classes.ourMission} ref={ourMission}>
        //     <div className={classes.gridContainer}>
        //         {/* <div className="grid-x grid-margin-x align-center overflow-hidden title-container"> */}
        //         <div className={classes.titleContainer} ref={titleContainer}>
        //             <div className="cell medium-4 title-container">
        //                 <h2 className="heading h2 light">Our<br />mission</h2>
        //             </div>
        //             <div className="cell medium-6">
        //                 <p className="heading h4 light">On the ground in about 170 countries and territories, UNDP works to eradicate poverty while protecting the planet. We help countries develop strong policies, skills, partnerships and institutions so they can sustain their progress.</p>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default HomeBlog 
