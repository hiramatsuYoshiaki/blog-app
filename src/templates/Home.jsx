import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../reducks/posts/operators'
import { fetchStages } from '../reducks/stage/operators'
import { getPosts } from '../reducks/posts/selectors'
import { getStages } from '../reducks/stage/selectors'

import { HomeStage, NewPosts, FilterPosts } from '../components/home/index'

const Home = () => {
    const defaultVolume = 4
    //redux
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const posts = getPosts(selector)
    const stages = getStages(selector)
    //state
    const [filter,setFilter] = useState({
        type:'post',
        key:'',
        locationKey:'',
        tagKey:'', 
    })
    const [stageName,setStageName] = useState('')
    const [stageNo,setStageNo] = useState(0)
    const [stageYear,setStageYear] = useState('')
    const [volume,setVolume] = useState(defaultVolume)

    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchStages()) 
    }, [])
         
    return ( 
        <div> 
            <HomeStage 
                stages={stages} 
                filter={filter} 
                setFilter={setFilter}
                defaultVolume={defaultVolume} 
                volume={volume} 
                setVolume={setVolume}
                setStageName={setStageName}
                setStageNo={setStageNo}
                setStageYear={setStageYear} 
                />
            <FilterPosts  
                stages={stages} 
                filter={filter} 
                setFilter={setFilter}
                defaultVolume={defaultVolume} 
                volume={volume} 
                setVolume={setVolume}
            />
            <NewPosts 
                posts={posts}
                filter={filter} 
                setFilter={setFilter}
                defaultVolume={defaultVolume} 
                volume={volume} 
                setVolume={setVolume}
                stageName={stageName}
                stageNo={stageNo}
                stageYear={stageYear}
                />
        </div> 
    )
} 

export default Home
