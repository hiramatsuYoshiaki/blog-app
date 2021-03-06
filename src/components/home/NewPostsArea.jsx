import React from 'react'
import {useDispatch} from  'react-redux'
import {push} from 'connected-react-router'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    cardWrape:{
        [theme.breakpoints.down('sm')]:{
            margin:8,
            width:'100%',
            height:'auto'
        },
        [theme.breakpoints.up('sm')]:{
            margin:8,
            width:'calc(50% - 16px )',
            height:'auto'
        },
        [theme.breakpoints.up('md')]:{
            margin:16,
            width:'calc(25% - 32px)',
            height:'auto'
        },
        display: 'flex',
        flexDirection: 'column',
        // justifyContent:'flex-start',
        // alignItems:'flex-start',
        height: '100%',
    },
    button:{
        marginRight:0,
        marginLeft:'auto',
        padding:'0 16px'
    },
    chip:{
        marginRight:4
    },
    cardActionArea:{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    cardAction:{
        flexShrink: 0
    }
}))

const NewPostsArea = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const post = props.post
    const handleClickTga =(ids,e) =>{
        //投稿表示エリアのフィルターするキーを設定する
        props.setFilter({
            type:'tag',
            key:ids.postId,
            locationKey:'',
            tagKey:ids.tagId,
        })
        props.setVolume(props.defaultVolume)
    }
    
    return (
        <Card className={classes.cardWrape}>
            <CardActionArea className={classes.cardActionArea}>
                {post.topImages.length > 0 && (
                    post.topImages.map(image => (
                        <CardMedia
                            component="img"
                            alt={image.description}
                            height="auto"
                            image={image.path}
                            title={image.title}
                            key={image.id}
                        />
                    ))
                )} 
                <CardContent>
                    <h4>{post.title}</h4>
                    <p>{post.postDate.split('T')[0]}</p>
                    <p>{post.location.name}</p>
                    {post.tags.length > 0 && (
                        post.tags.map(tag => (
                            <span key={tag.id}>
                                <Chip
                                    size="small"
                                    label={tag.name}
                                    onClick={(e) => handleClickTga({postId:post.id,tagId:tag.id},e)}
                                    className={classes.chip}
                                    clickable
                                />
                            </span>
                        ))
                    )} 
                </CardContent>

            </CardActionArea>
            <CardActions className={classes.cardAction}>
                <Button
                    variant="contained" 
                    color="primary"
                    endIcon={<ChevronRightIcon/>}
                    onClick={()=> dispatch(push('/post/detail/' + props.id ))}
                    className={classes.button}
                    >
                    投稿を見る
                </Button>
            </CardActions>
        </Card>
    )
}

export default NewPostsArea
