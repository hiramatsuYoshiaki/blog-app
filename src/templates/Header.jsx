import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/core/styles';
import hlogo from '../assets/img/h-logo.svg'
import hlogoName from '../assets/img/h-works1200x600white.svg'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((hteme) => ({
    toolbar:{
        margin:0,
        padding:0,
        // border:'1px solid white',
    }
}))


const Header = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    return (
        <header className="l-header">
            <AppBar
                position="relative"
                color="transparent">
                <Toolbar className={classes.toolbar}>
                    <div onClick={()=>dispatch(push('/'))} className="c-header-logo">
                        <img src={hlogo} alt="h-works logo" className="logo"/>
                        <img src={hlogoName} alt="h-works logo" className="logoName"/>
                    </div>
                    <div className="c-header-menu">
                        <IconButton color="inherit">
                            <MenuIcon fontSize="large" />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            
        </header>
    )
} 

export default Header
