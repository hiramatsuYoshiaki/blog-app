import React,{useEffect} from  'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchPosts} from '../reducks/posts/operators'
import {getPosts} from '../reducks/posts/selectors'
import {push} from 'connected-react-router'

const PostListGrid = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const posts = getPosts(selector)
    console.log(posts);
  
    useEffect(()=> {
        dispatch(fetchPosts()) 
    },[])  

    return (
       <div className="l-container">
           <div className="l-row">
                { posts.length > 0 &&(
                    posts.map(post=> (
                        post.topImages.map(topImage=>(
                            <div key={topImage.id} 
                                className="l-col-4" 
                                onClick={() => dispatch(push('/post/detail/' + post.id))}>
                                <img src={topImage.path} 
                                    alt={post.title} 
                                    className="image-fit-cover"/>
                            </div>
                        ))
                    ))
                )}
           </div>

       </div>
    )

}

export default PostListGrid 

