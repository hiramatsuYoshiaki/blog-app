import React,{useRef,useEffect} from 'react'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import LabelIcon from '@material-ui/icons/Label';
import { makeStyles } from '@material-ui/core/styles';
import { gsap} from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger'

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: 8,
        height: 16,
        width: 16
    }
  }));  

const PostArea = props => {
    const classes = useStyles();

    const postRef = useRef()
    const headerRef = useRef()
    const imageRef = useRef()
    const bodyArticleRef = useRef()
    const bodyLocationRef = useRef()
    const bodyTagRef = useRef()
   
    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger);
        // const tl = gsap.timeline({
        //     scrollTrigger: {
        //         trigger:headerRef.current,
        //         start:`top center+=100`,
        //         // end: "center top",
        //         toggleActions:`play none none reverse`,
        //         markers: true,
        //       }
        // });
        // tl.fromTo(postRef.current,{opacity:0, y:0},{ opacity:1, y:0}) 
        // tl.fromTo(headerRef.current,{opacity:0, y:-100},{ opacity:1, y:0}) 
        // tl.fromTo(imageRef.current,{opacity:0, y:-100},{ opacity:1, y:0}) 

        gsap.fromTo(postRef.current,
            {opacity:0, x:-100},
            { opacity:1, 
                x:0,
                scrollTrigger: {
                    id:'postRef',
                    trigger:postRef.current,
                    start:`top center+=100`,
                    // end: "center top",
                    toggleActions:`play none none reverse`,
                    markers: true,
                  }
            }
        ) 
        gsap.fromTo(headerRef.current,
            {opacity:0, x:-100},
            { opacity:1, 
                x:0,
                scrollTrigger: {
                    id:'headerRef',
                    trigger:headerRef.current,
                    start:`top center+=100`,
                    // end: "center top",
                    toggleActions:`play none none reverse`,
                    markers: true,
                  }
            }
        ) 
        gsap.fromTo(imageRef.current,
            {opacity:0, x:0},
            { opacity:1, 
                x:0,
                scrollTrigger: {
                    id:'imageRef',
                    trigger:imageRef.current,
                    start:`top center+=100`,
                    // end: "center top",
                    toggleActions:`play none none reverse`,
                    // markers: true,
                  }
            }
        ) 
        gsap.fromTo(bodyArticleRef.current,
            {opacity:0, x:-100},
            { opacity:1, 
                x:0,
                scrollTrigger: {
                    id:'bodyArticleRef',
                    trigger:bodyArticleRef.current,
                    start:`top center+=100`,
                    // end: "center top",
                    toggleActions:`play none none reverse`,
                    markers: true,
                  }
            }
        ) 
        gsap.fromTo(bodyLocationRef.current,
            { delay:.2,opacity:0, x:-100},
            { delay:.2,
                opacity:1, 
                x:0,
                scrollTrigger: {
                    trigger:bodyLocationRef.current,
                    start:`top center+=100`,
                    // end: "center top",
                    toggleActions:`play none none reverse`,
                    // markers: true,
                  }
            }
        ) 
        gsap.fromTo(bodyTagRef.current,
            {delay:.4,opacity:0, x:-100},
            { delay:.4,
                opacity:1, 
                x:0,
                scrollTrigger: {
                    trigger:bodyTagRef.current,
                    start:`top center+=100`,
                    // end: "center top",
                    toggleActions:`play none none reverse`,
                    // markers: true,
                  }
            }
        ) 
    },[])
    
    return (
        <div className="l-container" ref={ postRef }> 
            <div className="l-section" >
                <div className="c-postarea" >

                    <div className="c-postarea-header" ref={ headerRef }>
                        <h3 className="c-postarea-header-stage" >
                            <span>STAGE</span>
                            <span>{props.stageNo}</span>
                            <span>/</span>
                            <span>{props.stageYear}</span>
                        </h3>
                        <p  className="c-postarea-header-stagetitle" >
                            <span>{props.stage}</span> 
                        </p>
                    </div>
                    <div ref={imageRef}>
                        {props.postImages.length > 0 && (
                            props.postImages.map(image => (
                                <div key={image.id} className="c-postarea-body-image" >
                                    <div className="c-postarae-image">
                                        <img src={image.path} alt={image.description}  />
                                    </div>
                                    <div className="c-postarae-description">
                                        {image.description}  
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="c-postarea-body" >
                        <div className="c-postarea-body-article" ref={ bodyArticleRef }>
                            <div className="c-postarea-body-postDate">
                                <CalendarTodayIcon className={classes.icon} />
                                {props.postDate.split('T')[0] }
                            </div>
                            <div>
                                <LabelIcon className={classes.icon}/>
                                {props.stage}
                            </div>
                            <div className="c-postarea-body-element-wraper">
                                {props.article}
                            </div>
                        </div>
                        <div className="c-postarea-body-location" ref={ bodyLocationRef }>
                            <div>
                                <LocationOnIcon className={classes.icon}/>
                                ロケーション
                            </div>
                            <div className="c-postarea-body-element-wraper">
                                {props.locationName }
                            </div>
                            <div className="c-postarea-body-element-wraper">
                                {props.locationAddress }
                            </div>
                        </div>
                        
                        <div className="c-postarea-body-tags" ref={ bodyTagRef }>
                            <div className="c-postarea-body-tags-title">
                                <LocalOfferIcon  className={classes.icon}/> TAG
                            </div>
                            <div className="c-postarea-body-tags-items">
                                {props.tags.length > 0 && (
                                    props.tags.map(tag => (
                                        <span key={tag.id}>
                                            <div className="c-tag">
                                                {tag.name}
                                            </div>
                                        </span>
                                    ))
                                )} 
                            </div> 
                            
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default PostArea
