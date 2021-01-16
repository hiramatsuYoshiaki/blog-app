import React,{ useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import NoImage from '../../assets/img/no_image.jpg'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { deleteStage } from '../../reducks/stage/operators' 
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
const StageCard = props => {
    const dispatch = useDispatch()
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = useState(null)
   
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const images = (props.images.length > 0 ? props.images : [{ path: NoImage }])
    return (
        <div>
            <Card className={classes.root}>
                 {/* id={stage.id} sort={stage.sort}
                            stage={stage.stage} stageNo={stage.stageNo} stageYear={stage.stageYear}
                            images={stage.images} */}
                <CardMedia className={classes.media}
                    image={images[0].path}
                    title={images[0].description}
                    onClick={() => dispatch(push('/stage/' + props.id))}
                />
                <CardContent>
                    <Typography>
                        {props.stage}
                    </Typography>
                    <Typography>
                        {props.stageYear} STAGE-{props.stageNo}
                    </Typography>
                </CardContent>
            </Card>
            <IconButton onClick={handleClick}>
                <MoreVertIcon></MoreVertIcon>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClick={handleClose}
            >
                <MenuItem onClick={() => {
                        dispatch(push('/stage/edit/' + props.id))
                        handleClose()
                }}>
                    編集する
                </MenuItem>
                <MenuItem onClick={() => {
                        dispatch(deleteStage(props.id))
                        handleClose()
                }}>
                    削除する
                </MenuItem>
            </Menu >
           
        </div>
    )
}

export default StageCard
