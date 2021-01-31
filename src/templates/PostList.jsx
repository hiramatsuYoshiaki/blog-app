import React, { useEffect } from 'react'
import { getPosts } from '../reducks/posts/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../reducks/posts/operators'
import {PostListCard} from '../components/post/index'

const PostList = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const posts = getPosts(selector)

    useEffect(() => {
        dispatch(fetchPosts())
    }, [])
  
    return (
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
    )
}

export default PostList
