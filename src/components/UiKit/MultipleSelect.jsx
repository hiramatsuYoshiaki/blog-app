import React from 'react'
import Input from '@material-ui/core/Input';
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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultipleSelect = props => {
    const classes = useStyles();
    // const [personName, setPersonName] = React.useState([]);
    const handleChange = (event) => {
        // setPersonName(event.target.value);
        console.log('MultipleSelect handleChange')
        console.log(event.target.value)
        props.handleChange(event.target.value)
      };
    return (
        <div>
            <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
            <Select
                multiple
                value={props.value}
                onChange={handleChange}
                        
                input={<Input />}
                MenuProps={MenuProps} >
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
