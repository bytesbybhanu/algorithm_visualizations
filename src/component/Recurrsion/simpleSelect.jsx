import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const SimpleSelect = (props) => {
    const classes = useStyles();
    const [age, setAge] = React.useState('0');
    const { pos, label, items, onValueChanged } = props;

    const handleChange = (event) => {
        console.log(pos);
        setAge(event.target.value);
        onValueChanged(pos, event.target.value);
    };

    return (
        <div className="ml-2 mr-2">
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
                >
                    {Array.isArray(items) && items.map((item, index) => (
                        <MenuItem key={index} value={index}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default SimpleSelect;
