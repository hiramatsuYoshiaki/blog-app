import React,{useState} from 'react'
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
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        dispatch(push('/'))
    };
    return (
        <div>
            <div className={classes.root}>
                {/* <Pagination count={10} shape="rounded" /> */}
                {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
                <div>Page: {page}</div>
                <Pagination count={10} page={page} onChange={handleChange} />
            </div>
        </div>
       
    )
}


export default RoundPaginations
