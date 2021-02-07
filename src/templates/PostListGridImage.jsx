import React,{useEffect} from  'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchPosts} from '../reducks/posts/operators'
import {getPosts} from '../reducks/posts/selectors'
import {push} from 'connected-react-router'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      padding:'8px 0'
    },
    gridList: {
      width: '100%',
    //   border:'1px solid white',
    //   backgroundColor:'white'
    },
  }));

const PostListGridImage = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const posts = getPosts(selector)
    const postsSort = () =>{
        let sorted = posts.sort(function(a,b){
            if(a.created_at > b.created_at) return -1;
            if(a.created_at < b.created_at) return 1;
            return 0;
        });
        return sorted
    }
    useEffect(()=> {
        dispatch(fetchPosts())  
    },[])  
    return (
       <div className="l-container-fluid ">
           <div className="l-section ">
            <div className={classes.root}>
                    <GridList cellHeight={'auto'} className={classes.gridList} cols={3}>
                        {  postsSort().length > 0 &&(
                            postsSort().map(post=> (
                                post.topImages.map(topImage=>(
                                    <GridListTile key={topImage.id} cols={1}>
                                        <img src={topImage.path} alt={topImage.description} className="c-image-fit-cover"/>
                                    </GridListTile>
                                ))
                            ))
                        )}
                    </GridList>
                </div>
            </div>
       </div>
    )
}

export default PostListGridImage 

