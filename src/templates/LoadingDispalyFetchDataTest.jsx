import React,{useState, useEffect, useRef} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

import { getPosts } from '../reducks/posts/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../reducks/posts/operators'
import {PostListCard} from '../components/post/index'

const useStyles = makeStyles((theme) => ({
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

const LoadingDispalyFetchDataTest = () => {
    const classes = useStyles()
    // const [open, setOpen] = useState(true);
    // const handleClose = () => {
    //     setOpen(false);
    //   };
    // const handleToggle = () => {
    //     setOpen(!open);
    //   };
    // useEffect(() => {
    //     setTimeout(() => {
    //         handleClose()
    //     }, 3000);
    //   }, []);
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const posts = getPosts(selector)
    console.log(posts);

    useEffect(() => {
        dispatch(fetchPosts()) 
    }, [])  

    return (
        <>
            <div className="l-container" style={{display: posts.length > 0 ? "block" : "none"}}>
                <div className="l-section ">
                    <div className="c-admin-wrape">
                        <div>
                            <h2>投稿一覧</h2>
                        </div>
                        <div>
                            {
                                posts.length > 0 && (
                                    posts.map((post) => (
                                        <PostListCard key={post.id}
                                            id={post.id} title={post.title} article={post.article}
                                            postDate={post.postDate} type={post.type}
                                            topImages={post.topImages} postImages={post.postImages}
                                        />
                                    ))
                                )
                            }
                        </div>
                    </div>

                </div>
            </div>
            <Backdrop className={classes.backdrop} 
                        open={true} 
                        style={{display: posts.length > 0 ? "none" : "flex"}}
            >
                
                <CircularProgress color="inherit" />
                <p>Now Loading....</p>
                
            </Backdrop>
        </>

    )
}

export default LoadingDispalyFetchDataTest 
