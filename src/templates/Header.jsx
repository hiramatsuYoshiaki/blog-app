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
import Collapse from '@material-ui/core/Collapse';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import ListIcon from '@material-ui/icons/List';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonIcon from '@material-ui/icons/Person';
import CollectionsIcon from '@material-ui/icons/Collections';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
    toolbar:{
        margin:0,
        padding:0,
    },
    icon:{
        width:'2rem',
        height:'2rem',
        marginRight:'.2rem'
    },
    iconWhite:{
        width:'2rem',
        height:'2rem',
        marginRight:'.2rem',
        color:'#fff'
    },
    menuicon:{
        width:'2rem',
        height:'2rem',
        marginLeft:'.2rem',
        color:'#000'
    },
    menu: {
        "& .MuiPaper-root": {
          backgroundColor: "white",
        },
      },
    nested: {
        paddingLeft: theme.spacing(4),
      },
}))


const Header = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [isOpen,setIsOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [toggleDrwerPost, setToggleDrwerPost] = useState(true);
    const handleClickOpenDrwerPost = () => {
        setToggleDrwerPost(!toggleDrwerPost);
      };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    const handleClose = () => {
    setAnchorEl(null);
    };
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
                        <IconButton onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
                            < CropOriginalIcon className={classes.iconWhite}/>
                            <span style={{color:'#fff'}} >POST</span>
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            className={classes.menu}
                            >
                                <MenuItem onClick={handleClose} >
                                    <span onClick={()=>dispatch(push('/post/listGrid'))}>GRID</span>
                                    <IconButton onClick={()=>dispatch(push('/post/listGrid'))} >
                                        < ViewCompactIcon className={classes.icon}/>
                                    </IconButton>
                                </MenuItem> 
                                <MenuItem onClick={handleClose} >
                                    <span onClick={()=>dispatch(push('/blog/data'))}>LIST</span>
                                    <IconButton onClick={()=>dispatch(push('/blog/data'))}>
                                        < ListIcon className={classes.icon}/>
                                    </IconButton>
                                </MenuItem> 
                        </Menu>
                        <IconButton onClick={()=>dispatch(push('/stage/listgridline'))}>
                            < CollectionsIcon className={classes.iconWhite}/>
                            <span style={{color:'#fff'}}>STAGE</span>
                        </IconButton>
                        <IconButton onClick={()=>dispatch(push('/location/map'))}>
                            < LocationOnIcon className={classes.iconWhite}/>
                            <span style={{color:'#fff'}}>LOCATION</span>

                        </IconButton>
                        <IconButton onClick={()=>dispatch(push('/about'))}>
                            < PersonIcon className={classes.iconWhite}/>
                            <span style={{color:'#fff'}}>ABOUT</span>
                        </IconButton>
                    </div>
                    <div className="c-header-mobile-menu-icon">
                        <IconButton color="inherit" onClick={ToggleDrawer(true)}>
                            <MenuIcon fontSize="large" />
                        </IconButton>
                    </div>
                    <Drawer 
                        open={isOpen} 
                        onClose={ToggleDrawer(false)}
                        anchor="right"
                        >
                        <List component="nav">
                            <ListItem button  onClick={() => handleClickOpenDrwerPost()}>
                                <ListItemIcon>
                                    < CropOriginalIcon className={classes.icon}/>
                                </ListItemIcon>
                                <ListItemText primary="POST" />
                                {toggleDrwerPost ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={toggleDrwerPost} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button className={classes.nested} onClick={()=>dispatch(push('/post/listGrid'))}>
                                        <ListItemIcon>
                                            <ViewCompactIcon className={classes.icon}/>
                                        </ListItemIcon>
                                        <ListItemText primary="GRID" />
                                    </ListItem>
                                </List>
                                <List component="div" disablePadding>
                                    <ListItem button className={classes.nested} onClick={()=>dispatch(push('/blog/data'))}>
                                        <ListItemIcon>
                                            <ListIcon className={classes.icon}/>
                                        </ListItemIcon>
                                        <ListItemText primary="LIST" />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem button onClick={()=>dispatch(push('/stage/listgridline'))}>
                                <ListItemIcon>
                                    <CollectionsIcon className={classes.icon}/>
                                </ListItemIcon>
                                <ListItemText primary="STAGE" />
                            </ListItem>
                            <ListItem button onClick={()=>dispatch(push('/location/map'))}>
                                <ListItemIcon>
                                    <LocationOnIcon className={classes.icon}/>
                                </ListItemIcon>
                                <ListItemText primary="LOCATION" />
                            </ListItem>
                            <ListItem button  onClick={()=>dispatch(push('/about'))} >
                                <ListItemIcon>
                                    <PersonIcon className={classes.icon}/>
                                </ListItemIcon>
                                <ListItemText primary="ABOUT" />
                            </ListItem>
                        </List>
                    </Drawer>




                </Toolbar>
            </AppBar>
            {/* <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={classes.postMenu}
                style={{color:'#000'}}
                >
                <MenuItem onClick={handleClose} style={{color:'#000'}}>
                    <IconButton onClick={()=>dispatch(push('/post/listGrid'))}>
                        <span style={{color:'#fff'}}>GRID</span>
                        < ViewCompactIcon className={classes.icon}/>
                    </IconButton></MenuItem>
                <MenuItem onClick={handleClose}>
                    <IconButton onClick={()=>dispatch(push('/blog/data'))}>
                    <span style={{color:'#fff'}}>LIST</span>
                    < ListIcon className={classes.icon}/>
                </IconButton></MenuItem>
            </Menu> */}
            
        </header>
    )
} 

export default Header
