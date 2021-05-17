import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router'

const useStyles = makeStyles((theme) => ({
   wraper:{
        width:'100%',
        height:'100%',
        overflow:'hidden',
        display:'block',
        [theme.breakpoints.up('sm')]: {
            display:'flex',
            flexDirection:'row-reverse',
        },
    },
    header:{
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        padding:'2rem 0',
        [theme.breakpoints.up('sm')]: {
            width:'30%',
        },
        [theme.breakpoints.up('md')]: {
            width:'50%',
        },
    },
    textWraper:{
        width:'100%',
        padding:'.8rem',
        textAlign:'center',
        margin:'.8rem 0',
        cursor:'pointer',
        '& h5':{
            marginBottom:'.4rem'
        },
        '& p':{
            '& span':{
                marginRight:'.4rem',
            }
        },

    },
    // xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920,
    images:{
        cursor:'pointer',
        overflow:'hidden',

        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        padding:0,
        [theme.breakpoints.up('sm')]: {
            paddingLeft:'.4rem'
        },
        
    },
})) 

const StagesArea = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    return (
        <div className={classes.wraper}>
                <div className={classes.header}>
                    <div className={classes.textWraper} onClick={()=> dispatch(push(`/stage/detail/${props.stage.id}`))}>
                        <h5>{props.stage.stage}</h5> 
                        <p>
                            <span>STAGE{props.stage.stageNo}</span>
                            <span>{props.stage.stageYear}</span>
                        </p>
                    </div>
                </div>
                <div className={classes.images} onClick={()=> dispatch(push(`/stage/detail/${props.stage.id}`))}>
                    <img src={props.stage.images[0].path} 
                    alt={props.stage.stage} 
                    style={{width:'100%',height:'auto',maxWidth:'500px'}}/>
                </div>
               
        </div>
    )
}

export default StagesArea
