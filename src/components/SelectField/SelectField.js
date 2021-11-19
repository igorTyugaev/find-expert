import React, {forwardRef, useState} from 'react';
import {Box, Chip, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";


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

const getStyles = (name, value) => {
    if (!name || !value) return "400";
    return {
        fontWeight:
            value.indexOf(name) === -1
                ? "400"
                : "500",
    }
};

const SelectField = forwardRef(({options, value, onChange, label, multiple = false, ...props},
                                ref) => {
    const [innerValue, setInnerValue] = useState([]);
    const isSafe = (typeof value === 'undefined');
    const handleChange = (event) => {
        const value = event.target.value;
        const resultArray = typeof value === 'string' ? value.split(',') : value;
        if (isSafe) {
            setInnerValue(resultArray)
        } else {
            onChange(resultArray);
        }
    };


    return (
        <>
            <InputLabel {...props}>
                {label}
            </InputLabel>
            <Select
                multiple={multiple}
                value={isSafe ? innerValue : value}
                onChange={handleChange}
                inputRef={ref}
                input={<OutlinedInput label={label} {...props}/>}
                renderValue={(selected) => (
                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                        {selected.map((value) => (
                            <Chip key={value} label={value}/>
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {options.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, isSafe ? innerValue : value)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText {...props}>
                {props?.helperText}
            </FormHelperText>
        </>
    );
});

export default SelectField;
