import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));


const RoundPaginations = props => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const cnt = props.posts.length
    const posts = props.posts
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
      setPage(value)


        const index = parseInt(value, 10)
        const currenyPost = posts[index - 1] 
        dispatch(push('/post/detail/' + currenyPost.id))

    }; 
    
    useEffect(()=>{
      const index = posts.findIndex((post) => post.id === props.id);
      if(index !== -1){
        setPage( index + 1)
      }
    },[])


    return (
        <div>
            <div className={classes.root}>
                <Pagination count={cnt} page={page}  onChange={handleChange} />
            </div>
        </div>
       
    )
}


export default RoundPaginations
