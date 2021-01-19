import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export const DateTimePicers = (props) => {
    const classes = useStyles();
    return (
        <TextField
            onChange={props.onChange}
            id="datetime-local"
            label={props.label}
            type="datetime-local"
            defaultValue={props.defaultValue}
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
        />
            
    )
}
export default DateTimePicers;