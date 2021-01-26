import React from 'react'
import {StageSwiper} from './index'

const HomeStage = props => {
    return (
        // <div className="c-stagehome-box">
            <StageSwiper stages={props.stages}/>
        // </div>
    )
}

export default HomeStage
