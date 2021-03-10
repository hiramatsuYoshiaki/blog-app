import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {HorizontalCrousel} from '../components/horizontal/index'
import {VerticalCarousel} from '../components/vertical/index'
import { fetchStages } from '../reducks/stage/operators'
import {getStages} from '../reducks/stage/selectors' 

const TopPage = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const stages = getStages(selector)
    console.log(stages);
    useEffect(()=>{
        dispatch(fetchStages())
    },[])
    return (
        <div className="l-container" >
            <div className="l-section" >
                <div>
                    <HorizontalCrousel stages={stages}/>
                    <VerticalCarousel stages={stages}/>
                </div>
            </div>
        </div>
    )
}

export default TopPage  
