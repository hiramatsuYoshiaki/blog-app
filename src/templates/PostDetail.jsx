import React, { useState, useEffect, useRef } from 'react'
import { db } from '../firebase/index'
import moment from 'moment'
import {TopImageArea,PostArea,LocationArea,Pagination,SNSArea} from '../components/postDetail/index'

import { getPosts } from '../reducks/posts/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../reducks/posts/operators'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress' 
import {makeStyles} from '@material-ui/core/styles'

import { gsap,Power2} from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger' 
gsap.registerPlugin(ScrollTrigger)


const useStyles = makeStyles((theme) => ({  
    
    TopImageArea:{
        height:'100vh',
        margin:'0 0 20px 0',
        border:'1px solid white', 
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
    },
    section:{
        height:'100vh',
        margin:'0 0 20px 0',
        border:'1px solid white',
    },
    //loading screen 
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        backgroundColor:'black',
        '& p':{ 
            margin:'16px'
        },
        display:'flex',
        justifyContent:'center', 
        alignItems:'center',
        flexDirection:'column',
        
      },
    
})) 

const Postdetail = () => { 
    const classes = useStyles()

    const dispatch = useDispatch()
    const selector = useSelector((state) => state) 
    const posts = getPosts(selector)

    const postRef = useRef()
    const locationRef = useRef()
    const snsRef = useRef()

    let id = window.location.pathname.split('/post/detail')[1]
    if (id !== '') {
        id = id.split('/')[1]
    }
    const [postData,setPostData] = useState(null)
    const [title, setTitle] = useState("")
    const [article, setArticle] = useState("")
    const [type, setType] = useState("")

    const dateNow = moment().format()//2014-08-18T21:11:54+09:47
    const dateSplit = dateNow.split('+')//2014-08-18T21:11:54 この形式でpicerに渡す
    const [postDate, setPostDate] = useState(dateSplit[0]);

    const [topImages, setTopImages] = useState([])
    const [postImages, setPostImages] = useState([])
    //stage
    const [stage, setStage] = useState("")
    const [stageNo,setStageNo]= useState("")
    const [stageYear,setStageYear]= useState(0)
    const [stageImages,setStageImages] = useState([])
    //tag
    const [tags, setTags] = useState([])
    //location
    const [locationName, setLocationName] = useState([])
    const [locationAddress, setLocationAddress] = useState([])
    const [locationLat, setLocationLat] = useState([])
    const [locationLng, setLocationLng] = useState([])
    const [locationImages, setLocationImages] = useState([])
    useEffect(()=>{
        gsap.fromTo(postRef.current,
            { autoAlpha:0 },
            { duration:.4,
                autoAlpha:1,
                ease:Power2.easeOut,
                scrollTrigger:{
                    // scrub: 2,
                    trigger:postRef.current,
                    start:`top center+=100`,
                    toggleActions:`play none none reverse`,
                    invalidateOnRefresh: true,
                    // markers:true,
                }
            }
        )
        gsap.fromTo(locationRef.current,
            { autoAlpha:0 },
            { duration:.4,
                autoAlpha:1,
                ease:Power2.easeOut,
                scrollTrigger:{
                    // scrub: 2,
                    trigger:locationRef.current,
                    start:`top center+=100`,
                    toggleActions:`play none none reverse`,
                    invalidateOnRefresh: true,
                    // markers:true,
                }
            }
        )
        gsap.fromTo(snsRef.current,
            { autoAlpha:0 },
            { duration:.4,
                autoAlpha:1,
                ease:Power2.easeOut,
                scrollTrigger:{
                    // scrub: 2,
                    trigger:snsRef.current,
                    start:`top center+=100`,
                    toggleActions:`play none none reverse`,
                    invalidateOnRefresh: true,
                    // markers:true,
                }
            }
        )
    },[postRef.current,locationRef.current])

    useEffect(() => {
        if(!posts || posts.length === 0){
            dispatch(fetchPosts())
        }
        if (id !== '') {
            db.collection('posts').doc(id).get().then(snapshot => {
                const post = snapshot.data()
                setTitle(post.title)
                setArticle(post.article)
                setType(post.type)
                setPostDate(post.postDate)
                setTopImages(post.topImages)
                setPostImages(post.postImages)
                //stage
                setStage(post.stage.stage)
                setStageNo(post.stage.stageNo)
                setStageYear(post.stage.stageYear)
                setStageImages(post.stage.images)
                //tag
                setTags(post.tags)
                //location
                setLocationName(post.location.name)
                setLocationAddress(post.location.address)
                setLocationLat(post.location.position.lat)
                setLocationLng(post.location.position.lng) 
                setLocationImages(post.location.images)

                setPostData(post)
                
            }).catch(error => {
                throw new Error(error) 
            })
        }
    },[id])  

    return (     
        <main > 
            {/* TopImageArea------------------------------------------ */}
            <section className={classes.TopImageArea}>
                <TopImageArea 
                    title={title} 
                    stage={stage} 
                    stageNo={stageNo} 
                    stageYear={stageYear} 
                    images={topImages}/> 
            </section>
            {/* PostArea---------------------------------------------- */}
            <section ref={postRef} className={classes.section}>   
                <PostArea 
                    stage={stage} 
                    stageNo={stageNo} 
                    stageYear={stageYear} 
                    stageImages={stageImages}
                    article={article} 
                    type={type} 
                    postDate={postDate} 
                    postImages={postImages}
                    tags={tags} 
                    locationName={locationName} 
                    locationAddress={locationAddress}
                    />
            </section> 
            {/* Pagination----------------------------------------- */}
{/* setLabel error map xxxxxxx*/}
                {/* <Pagination posts={posts} id={id}/> */}
            {/* LocationArea----------------------------------------- */}
            <section ref={locationRef} className={classes.section} >  
                <LocationArea 
                    locationName={locationName} 
                    locationAddress={locationAddress}
                    locationLat={locationLat}
                    locationLng={locationLng}
                    locationImages={locationImages}  
                        />
            </section> 
            {/* SNSrea------------------------------------------------ */}
            <section ref={snsRef} className={classes.section}>  
                <SNSArea 
                    images={topImages} 
                    postImages={postImages}/>  
            </section>
            <Backdrop 
                className={classes.backdrop} 
                open={true} 
                style={{
                    display: (postData !== null ) 
                    ? "none" 
                    : "flex"
                }}
            >
                <CircularProgress color="inherit" />
                <p>Now Loading....</p>
            </Backdrop>
        </main>
    )
}

export default Postdetail 
