import React,{useRef,useEffect} from 'react'
import {gsap} from 'gsap'
import MouseIcon from '@material-ui/icons/Mouse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
 
const TopImageArea = props => {
    const headerRef = useRef() 
    const imageRef = useRef() 
    const iconRef = useRef() 
    useEffect(()=>{
        const tl = gsap.timeline();
        tl.fromTo(headerRef.current,{opacity:0, y:-100},{ opacity:1, y:0}, .5) 
        tl.fromTo(imageRef.current,{opacity:0, y:-100},{ opacity:1, y:0}, 1) 
        // tl.fromTo(iconRef.current,{opacity:1, y:-300},{ opacity:1, y:0}, 1.5) 
        tl.fromTo(iconRef.current,{opacity:0, y:-50,repeat: -1,repeatDelay:5},{ opacity:1, y:0,repeat: -1 ,repeatDelay:5,duration:3}, 4) 
    },[])
    return (
        <div className="l-container-fluid c-imagearea" >
            <div className="l-section">

                <div className="c-topimgarea-header " ref={headerRef}>
                    <h1 className="topimagearea-header__title" >
                        {props.title}
                    </h1>
                    <h2 className="topimagearea-header__subtitle" >
                        <span className="u-margin-right-8">STAGE{props.stageNo}</span>
                        <span className="u-margin-right-8">{props.stageYear}</span>
                        <span className="u-margin-right-8">{props.stage}</span>
                    </h2>
                </div>
                <div className="c-topimagearea-scroll" ref={iconRef}>
                    <h5>SCROLL</h5>
                     <MouseIcon />
                     <ExpandMoreIcon />
                </div>
                <div ref={imageRef} className="c-imagearea-wraper"  >
                    {props.images.length > 0 && (
                        props.images.map(image => (
                            <img src={image.path} alt={image.description} key={image.id}/>
                        ))
                    )}
                </div>
                

            </div>  
        </div>
    )
}

export default TopImageArea 
