import React from 'react'
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router' 

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    landingPosts:{
        maxWidth: '100%',
        margin: '0 auto 20px auto',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            padding: '0',
        },
    },
    imageArea:{
        width:'100vw',
        overflow:'hidden',
        [theme.breakpoints.up('md')]: {
            width:'50vw',
        },
        cursor:'pointer'
        
    },
    textArea:{
        display:'block',
        width:'100%',
        padding:'4rem',
        overflow:'hidden',
        [theme.breakpoints.up('md')]: {
            width:'50%',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
        },
        '& h3':{
            margin:'0 0 10px 0 ',
            fontWeight: '300',
            fontSize:'1.8rem',
            [theme.breakpoints.up('md')]: {
                fontSize:'3rem',
            },
            [theme.breakpoints.up('lg')]: {
                fontSize:'4rem',
            },
            cursor:'pointer',
        },
        '& p':{
            color:'hsl(0, 0%, 98%)  ',//$white-bis
        },
        backgroundColor:'hsl(0, 0%, 7%)'//$black-bis
    }, 
    img:{
        width:'100%',
        mixwidth:'375px',
        height:'auto',
        display:'block',
        margin:'0, auto, 0, auto',
        
        
    },
    
}))


const PostsArea = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    return (
        <div className={classes.landingPosts}>
            <div className={classes.imageArea} onClick={() => dispatch(push('/post/detail/' + props.post.id))}>
                <img src={props.post.topImages[0].path} 
                    alt={props.post.title} 
                    key={props.post.topImages[0].id}
                    className={classes.img}
                    
                />
            </div>
            <div className={classes.textArea} >
                <h3 className="c-glitch c-about-glich" 
                    data-text={props.post.title} 
                    onClick={() => dispatch(push('/post/detail/' + props.post.id))}
                    >
                        {props.post.title}
                </h3>
                <p>{props.post.article}</p>
            </div>
            
            
        </div>
    )
}

export default PostsArea
