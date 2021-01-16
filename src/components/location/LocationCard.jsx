import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import NoImage from '../../assets/img/no_image.jpg'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { deleteLocation } from '../../reducks/locations/operators'
const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            margin: 8,
            width: 'calc(50% - 16px)'
        },
        [theme.breakpoints.up('sm')]: {
            margin: 16,
            width: 'calc(33.3333% - 32px)'
        },
    },
    // content: {
    //     display: 'flex',
    //     padding: '16px 8px',
    //     textAlign: 'left',
    //     '&:last-child': {
    //         paddingBottom: 16
    //     }
    // },
    media: {
        height: 200,
        width:'auto'
    },
    // icon: {
    //     marginRight: 0,
    //     marginLeft: 'auto'
    // }

})) 
const LocationCard = props => {
    const dispatch = useDispatch()
    const classes = useStyles()
    // const images = props.images.length
    // const images = (props.images.length > 0 ? props.images :[{path:NoImage}])
    // const images = [{ path: NoImage }]
    // console.log(images)
    // console.log(NoImage)
    const [anchorEl, setAnchorEl] = useState(null)
   
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <Card className={classes.root}>
            { props.images.length > 0 && (
                <div>
                    {props.images.map((image) => {
                        return (
                            <CardMedia
                                key={image.id}
                                component="video"
                                height="300"
                                image={image.path}
                                title={props.name} 
                                autoPlay
                                controls
                            />
                        )
                    })}
                </div>
            )}
           
            <CardContent>
                <Typography >
                    {props.name}
                </Typography>
                <IconButton  onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClick={handleClose}
                >
                    <MenuItem onClick={() => {
                        dispatch(push('/location/edit/' + props.id))
                        handleClose()
                    }}>編集する</MenuItem>
                <MenuItem onClick={() => {
                        dispatch(deleteLocation(props.id))
                        handleClose()
                    }}>削除する</MenuItem>
                </Menu>
            </CardContent>
            {/* {props.images.length > 0 && (
                props.images.length.map((image) => {
                    <CardMedia
                        key={image.id}
                        component="video"
                        height="140"
                        image={image.path}
                        title={props.name} 
                    />
                })
            )} */}
            
        </Card>
        // <div>
        //     <h1>Location Card</h1>
        //     <h3>{props.id}</h3>
        //     <h3>{props.name}</h3>
        //     <h3>経度：{props.position.lat}</h3>
        //     <h3>緯度：{props.position.lng}</h3>
        //     { props.images.length > 0 && (
        //         <div>
        //             {props.images.map((image) => {
        //                 return (
        //                     <div key={image.id}>
        //                         <video muted controls>
        //                         <source src={image.path} type="video/mp4" />
        //                     </video>
        //                     </div>
        //                 )
        //             })}
        //         </div>
        //     )}
        // </div>
    )
}

export default LocationCard
