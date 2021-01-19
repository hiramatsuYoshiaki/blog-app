import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: 16,
        minWidth: 120,
        width: "100%"
    },
  }));

const SelectBox = props => {
    const classes = useStyles();
    return (
        <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-label-tag">{props.label}</InputLabel>
                <Select
                    labelId="select-label-tag"
                    id="select-tag"
                    value={props.value} 
                    onChange={(e) => props.select(e.target.value)}
                    defaultValue={props.defaultValue}
                    required={props.required}
            >
                {props.options.map((value) => {
                    return <MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>
                })}
            </Select>
      </FormControl>
    </div>
    )
}

export default SelectBox
