import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles({
    "button": {
        backgroundColor: '#2196f3',
        color: '#000',
        fontSize: 16,
        height: 48,
        marginBottom: 16,
        width: 256,
        "&:hover": {
            backgroundColor: '#0d47a1',
        }
    }
});
const PrimaryButton = props => {
    const classes = useStyles()
    return (
        <Button className={classes.button} variant="contained" onClick={() => props.onClick()}>
            {props.label}
        </Button>
    )
}

export default PrimaryButton
