import React,{useEffect} from  'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchPosts} from '../reducks/posts/operators'
import {getPosts} from '../reducks/posts/selectors'
import {push} from 'connected-react-router'

const PostListGrid = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const posts = getPosts(selector)
    const postsSort = () =>{
        let sorted = posts.sort(function(a,b){
            if(a.created_at > b.created_at) return -1;
            if(a.created_at < b.created_at) return 1;
            return 0;
        });
        return sorted
    }
    useEffect(()=> {
        dispatch(fetchPosts())  
    },[])  
    return (
       <div className="l-container-fluid c-post-list-grid">
           <div className="l-row">
                {  postsSort().length > 0 &&(
                     postsSort().map(post=> (
                        post.topImages.map(topImage=>(
                            <div key={topImage.id} 
                                className="l-col-4" 
                                onClick={() => dispatch(push('/post/detail/' + post.id))}
                            >
                                <img src={topImage.path} 
                                   alt={post.title} 
                                   className="c-image-fit-cover"/>
                            </div>
                        ))
                    ))
                )}
           </div>
       </div>
    )

}

export default PostListGrid 

