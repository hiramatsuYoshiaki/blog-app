import React,{useEffect,useState,} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {fetchStages} from '../reducks/stage/operators'
import {fetchPosts} from '../reducks/posts/operators'
import {getStages} from '../reducks/stage/selectors'
import {getPosts} from '../reducks/posts/selectors'
import { makeStyles } from '@material-ui/core/styles';
import {LandingComponent} from '../components/landing/index'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({ 
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

const Landing = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const stagesAll = getStages(selector)
    const postsAll = getPosts(selector)

    const [stages,setStages] = useState([])
    const [posts,setPosts] = useState([])
    const [covers,setCovers] = useState([])
    const [postsCover,setPostsCover] = useState([])

    const displayYear = 2 //今年と昨年表示
    const displaySlider = 7 //トップページのスライド画像数
    
    const displayPostsNumber = 4 //4投稿表示
    const displayPostsCoverNumber = 6 //4投稿表示
    
    // fetch stage filter 今年
    useEffect(()=>{
        const now = new Date();
        const selectYear = now.getFullYear()
        let stagesSort = []
        stagesSort = stagesAll
        stagesSort = stagesAll.filter(stage => stage.stageYear > selectYear - displayYear)//strageYear:number
        stagesSort.sort(function(a,b){
            if(a.sort < b.sort) return -1;
            if(a.sort > b.sort) return 1;
            return 0;
        });
        setStages(stagesSort)
    },[stagesAll])
    //fetch posts
    useEffect(()=>{ 
        
        let postsSort = []
       
        //投稿記事を選択------
        postsSort = postsAll.filter(posts => posts.type === 'post')
        // ソート降順
        postsSort.sort(function(a,b){
            if(a.postDate > b.postDate) return -1;
            if(a.postDate < b.postDate) return 1;
            return 0;
        });
        setPosts(postsSort.slice(0, displayPostsNumber))

        

        //カバーページを選択------
        let coversSort = []
        coversSort = postsAll.filter(posts => posts.type === 'cover')
        // ソート降順
        coversSort.sort(function(a,b){
            if(a.postDate > b.postDate) return -1;
            if(a.postDate < b.postDate) return 1;
            return 0;
        });
        setCovers(coversSort.slice(0, displaySlider))

        //投稿記事とカバーページを選択------
        let postsCoverSort = []
        postsCoverSort = postsAll
        // ソート降順
        postsCoverSort.sort(function(a,b){
            if(a.postDate > b.postDate) return -1;
            if(a.postDate < b.postDate) return 1;
            return 0;
        });
        setPostsCover(postsCoverSort.slice(0, displayPostsCoverNumber))

    },[postsAll])
    //ステージデータを取得
    useEffect(()=>{
        dispatch(fetchStages())
        dispatch(fetchPosts()) 
    },[dispatch])

    return (
        <>
            <LandingComponent stages={stages} posts={posts} postsCover={postsCover} covers={covers}/>
            <Backdrop 
                className={classes.backdrop} 
                open={true} 
                style={{
                    display: (stagesAll.length > 0 && postsAll.length > 0) 
                    ? "none" 
                    : "flex"
                }}
            >
                <CircularProgress color="inherit" />
                <p>Now Loading....</p>
            </Backdrop>
        </>
        
    )
}

export default Landing
