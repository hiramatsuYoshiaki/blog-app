import React from 'react'
import {ReactCurtainsSlideshowGSAP} from './index'
import {makeStyles} from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({ 
    Wraper: {
        minHeight: 'calc(100vh - 6.4rem)',
        margin: '0 auto 0 auto', 
        position:'relative',
        overflow:'hidden',
    },
}))

const SlideshowArea = props => {
    const classes = useStyles()
    return (
        <header className={classes.Wraper} >
            <ReactCurtainsSlideshowGSAP posts={props.posts}/>
        </header>
    )
}

export default SlideshowArea
