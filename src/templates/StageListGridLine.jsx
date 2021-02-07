import React,{useEffect} from  'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchPosts} from '../reducks/posts/operators'
import {fetchStages} from '../reducks/stage/operators'
import {getPosts} from '../reducks/posts/selectors'
import {getStages} from '../reducks/stage/selectors'
import {push} from 'connected-react-router'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
const useStyles = makeStyles((_theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      padding:'8px 0'
    },
    gridList: {
      flexWrap: 'nowrap',
      width: '100%',
    //   border:'1px solid white',
    //   backgroundColor:'white'
    },
  }));

const StageListGridLine = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const posts = getPosts(selector)
    const stages = getStages(selector)
    const postsSort = () =>{
        let sorted = posts.sort(function(a,b){
            if(a.created_at > b.created_at) return -1;
            if(a.created_at < b.created_at) return 1;
            return 0;
        });
        return sorted
    }

    const postInStage = (id) => {
        const filterPosts =  posts.filter(post => post.stage.id === id)

        let sorted = filterPosts.sort(function(a,b){
            if(a.created_at > b.created_at) return 1;
            if(a.created_at < b.created_at) return -1;
            return 0;
        });
        return sorted

    }

    useEffect(()=> {
        dispatch(fetchPosts()) 
        dispatch(fetchStages())  
    },[])  
    return (
        <div className="l-container-fluid ">
            <div className="l-section ">
                <div>
                    { stages.length > 0 &&(
                        stages.map(stage => (
                            <div>
                                <h1 style={{color:'#fff', marginRight:16}}>{stage.stage}</h1>
                                <GridList className={classes.gridList} cols={2.5} cellHeight={'auto'}>
                                    {postInStage(stage.id).map(post=>(
                                        post.topImages.map(topImage=>(
                                            <GridListTile key={topImage.id} cols={1} onClick={()=> dispatch(push('/post/detail/' + post.id))}> 
                                                <img src={topImage.path} alt={topImage.description} className="c-image-fit-cover"/>
                                            </GridListTile>
                                        ))
                                    ))}
                                </GridList>
                            </div>
                        ))
                    )}
                </div>
                

                {/* <div className={classes.root}>
                    <GridList className={classes.gridList} cols={2.5} cellHeight={'auto'}>
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
                </div> */}
            </div>

        </div>
    )
}

export default StageListGridLine 

