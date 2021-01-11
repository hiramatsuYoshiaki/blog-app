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

    // const [titleImage, setTitleImage] = useState([])
    // const [stages, setStages] = useState([])
    // const [tags, setStage] = useState([])
    // const [location, setLocations] = useState([])

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
    const imageTypes = [
        {id:"main", name:"メイン画像"},
        {id:"post", name:"記事画像"},
        {id:"cover", name:"タイトル画像"},
        {id:"location", name:"グーグルアース"},
    ]

    return (
        <div>
            <h2>Post Edit/add/delete</h2>
            {/* トップ画像 */}
            <ImagesArea images={topImages} setImages={setTopImages} imageTypes={imageTypes[0]} />
            {/* 投稿画像 */}
            <ImagesArea images={postImages} setImages={setPostImages} imageTypes={imageTypes[1]} />
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
            <StageArea />
            {/* ロケーション */}
            <LocationArea />
            {/* タグ */}
            <TagsArea />

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
