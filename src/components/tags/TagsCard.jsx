import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { deleteTags } from '../../reducks/tags/operators'

const TagsCard = props => {
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null)
   
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <Card>
            <CardContent>
                <div onClick={() => dispatch(push('/tags/' + props.id))}>
                    <Typography >
                        {props.name}
                    </Typography>
                </div>
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
                        dispatch(push('/tags/edit/' + props.id))
                        handleClose()
                    }}>
                        編集する
                    </MenuItem>
                    <MenuItem onClick={() => {
                        dispatch(deleteTags(props.id))
                        handleClose()
                    }}>
                        削除する
                    </MenuItem>
                </Menu>
            </CardContent>
        </Card>
    )
}

export default TagsCard 
