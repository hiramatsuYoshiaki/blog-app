import React from 'react'
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router' 
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    landingPosts:{
        maxWidth: '100%',
        height:'100%',//必須
        minHeight:'25vh',
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
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        [theme.breakpoints.up('md')]: {
            width:'50vw',
        },
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
            '&:hover': {
                opacity: .7
            }
        },
        '& p':{
            color:'hsl(0, 0%, 98%)  ',//$white-bis
        },
    }, 
    img:{
        width:'100%',
        mixwidth:'375px',
        height:'auto',
        display:'block',
        margin:'0, auto, 0, auto',
        '&:hover':{
            opacity:.5,
            cursor:'pointer',
        }
    },
    linkbutton:{
        fontSize:'1.5rem',
        fontWeight:600,
        margin:'.4rem 0 0 -1.2rem',
        '& span':{
            marginRight:'.4rem',
        }
    }
    
}))
 

const PostsArea = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch() 
    return (
        <div className={classes.landingPosts}>
            <div className={classes.imageArea} >
                <img src={props.post.topImages[0].path} 
                    alt={props.post.title} 
                    key={props.post.topImages[0].id}
                    className={classes.img}
                    onClick={() => dispatch(push('/post/detail/' + props.post.id))}
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
                <Button 
                    onClick={() => dispatch(push('/post/detail/' + props.post.id))} 
                    size="large"
                    color="secondary"
                    className={classes.linkbutton}
                >
                    <span>この投稿を見る</span>
                    <ArrowForwardIosIcon />
                </Button>
            </div>
        </div>
    )
}

export default PostsArea
