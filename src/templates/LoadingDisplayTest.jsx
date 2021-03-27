import React,{useEffect,useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress'
import Backdrop from '@material-ui/core/Backdrop';
const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      backgroundColor:'black',
    },
  }));
const LoadingDisplayTest = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    // const [isLoaded, setIsLoaded] = useState(false);
    const handleClose = () => {
        setOpen(false);
      };
    const handleToggle = () => {
        setOpen(!open);
      };
      useEffect(() => {
        handleToggle()
        setTimeout(() => {
        //   setIsLoaded(true);
        handleClose()
        }, 3000);
      }, []);
    return (
        <div style={{color:'white'}}>
            LoadingDisplayTest
            {/* <CircularProgress />
            <LinearProgress /> */}
            <Button variant="outlined" color="primary" onClick={handleToggle}>
                Show backdrop
            </Button>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default LoadingDisplayTest 
