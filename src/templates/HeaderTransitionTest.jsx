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


const HeaderTransitionTest = () => {
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
                        <IconButton onClick={()=>dispatch(push('/homeTransitionTest'))}>
                            < CollectionsIcon className={classes.iconWhite}/>
                            <span style={{color:'#fff'}}>HOME</span>
                        </IconButton>
                        <IconButton onClick={()=>dispatch(push('/contactTransitionTest'))}>
                            < LocationOnIcon className={classes.iconWhite}/>
                            <span style={{color:'#fff'}}>CONTACT</span>

                        </IconButton>
                        <IconButton onClick={()=>dispatch(push('/aboutTransitionTest'))}>
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
                            <ListItem button onClick={()=>dispatch(push('/homeTransitionTest'))}>
                                <ListItemIcon>
                                    <CollectionsIcon className={classes.icon}/>
                                </ListItemIcon>
                                <ListItemText primary="HOME" />
                            </ListItem>
                            <ListItem button onClick={()=>dispatch(push('/contactTransitionTest'))}>
                                <ListItemIcon>
                                    <LocationOnIcon className={classes.icon}/>
                                </ListItemIcon>
                                <ListItemText primary="CONTACT" />
                            </ListItem>
                            <ListItem button  onClick={()=>dispatch(push('/aboutTransitionTest'))} >
                                <ListItemIcon>
                                    <PersonIcon className={classes.icon}/>
                                </ListItemIcon>
                                <ListItemText primary="ABOUT" />
                            </ListItem>
                        </List>
                    </Drawer>
                </Toolbar>
            </AppBar>
        </header>
    )
} 

export default HeaderTransitionTest
