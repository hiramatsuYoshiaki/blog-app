import React,{useState, useCallback} from 'react'
import { getIsSignedIn, getUserId, getUsername, } from '../reducks/users/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { TextInput, SelectBox, DateTimePicers, PrimaryButton } from '../components/UiKit/index'
import moment from 'moment'
import { savePost } from '../reducks/posts/operators'
import { ImagesArea, StageArea, LocationArea, TagsArea  } from '../components/post/index'

const PostEdit = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const login = getIsSignedIn(selector)
    const uid = getUserId(selector)
    const username = getUsername(selector)

    const id = ""
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
    const blobTypeJpeg = { type: "image/jpeg" }
    
    return (
        <div>
            <h2>Post Edit/add/delete</h2>
            {/* トップ画像 */}
            <ImagesArea images={topImages} setImages={setTopImages} imageTypes={"メイン画像"}
                blobType={blobTypeJpeg} accept={"image/jpeg"}  media={"image"}/>
            {/* 投稿画像 */}
            <ImagesArea images={postImages} setImages={setPostImages} imageTypes={"記事画像"}
                blobType={blobTypeJpeg} accept={"image/jpeg"}  media={"image"}/>
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
            />
            {/* 投稿日 */}
            <DateTimePicers
               label={"投稿日"}
                value={postDate}
                onChange={handleDateChange} 
            />
            {/* ステージ */}
            {/* <StageArea /> */}
            <StageArea stage={stage} setStage={setStage} />
            <div>
                <h1>stage data</h1>
                <h1>id:{stage.id}</h1>
                <h1>No:{stage.stageNo}</h1>
                <h1>Year:{stage.stageYear}</h1>
                <h1>Image:</h1>
                {
                    (stage.images !== undefined )&&(
                            stage.images.map((image) => {
                                return (
                                    <div key={image.id}>
                                        <h3>id:{image.id}</h3>
                                        <h3>path:{image.path}</h3>
                                        <h3>description:{image.description}</h3>
                                    </div>
                        
                                )
                            })
                    )
                    }
            </div>
            
            
            {/* タグ */}
            <TagsArea tags={tags} setTgas={setTags} />
            {
                tags.map((tag) => {
                    return (
                        <h1>Tag:{tag}</h1>
                    )
                })
            }
            {/* ロケーション */}
            <LocationArea location={location} setLocation={setLocation}/>
            
            <PrimaryButton
                label={"投稿する"}
                onClick={()=> dispatch(savePost(id, title, article, type, postDate, topImages, postImages))}>
            </PrimaryButton>
            

            {
               login === true && (
                       <p>Logedin</p> 
                ) 
           }
            {
               login === false && (
                       <p>Logdout</p> 
                ) 
           }
            <p>ID：{uid}</p>
            <p>ユーザー：{username}</p>
            <br></br>
            <p onClick={()=> dispatch(push('/'))}>Back to Home</p>
        </div>
    )
}

export default PostEdit
