import React,{useState, useCallback, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { TextInput, SelectBox, DateTimePicers, PrimaryButton } from '../components/UiKit/index'
import moment from 'moment'
import { savePost } from '../reducks/posts/operators'
import {StageArea, LocationArea, TagsArea  } from '../components/post/index'
import {TopImagesArea, AddImagesUpload, PostImagesArea } from '../components/post/index'
import { db } from '../firebase/index'

const PostEdit = () => {
    const dispatch = useDispatch()

    let id = window.location.pathname.split('/post/edit')[1]
    if (id !== '') {
        id = id.split('/')[1] 
    }
    
    const [title, setTitle] = useState("")
    const [article, setArticle] = useState("")
    const [type, setType] = useState("")

    const dateNow = moment().format()//2014-08-18T21:11:54+09:47
    const dateSplit = dateNow.split('+')//2014-08-18T21:11:54 この形式でpicerに渡す
    const [postDate, setPostDate] = useState(dateSplit[0]);

    // const [postDate, setPostDate] = useState(new Date('2014-08-18T21:11:54'));
    const [topImages, setTopImages] = useState([])
    const [postImages, setPostImages] = useState([])

    const [stage, setStage] = useState({})

    const [tags, setTags] = useState([])
    
    const [location, setLocation] = useState([])

    const inputTitle = useCallback((e) => {
        setTitle(e.target.value)
    },[setTitle])
    const inputArticle = useCallback((e) => {
        setArticle(e.target.value)
    }, [setArticle])
    const handleDateChange = useCallback((e) => {
        setPostDate(e.target.value)
    }, [setPostDate])

    const types = [
        {id:"post", name:"記事"},
        {id:"cover", name:"表紙"},
    ]
    useEffect(() => {
        if (id !== "") {
            db.collection('posts').doc(id).get()
                .then(snapshot => {
                    const post = snapshot.data()
                    setTitle(post.title)
                    setArticle(post.article)
                    setType(post.type)
                    setPostDate(post.postDate)
                    setTopImages(post.topImages)
                    setPostImages(post.postImages)
                    setStage(post.stage)
                    setTags(post.tags)
                    setLocation(post.location)
            }).catch((error) => {
                throw new Error(error)
            })
        } 
    },[id,setTitle,setArticle,setType,setPostDate,setTopImages,setStage,setTags,setLocation])
    return (
        <div>
            <h2>Post Edit/add/delete</h2>
            {/* トップ画像 */}
            <TopImagesArea images={topImages} setImages={setTopImages} />
            <AddImagesUpload images={topImages} setImages={setTopImages} Multiple={false} title="トップ画像"/>

            {/* <ImagesArea images={topImages} setImages={setTopImages} imageTypes={"メイン画像"}
                blobType={blobTypeJpeg} accept={"image/jpeg"}  media={"image"}/> */}
            {/* 投稿画像 */}
            <PostImagesArea images={postImages} setImages={setPostImages} />
            <AddImagesUpload images={postImages} setImages={setPostImages} Multiple={true} title="投稿画像"/>
            {/* <ImagesArea images={postImages} setImages={setPostImages} imageTypes={"記事画像"}
                blobType={blobTypeJpeg} accept={"image/jpeg"} media={"image"} /> */}
            

            {/* タイトル */}
            <TextInput
                    fullWidth={true} label={"タイトル"} multiline={false} required={true}
                    rows={1} value={title} type={"text"} onChange={inputTitle}
            />
            {/* 投稿記事 */}
            <TextInput
                    fullWidth={true} label={"記事"} multiline={true} required={true}
                    rows={10} value={article} type={"text"} onChange={inputArticle}
            />
            {/* 投稿タイプ */}
            <SelectBox
                label={"タイプ"}
                options={types}
                required={true}
                select={setType}
                value={type}
                defaultValue={type} 
            />

            {/* 投稿日 */}
            <DateTimePicers
               label={"投稿日"}
                value={postDate}
                onChange={handleDateChange}
                defaultValue={postDate}
            />
            {/* ステージ */} 
            {/* <StageArea /> */}
            <StageArea stage={stage} setStage={setStage} />
            
            {/* タグ */}
            <TagsArea tags={tags} setTgas={setTags} /> 
            
            {/* ロケーション */}
            <LocationArea location={location} setLocation={setLocation} />
            
            <PrimaryButton
                label={"投稿する"}
                onClick={()=> dispatch(savePost(id, title, article, type, postDate, topImages, postImages, stage, tags, location))}>
            </PrimaryButton>
            

            <p onClick={()=> dispatch(push('/'))}>Back to Home</p> 
        </div>
    )
}

export default PostEdit
