import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../reducks/posts/operators'
import { fetchStages } from '../reducks/stage/operators'
import { getPosts } from '../reducks/posts/selectors'
import { getStages } from '../reducks/stage/selectors'

import { HomeStage, NewPosts, FilterPosts } from '../components/home/index'

const Home = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const posts = getPosts(selector)
    const stages = getStages(selector)
    const [filter,setFilter] = useState({
        type:'post',
        key:''
    })
    const [stageName,setStageName] = useState('')
    const [stageNo,setStageNo] = useState(0)
    const [stageYear,setStageYear] = useState('')

    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchStages()) 
    }, [])
        
    return ( 
        <>
            <HomeStage 
                stages={stages} 
                filter={filter} 
                setFilter={setFilter}
                setStageName={setStageName}
                setStageNo={setStageNo}
                setStageYear={setStageYear}
                />
            <FilterPosts 
                stages={stages} 
                filter={filter} 
                setFilter={setFilter}
            />
            <NewPosts 
                posts={posts}
                filter={filter} 
                setFilter={setFilter}
                stageName={stageName}
                stageNo={stageNo}
                stageYear={stageYear}
                />
                
        </> 
    )
} 

export default Home
