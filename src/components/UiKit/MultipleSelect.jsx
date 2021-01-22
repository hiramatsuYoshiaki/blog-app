import React from 'react'
import { makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: 16,
        minWidth: 120,
        width: "100%",
        maxWidth:400
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
}));
const MultipleSelect = props => {
    const classes = useStyles();
    const handleChange = (event) => {
      console.log(event.target.value);
        props.handleChange(event.target.value)
      };
    return (
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="select-label-tag">{props.label}</InputLabel>
            <Select
                labelId="select-label-tag"
                id="select-tag"
                multiple
                value={props.value}
                onChange={handleChange}
                 >
                    {props.options.map((option) => (
                        <MenuItem key={option.id}
                            value={option.id}
                        >
                        {option.name}
                        </MenuItem>
                    ))}
              </Select>
            </FormControl>
        </div>
    )
}

export default MultipleSelect
