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
        width: "100%",
        maxWidth:400
    },
  }));

const SelectBoxLocations = props => {
    const classes = useStyles();
    return (
        <div>
      <FormControl className={classes.formControl}>
        <InputLabel >{props.label}</InputLabel>
            <Select
                value={props.value} required={props.required}
                onChange={(e) => props.select(e.target.value)}
            >
                {props.options.map((value) => {
                    return  <MenuItem key={value.id} value={value.id}>
                                <span className="p-span-rightMargin">{value.name}</span>
                            </MenuItem>
                })}
            </Select>
      </FormControl>
    </div>
    )
}

export default SelectBoxLocations
