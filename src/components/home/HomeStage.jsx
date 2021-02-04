import React from 'react'
import {StageSwiper} from './index'

const HomeStage = props => {
    return (
        <div className='c-home-stage'> 
            <StageSwiper 
                stages={props.stages}
                filter={props.filter} 
                setFilter={props.setFilter}
                volume={props.volume} 
                setVolume={props.setVolume}
                setStageName={props.setStageName}
                setStageNo={props.setStageNo}
                setStageYear={props.setStageYear}
              />
        </div>
        
    )
}

export default HomeStage
