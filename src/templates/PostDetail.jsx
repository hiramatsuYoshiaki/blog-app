import React, { useState, useEffect } from 'react'
import { db } from '../firebase/index'
import moment from 'moment'
import {TopImageArea,PostArea} from '../components/postDetail/index'

const Postdetail = () => {
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
   

    useEffect(() => {
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
                setLocationLat(post.location.lat)
                setLocationLng(post.location.lng)
                setLocationImages(post.location.images)

            }).catch(error => {
                throw new Error(error) 
            })
        }
    // },[id,setTitle,setArticle,setType,setPostDate,setTopImages,setStage,setTags,setLocation])
    },[])   
    return (
        <main>
            {/* TopImageArea--------------------------------------------------------- */}
            <TopImageArea title={title} stage={stage} stageNo={stageNo} stageYear={stageYear} images={topImages}/> 
            {/* PostArea--------------------------------------------------------- */}
            <PostArea stage={stage} stageNo={stageNo} stageYear={stageYear} stageImages={stageImages}
                        article={article} type={type} postDate={postDate} postImages={postImages}
                        tags={tags} 
                    />
            {/* LocationArea--------------------------------------------------------- */}
            {/* <div className="l-container">
                <section className="l-section">
                    <LocationArea 
                    />
                </section>
            </div> */}
            {/* ResentArea--------------------------------------------------------- */}
            {/* <div className="l-container">
                <section className="l-section">
                    <RecentArea 
                    />
                </section>
            </div> */}
            {/* SNSrea--------------------------------------------------------- */}
            {/* <div className="l-container">
                <section className="l-section">
                    <SNSArea 
                    />
                </section>
            </div> */}
            {/* PostListArea--------------------------------------------------------- */}
            {/* <div className="l-container">
                <section className="l-section">
                    <PostListArea 
                    />
                </section>
            </div> */}

            
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
