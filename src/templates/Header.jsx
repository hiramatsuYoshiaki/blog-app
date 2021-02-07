import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/core/styles';
import hlogo from '../assets/img/h-logo.svg'
import hlogoName from '../assets/img/h-works1200x600white.svg'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles((hteme) => ({
    toolbar:{
        margin:0,
        padding:0,
    }
}))


const Header = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [isOpen,setIsOpen] = useState(false)
    const ToggleDrawer = (open) => (event) =>{
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
          }
          setIsOpen(open);
    }
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
                    <div className="c-header-tablet-menu">
                        <span onClick={()=>dispatch(push('/post/listGrid'))}>POST</span>
                        <span>STAGE</span>
                        <span>LOCATION</span>
                        <span>ABOUT</span>
                       
                    </div>
                    <div className="c-header-mobile-menu-icon">
                        <IconButton color="inherit" onClick={ToggleDrawer(true)}>
                            <MenuIcon fontSize="large" />
                        </IconButton>
                    </div>
                    {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
                    {/* <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}> */}
                    <Drawer 
                        open={isOpen} 
                        onClose={ToggleDrawer(false)}
                        anchor="right"
                        >
                        <List component="nav">
                            <ListItem button onClick={()=>dispatch(push('/post/listGrid'))}>
                                {/* <ListItemIcon>
                                    <SendIcon />
                                </ListItemIcon> */}
                                <ListItemText primary="POST" />
                            </ListItem>
                            <ListItem button>
                                {/* <ListItemIcon>
                                    <SendIcon />
                                </ListItemIcon> */}
                                <ListItemText primary="STAGE" />
                            </ListItem>
                            <ListItem button>
                                {/* <ListItemIcon>
                                    <SendIcon />
                                </ListItemIcon> */}
                                <ListItemText primary="LOCATION" />
                            </ListItem>
                            <ListItem button>
                                {/* <ListItemIcon>
                                    <SendIcon />
                                </ListItemIcon> */}
                                <ListItemText primary="ABOUT" />
                            </ListItem>
                        </List>
                    </Drawer>




                </Toolbar>
            </AppBar>
            
        </header>
    )
} 

export default Header
