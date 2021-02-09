import React, { useEffect } from 'react'
import { getPosts } from '../reducks/posts/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../reducks/posts/operators'
import {PostListCard} from '../components/post/index'
import Button from '@material-ui/core/Button';
import {push} from 'connected-react-router'

const PostList = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const posts = getPosts(selector)

    useEffect(() => {
        dispatch(fetchPosts())
    }, [])
  
    return (
        <div className="l-container">
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
                    <div>
                    <Button onClick={()=> dispatch(push('/admin'))}>
                        <p>Back to Admin Menu</p>
                    </Button> 
                </div>
                    
                </div>
               
            </div>
        </div>
    )
}

export default PostList
