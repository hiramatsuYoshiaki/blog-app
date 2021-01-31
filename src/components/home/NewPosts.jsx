import React,{useState,useCallback} from 'react';
import {NewPostsArea} from './index'

const NewPosts = (props) => {
    // const posts = props.posts
    // const type = props.filter.type
    // const key = props.filter.key
    const [title,setTitle] = useState('aaa')
    const titleName = useCallback((name)=>{
        setTitle(name)
    },[setTitle])
    const filterName = () => {
        if(props.filter.type === "stage" ){
            setTitle('stage')
        }else{
            setTitle('post')
        }
    }
    const filterPosts = () =>{
        const posts = props.posts
        if(props.filter.type === "stage" ){
            // titleName('このステージの投稿')
            return  posts.filter(post => post.stage.id === props.filter.key)
        }
        return posts
    }
    
    return (
        <div className='l-container-fluid'>
            <div className='l-section'>
                <div className="c-new-post-header">
                    {(props.filter.type === 'post' && props.filter.key === '') &&(
                        <p>最新の投稿</p>
                    ) }
                    {(props.filter.type === 'stage' && props.filter.key !== '') &&(
                        <p>{props.stageName}-Stage{props.stageNo}-{props.stageYear}</p>
                    ) }
                    <p>{props.filter.type }</p>
                    <p>{props.filter.key}</p>
                </div>
                <div  className="c-new-post-wrape">
                    {filterPosts().length > 0 && (
                        filterPosts().map(post =>(
                            <NewPostsArea 
                                post={post} 
                                key={post.id} 
                                id={post.id}/>
                            ))
                    )}
                </div>
            </div>
        </div>
    )
} 

export default NewPosts
