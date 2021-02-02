import React,{ useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getIsSignedIn} from '../reducks/users/selectors'
import {listenAuthState} from '../reducks/users/operators'

import { push } from 'connected-react-router'
import { signOut } from '../reducks/users/operators'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const useStyles = makeStyles((hteme) => ({
    toolbar:{
        margin:0,
        padding:0,
        display:'flex',
        flexFlow:'row wrap',
    }
}))

const Footer = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const isSignedIn = getIsSignedIn(selector)
    useEffect(() => {
        if (!isSignedIn) {
            dispatch(listenAuthState())
        }
    },[dispatch,isSignedIn])

    return (
        <footer className="l-footer">
            <AppBar 
                position="relative"
                color="transparent">
                <Toolbar className={classes.toolbar}>
                    {!isSignedIn ? (
                        <IconButton color="inherit" onClick={() => dispatch(push('/signin'))}>
                            <LockOpenIcon fontSize="large"/>
                        </IconButton>
                        ) : (
                        <>  
                            {/* <IconButton color="inherit" onClick={() => dispatch(push('/signout'))}> */}
                            <IconButton color="inherit" onClick={() => dispatch(signOut())}>
                                <ExitToAppIcon fontSize="large"/>
                            </IconButton>
                            <p>管理者でログインしています。</p>
                            <IconButton color="inherit" onClick={() => dispatch(push('/admin'))}>
                                <SupervisorAccountIcon fontSize="large"/>
                            </IconButton>
                        </>
                        )
                    }
                </Toolbar>
            </AppBar>
        </footer>
    )
}

export default  Footer
