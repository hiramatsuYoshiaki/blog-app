import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStages } from '../reducks/stage/operators'
import { getStages } from '../reducks/stage/selectors'
import { StageCard } from '../components/stage/index'

const StageList = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state => state))
    const stages = getStages(selector)

    useEffect(() => {
        dispatch(fetchStages())
    },[dispatch])
    return (
        <div>
            <h1>Stage List</h1>
            {
                stages.length > 0 && (
                    stages.map((stage) => (
                        <StageCard key={stage.id}
                            id={stage.id} sort={stage.sort}
                            stage={stage.stage} stageNo={stage.stageNo} stageYear={stage.stageYear}
                            images={stage.images} />
                    ))
                )
            }
        </div>
    )
}   

export default StageList 
