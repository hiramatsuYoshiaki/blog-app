import React,{useEffect,useRef} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router'

const useStyles = makeStyles((theme) => ({
   wraper:{
        width:'100%',
        height:'100%',
        overflow:'hidden',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        [theme.breakpoints.up('md')]: {
            flexDirection:'row-reverse',
        },
    },
    header:{
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        [theme.breakpoints.up('md')]: {
            justifyContent:'center',
            alignItems:'center',
            width:'50%',
        },
        
    },
    textWraper:{
        width:'80%',
        padding:'1.6rem',
        border:'1px solid lightgrey',
        textAlign:'center',
        marginBottom:'1.6rem',
        [theme.breakpoints.up('md')]: {
            marginBottom:0,
        },
        cursor:'pointer'
    },
    images:{
        cursor:'pointer',
        overflow:'hidden'
    },
    gbWraper:{
        position:'relative',
        width:'500px',
        height:'500px',
        maxWidth:'500px',
        backgroundColor:'red',
        opacity:'0.7',
    },
    bg:{
        width:'300px',
        height:'300px',
        backgroundColor:'red',
        // width:'100%',
        // height:'auto',
        // maxWidth:'500px'
    }
})) 

const StagesArea = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    return (
        <div className={classes.wraper}>
                <div className={classes.header}>
                    <div className={classes.textWraper} onClick={()=> dispatch(push(`/stage/detail/${props.stage.id}`))}>
                        
                        <h5 className={classes.glitch}>{props.stage.stage}</h5> 

                        <p>STAGE{props.stage.stageNo}</p>
                        <p>{props.stage.stageYear}</p>
                    </div>
                </div>
                <div className={classes.images} onClick={()=> dispatch(push(`/stage/detail/${props.stage.id}`))}>
                    <img src={props.stage.images[0].path} 
                    alt={props.stage.stage} 
                    style={{width:'100%',height:'auto',maxWidth:'500px'}}/>
                   {/* <div className={classes.gbWraper} >
                        <div 
                            className="c-landingRoot-bg" 
                            style={{
                                // backgroundImage: `url(https://images.unsplash.com/photo-1547976705-2b3313d73728?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80)`,
                                backgroundImage: `url(${props.stage.images[0].path})`,
                                // backgroundSize: 'center'
                            }}
                            >
                        </div>
                    </div> */}
                </div>
               
        </div>
    )
}

export default StagesArea
