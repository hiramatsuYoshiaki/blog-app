import React,{useEffect, useCallback, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {push} from 'connected-react-router'
import {fetchPosts} from '../../reducks/posts/operators'
import {getPosts} from '../../reducks/posts/selectors'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
// import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
    list:{
        width:'100%'
    }
  }));
/**
 * Convert datetime into the String.
 * @param {Date} dt
 * @returns {string} "YYYY-MM-DD"
 */
export const dateToString = (dt) => {
    return dt.getFullYear() + '-'
        + ('00' + (dt.getMonth()+1)).slice(-2) + '-'
        + ('00' + dt.getDate()).slice(-2)
};
/**
 * Convert datetime into the String.
 * @param {Date} dt
 * @returns {string} "YYYY-MM-DD"
 */
export const datetimeToString = (dt) => {
    return dt.getFullYear() + '-'
        + ('00' + (dt.getMonth()+1)).slice(-2) + '-'
        + ('00' + dt.getDate()).slice(-2) + ' '
        + ('00' + dt.getHours()).slice(-2) + ':'
        + ('00' + dt.getMinutes()).slice(-2) + ':'
        + ('00' + dt.getSeconds()).slice(-2)
};
const PostsInStage = props => {
    const classes=useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const posts = getPosts(selector)
    const stageId = props.stage.id

    // const orderedDatetime = datetimeToString(created_at.toDate())
    // const shippingDate = dateToString(created_at.toDate())

    const postsInStage = useCallback((id) => {
        const filterPosts = posts.filter(post => post.stage.id === id)
        let sorted = filterPosts.sort(function(a,b){
            if(a.created_at > b.created_at) return 1
            if(a.created_at < b.created_at) return -1
            return 0
        }) 
        return sorted
    },[props.stage.id])

    useEffect(()=>{
        dispatch(fetchPosts())
    },[])
    return (
        <List className={classes.list}>
            {postsInStage(stageId).map((post, index ) => (
                <div key={post.id} >
                    <ListItem 
                        alignItems="flex-start" 
                        
                        onClick={() => dispatch(push('/post/detail/' + post.id))}
                    >
                        <ListItemAvatar>
                            <Avatar alt="投稿メイン画像" src={post.topImages[0].path} />
                        </ListItemAvatar>
                        <ListItemText
                        primary={post.title}
                        secondary={
                            <React.Fragment>
                                    {dateToString(post.created_at.toDate())}
                            </React.Fragment>
                        }                
                        />
                    </ListItem>
                    <Divider  />
                </div>
            ))}
        </List>
    )
}

export default PostsInStage
