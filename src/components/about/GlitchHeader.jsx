import React,{useRef,useEffect} from 'react'
import {gsap,Power2} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger' 

const GlitchHeader = props => {
    const headerRef = useRef()
    const subRef = useRef()
    const textTitleRef = useRef()
    const text1Ref = useRef()
    const text2Ref = useRef()
    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(headerRef.current,
            {autoAlpha: 0},
            {duration: 12,autoAlpha: 1, ease: Power2.easeOut})
        gsap.fromTo(subRef.current,
            {autoAlpha: 0},
            {duration: 12,autoAlpha: 1, ease: Power2.easeOut})
        gsap.fromTo(textTitleRef.current,
            {autoAlpha: 0},
            {duration: .2,autoAlpha: 1, ease: Power2.easeOut,
             scrollTrigger: {
                trigger: textTitleRef.current,
                start: "top 30%", // when the top of the trigger hits the top of the viewport
                scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                once:true,
            }})
        gsap.fromTo(text1Ref.current,
            {autoAlpha: 0},
            {duration: .2,autoAlpha: 1, ease: Power2.easeOut,
             scrollTrigger: {
                trigger: text1Ref.current,
                start: "top 40%", // when the top of the trigger hits the top of the viewport
                scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                once:true,
            }})
        gsap.fromTo(text2Ref.current, 
            {autoAlpha: 0},
            {duration: .2,autoAlpha: 1, ease: Power2.easeOut,
             scrollTrigger: {
                trigger: text2Ref.current,
                start: "top 50%", // when the top of the trigger hits the top of the viewport
                scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                once:true,
            }})
    },[])
    return (
        <div className="c-about-header" >
            <div className="c-about-header-wraper">
                <div className="c-about-header-sub" 
                        ref={subRef}
                >
                    h-works 
                </div>
                <h1 className="c-glitch c-about-glich" 
                    data-text="TOURdeHDR" 
                    ref={headerRef}
                    >TOURdeHDR
                </h1>
                
                <div className="c-about-header-text-wraper" 
                        
                >
                    <div className="c-about-text" >
                        <p ref={textTitleRef}>HDR Photo Blog </p>
                        <p ref={text1Ref}>フォトブログ「TOURdeHDR」を２００９年に始める、
                            特徴は、投稿写真の殆どが、
                            露出の違う３枚の写真を合成したＨＤＲ写真あることで、
                            人間の目で見た感じにより近い写真になっている。
                            
                        </p>
                        <p ref={text2Ref}>
                            たまに、ＨＤＲ写真と３Ｄモデルを合成した作品や、
                            アニメーションなども投稿している。 
                            初期は、サイクリング好きのため、
                            自転車をモチーフにした写真が多数投稿されている。
                            現在は、旅の風景をメインに投稿している。
                        </p>
                    </div>
                    
                </div>
            </div>
        </div> 
    )
}
export default GlitchHeader  
