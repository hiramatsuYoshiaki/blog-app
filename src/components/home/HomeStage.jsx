import React from 'react'
import {StageSwiper} from './index'

const HomeStage = props => {
    return (
            <StageSwiper stages={props.stages} className="c-new-Stage" />
    )
}

export default HomeStage
