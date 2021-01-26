import React, { useState, useEffect } from 'react'
import { db } from '../firebase/index'
import moment from 'moment'
import {TopImageArea,PostArea,LocationArea,Pagination} from '../components/postDetail/index'

import { getPosts } from '../reducks/posts/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../reducks/posts/operators'

const Postdetail = () => {

    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const posts = getPosts(selector)

    let id = window.location.pathname.split('/post/detail')[1]
    if (id !== '') {
        id = id.split('/')[1]
    }
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
   
    // useEffect(() => {
    //     if(!posts){
    //         dispatch(fetchPosts())
    //     }

    //     // }else{
    //         const post = posts.find(post => post.id === id)
    //         if(post){
    //             setTitle(post.title)
    //             setArticle(post.article)
    //             setType(post.type)
    //             setPostDate(post.postDate)
    //             setTopImages(post.topImages)
    //             setPostImages(post.postImages)
    //             //stage
    //             setStage(post.stage.stage)
    //             setStageNo(post.stage.stageNo)
    //             setStageYear(post.stage.stageYear)
    //             setStageImages(post.stage.images)
    //             //tag
    //             setTags(post.tags)
    //             //location
    //             setLocationName(post.location.name)
    //             setLocationAddress(post.location.address)
    //             setLocationLat(post.location.position.lat)
    //             setLocationLng(post.location.position.lng)
    //             setLocationImages(post.location.images)
    //         // }
    //     }
    // }, [])
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

            }).catch(error => {
                throw new Error(error) 
            })
        }
    },[id])  

    
    return (
        <main>
            {/* TopImageArea--------------------------------------------------------- */}
            <TopImageArea title={title} stage={stage} stageNo={stageNo} stageYear={stageYear} images={topImages}/> 
            {/* PostArea--------------------------------------------------------- */}
            <PostArea stage={stage} stageNo={stageNo} stageYear={stageYear} stageImages={stageImages}
                        article={article} type={type} postDate={postDate} postImages={postImages}
                        tags={tags} 
                        locationName={locationName} locationAddress={locationAddress}
                    />
            {/* Pagination--------------------------------------------------------- */}
            <Pagination posts={posts} id={id}/>
            {/* LocationArea--------------------------------------------------------- */}
            <LocationArea locationName={locationName} locationAddress={locationAddress}
                locationLat={locationLat}
                locationLng={locationLng}
                locationImages={locationImages}
                    />
            
            {/* PostListArea--------------------------------------------------------- */}
            {/* <PostListArea  */}
            {/* SNSrea--------------------------------------------------------- */}
            {/* <SNSArea /> */}

            
            {/* <h1>{id}</h1>
            <h1>{title}</h1>
            <h1>{article}</h1>
            <h1>{type}</h1>
            <h1>{postDate}</h1>
            <h1>TopImage</h1>
            {topImages.length > 0 && (
                topImages.map(image => (
                    <div key={image.id}>
                        <img src={image.path} alt={ image.description} className="p-imagePreview__img"/>
                    </div>
                ))
            )}
            <h1>PostImage</h1>
            {postImages.length > 0 && (
                postImages.map(image => (
                    <div key={image.id}>
                        <img src={image.path} alt={image.description} className="p-imagePreview__img" />
                    </div>
                ))
            )} */}



{/*             
            <h1>Stage</h1>
            <p>{stage}</p>
            <p>{stageNo}</p>
            <p>{stageYear}</p>
            {stageImages.length > 0 && (
                stageImages.map(image => (
                    <div key={image.id}>
                        <img src={image.path} alt={image.description} className="p-imagePreview__img" />
                    </div>
                ))
            )}

            <h1>Locations</h1>
            
            <p>{locationName}</p>
            <p>{locationAddress}</p>
            <p>{locationLat}</p>
            <p>{locationLng}</p>
            {locationImages.length > 0 && (
                locationImages.map(image => (
                    <div key={image.id}>
                        <video  muted className="p-imagePreview__img">
                            <source src={image.path} type="video/mp4" />
                        </video>
                    </div>
                ))
            )}
            <h1>Tags</h1>
            
            {tags.length > 0 && (
               tags.map(tag => (
                    <div key={tag.id}>
                        <p>{tag.name}</p>
                    </div>
                ))
            )} */}
        </main>
    )
}

export default Postdetail