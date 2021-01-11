import React, { useEffect } from 'react'
import { getPosts } from '../reducks/posts/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../reducks/posts/operators'
import { Newest, Recent } from '../components/post/index'

const Home = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const posts = getPosts(selector)

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])
    
    return (
        <div>
            {
                posts.length > 0 && (
                    posts.map((post, index) => (
                        <div key={post.id}>
                            {
                                (index === 0) &&
                                <Newest post={post} />
                            }
                            {
                                (index > 0 && index < 10 ) &&
                                    <Recent post={post}/>
                            }
                            
                            {/* <h1>{index +1  }:{post.title}</h1>
                            <p>記事：{post.article}</p>
                            <p>タイプ：{post.type}</p>
                            <p>投稿日：{post.postDate}</p> */}

                        </div>
                    ))
                )
            }
        </div>
    )
}

export default Home
