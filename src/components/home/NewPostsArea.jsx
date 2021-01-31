import React from 'react'
import {useDispatch} from  'react-redux'
import {push} from 'connected-react-router'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
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

    },
    button:{
        marginRight:0,
        marginLeft:'auto',
        padding:'0 16px'
    }
}))

const NewPostsArea = props => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const post = props.post
    return (
        <Card className={classes.cardWrape}>
            <CardActionArea>
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
                    <h2>{post.title}</h2>
                    <p>{post.postDate.split('T')[0]}</p>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained" 
                        color="primary"
                        endIcon={<ChevronRightIcon/>}
                        onClick={()=> dispatch(push('/post/detail/' + props.id ))}
                        className={classes.button}
                        >
                        <p>投稿を見る</p>
                    </Button>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}

export default NewPostsArea
