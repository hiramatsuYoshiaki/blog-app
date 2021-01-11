import React from 'react'
import Input from '@material-ui/core/Input';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
const useStyles = makeStyles((theme) => ({
    formControl: {
    //   margin: theme.spacing(1),
    //   minWidth: 120,
    //     maxWidth: 400,
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

// function getStyles(name, personName, theme) {
//     return {
//       fontWeight:
//         personName.indexOf(name) === -1
//           ? theme.typography.fontWeightRegular
//           : theme.typography.fontWeightMedium,
//     };
//   }
//   const names = [
//     'Oliver Hansen',
//     'Van Henry',
//     'April Tucker',
//     'Ralph Hubbard',
//     'Omar Alexander',
//     'Carlos Abbott',
//     'Miriam Wagner',
//     'Bradley Wilkerson',
//     'Virginia Andrews',
//     'Kelly Snyder',
//   ];
const MultipleSelect = props => {
    const classes = useStyles();
    const theme = useTheme();
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
                // labelId="demo-mutiple-name-label"
                        // id="demo-mutiple-name"
                        
                multiple
                value={props.value}
                onChange={handleChange}
                        
                input={<Input />}
                MenuProps={MenuProps} >
                    {/* {names.map((name) => (
                        <MenuItem key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}>
                        {name}
                        </MenuItem>
                    ))} */}
                    {props.options.map((option) => (
                        <MenuItem key={option.id}
                            value={option.id}
                            // style={getStyles(option.name, personName, theme)}
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
