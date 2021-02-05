import React,{useEffect,useState} from 'react';
import {NewPostsArea} from './index'
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles'
const useStyles = makeStyles(()=>({
    more:{
        width:150,
        margin: '0 0 0 auto',
        fontWeight:700,
        fontSize:'1.5rem',
        display:'block'

    }
}))



const NewPosts = (props) => {
    const classes = useStyles()
    const [displayPosts,setDispalyPosts] = useState([])
    const [postsLength,setPostLength] = useState(1)

    const upVolume = () => {
        props.setVolume(props.volume + 4)
    }
    useEffect(()=>{
        // 投稿をフィルタリングする
        let posts = []
        //post--------------------------------------------------------
        if(props.filter.type === "post"){
            posts = props.posts
            // 降順
            posts.sort(function(a,b){
                if(a.created_at > b.created_at) return -1;
                if(a.created_at < b.created_at) return 1;
                return 0;
            });
        }
        //stage--------------------------------------------------------
        if(props.filter.type === "stage" ){
            posts =  props.posts.filter(post => post.stage.id === props.filter.key)
            //昇順
            posts.sort(function(a,b){
                if(a.created_at < b.created_at) return -1;
                if(a.created_at > b.created_at) return 1;
                return 0;
            });
        }
        //tag--------------------------------------------------------
        if(props.filter.type === "tag" ){
            posts = props.posts.filter(post => {
                const found = post.tags.find(tag=> tag.id === props.filter.tagKey)
                if (found) {
                    return true
                } else {
                    return false
                }
            }) 
            // 降順
            posts.sort(function(a,b){
                if(a.created_at > b.created_at) return -1;
                if(a.created_at < b.created_at) return 1;
                return 0;
            });
        }
        setDispalyPosts(posts)
        setPostLength(posts.length)
    },[props.posts,props.filter.type,props.filter.tagKey,props.filter.key])

    return (
        <div className='l-container-fluid c-new-post-wrape' >
            <div className='l-section'>
                <div className="c-new-post-header">
                    {(props.filter.type === 'post' && props.filter.key === '') &&(
                        <p>最新投稿</p>
                    ) }
                    {(props.filter.type === 'tag' && props.filter.key !== '') &&(
                        <p>
                        <span>タグコレクション</span>
                    </p>
                    ) }
                    {(props.filter.type === 'stage' && props.filter.key !== '') &&(
                        <p>
                            <p>最新ステージ</p>
                        </p>
                    ) }
                </div>
                <div  className="c-new-post-main">
                    {displayPosts.length > 0 && (
                       displayPosts.map((post,index) =>(
                            index < props.volume &&(
                            <NewPostsArea 
                                post={post}
                                key={post.id} 
                                id={post.id}
                                filter={props.filter} 
                                setFilter={props.setFilter}
                                defaultVolume={props.defaultVolume} 
                                volume={props.volume} 
                                setVolume={props.setVolume}
                                />
                       )))
                    )}
                </div>
                <div className='c-new-post-footer'>
                    {props.volume < postsLength && (
                        <Button color="default" size="large"  className={classes.more}
                            onClick={() => upVolume()}>
                            もっと見る
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
} 

export default NewPosts
