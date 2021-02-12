import React,{useEffect} from 'react'

const Enbed = props => {
    const styleBlokquote = { background:"#FFF", 
                                border:0, 
                                borderRadius:"3px", 
                                boxShadow:"0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)", 
                                margin: "1px", 
                                maxWidth:"540px", 
                                minWidth:"326px", 
                                padding:0, 
                                width:"99.375%", 
                                width:"-webkit-calc(100% - 2px)", 
                                width:"calc(100% - 2px)" }
    const styleLink = { background:"#FFFFFF", 
                        lineHeight:0, 
                        padding:"0 0", 
                        textAlign:"center", 
                        textDecoration:"none", 
                        width:"100%"}
    useEffect(()=>{
        if (window.instgrm) window.instgrm.Embeds.process()
    },[])
    return (
        <>
             <blockquote 
              class="instagram-media" 
              data-instgrm-captioned 
              data-instgrm-version="12"
              style={styleBlokquote}
              >
                <a href={props.path} 
                    style={styleLink} target={"_blank"}
                >
                </a>
            </blockquote>
            {/* index.htmlで読み込む */}
            {/* <script async defer src="http://platform.instagram.com/en_US/embeds.js"></script> */}
        </>
    )
}

export default Enbed
