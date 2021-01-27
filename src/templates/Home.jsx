import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../reducks/posts/operators'
import { fetchStages } from '../reducks/stage/operators'
import { getPosts } from '../reducks/posts/selectors'
import { getStages } from '../reducks/stage/selectors'

import { HomeStage, NewPosts } from '../components/home/index'
import { Newest, Recent } from '../components/post/index'

const Home = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const posts = getPosts(selector)
    const stages = getStages(selector)
    // console.log(stages);
    console.log(posts);

    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchStages())
    }, [])
      
    return ( 
        <div>
            <HomeStage stages={stages}/>
            <NewPosts posts={posts}/>
        </div> 
    )
} 

export default Home
