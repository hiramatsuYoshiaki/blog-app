import React from 'react'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
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
    media: {
        height: 0,
        paddingTop: '100%'
    }
}))


const PostImageCard = props => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media}
                image={props.path}
                title=""
                // onClick={() => dispatch(push('/product/' + props.id))}
            />
            <CardContent>
                <Typography color="textSecondary" component="p">
                    {props.description}
                    {props.id}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default PostImageCard
