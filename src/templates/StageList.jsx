import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStages } from '../reducks/stage/operators'
import { getStages } from '../reducks/stage/selectors'
import { StageCard } from '../components/stage/index'
import Button from '@material-ui/core/Button'
import {push} from 'connected-react-router'

const StageList = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state => state))
    const stages = getStages(selector)

    useEffect(() => {
        dispatch(fetchStages()) 
    },[])
    return (
        <div className="l-container">
            <div className="l-section ">
                <div className="c-admin-wrape">
                <h2>ステージリスト</h2>
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

export default StageList 
