import React,{useEffect,useState,useCallback} from 'react';
import {NewPostsArea} from './index'

const NewPosts = (props) => {
    const [displayPosts,setDispalyPosts] = useState([])
    const [postsLength,setPostLength] = useState(1)
    
    // const [volume,setVolume] = useState(1)
    // const dispalyVolume = useCallback(()=>{
    //     setVolume(volume + 1)
    //     console.log('dispalyVolume' + volume);
    // },[setVolume,volume])

    

    // const maxPostsLength = useState((maxLength)=>{
    //     setPostLength(maxLength)
    //     console.log('maxPostsLength' + maxLength);
    // },[setPostLength])
    // const [title,setTitle] = useState('')
    // const titleName = useCallback((name)=>{
    //     setTitle(name)
    // },[setTitle])
    // const filterPosts = useCallback(()=>{
    //     console.log('filterPosts type:' + props.filter.type);
    //     console.log('filterPosts volume:' + props.volume);
    //     console.log(props.posts);

    //     const posts = props.posts
    //     let filteredPosts = []
    //     if(props.filter.type === "stage" ){
    //         filteredPosts =  posts.filter(post => post.stage.id === props.filter.key)
    //     }
    //     if(props.filter.type === "tag" ){
    //         filteredPosts = posts.filter(post => {
    //             const found = post.tags.find(tag=> tag.id === props.filter.tagKey)
    //             if (found) {
    //                 return true
    //             } else {
    //                 return false
    //             }
    //         }) 
    //     }
    //     if(props.filter.type === "post"){
    //         filteredPosts = posts
    //     }
    //     return filteredPosts
    // },[props.posts,props.filter.type,props.filter.key,props.filter.tagKey])


    useEffect(()=>{
        console.log('useEffect type:' + props.filter.type);
        console.log('useEffect volume:' + props.volume);
        console.log(props.posts);
        let posts = []
        // let propsLength = 0
        //post--------------------------------------------------------
        if(props.filter.type === "post"){
            posts = props.posts
            // propsLength = posts.length
            // posts = props.posts.filter((post,index) => index < props.volume)
        }
        if(props.filter.type === "tag" ){
            // let tagPosts = []
            posts = props.posts.filter(post => {
                const found = post.tags.find(tag=> tag.id === props.filter.tagKey)
                if (found) {
                    return true
                } else {
                    return false
                }
            }) 
            // propsLength = posts.length
            // console.log('useEffect newprops ' + props.volume);
            // posts = tagPosts.filter((post,index) => index < props.volume)
        }
        if(props.filter.type === "stage" ){
            // let stagePosts = []
            posts =  props.posts.filter(post => post.stage.id === props.filter.key)
            // propsLength = stagePosts.length
            // posts = stagePosts.filter((post,index) => index < props.volume)
        }
        console.log(posts);

        setDispalyPosts(posts)
        setPostLength(posts.length)
        
    },[props.posts,props.volume,props.filter.type,props.filter.tagKey,props.filter.key])

    return (
        <div className='l-container-fluid'>
            <div className='l-section'>
                <div className="c-new-post-header">
                    {(props.filter.type === 'post' && props.filter.key === '') &&(
                        <p>最新投稿</p>
                    ) }
                    {(props.filter.type === 'tag' && props.filter.key !== '') &&(
                        <p>
                        {/* <span>Stage{props.stageNo}</span>
                        <span>{props.stageName}</span> */}
                        <span>タグコレクション</span>
                        {/* <span>{props.stageYear}</span> */}
                    </p>
                    ) }
                    {(props.filter.type === 'stage' && props.filter.key !== '') &&(
                        <p>
                            <span>Stage{props.stageNo}</span>
                            <span>{props.stageName}</span>
                            <span>の投稿</span>
                            {/* <span>{props.stageYear}</span> */}
                        </p>
                    ) }
                    {/* <p>{props.filter.type }</p>
                    <p>{props.filter.key}</p> */}
                </div>
                <div  className="c-new-post-wrape">
                    {displayPosts.length > 0 && (
                       displayPosts.map((post,index) =>(
                            index < props.volume &&(
                            <NewPostsArea 
                                post={post}
                                key={post.id} 
                                id={post.id}
                                filter={props.filter} 
                                setFilter={props.setFilter}
                                volume={props.volume} 
                                setVolume={props.setVolume}
                                />
                       )))
                    )}
                </div>
                <div className='c-new-post-footer'>
                    <div>volume:{props.volume}</div>
                    <div>lemgth:{postsLength}</div>
                    {/* <div onClick={() => props.setVolume(props.volume + 1)}>もっと見る</div>
                    <div onClick={() => props.setVolume(1)}>リセット</div> */}
                    {props.volume < postsLength && (
                        <div onClick={props.setVolume(props.volume + 1)}>もっと見る</div>
                    )}
                </div>
            </div>
        </div>
    )
} 

export default NewPosts
