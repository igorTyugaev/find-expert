import React from 'react';
import {Box, Chip, MenuItem, OutlinedInput, Select} from "@mui/material";


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

const getStyles = (name, personName) => ({
    fontWeight:
        personName.indexOf(name) === -1
            ? "400"
            : "500",
});

const SelectMultiple = ({list, data, setData, title}) => {
    const handleChange = (event) => {
        if (!setData) return;
        const {
            target: {value},
        } = event;
        const resultArray = typeof value === 'string' ? value.split(',') : value;
        setData(resultArray);
    };


    return (
        <Select
            multiple
            value={data}
            onChange={handleChange}
            input={<OutlinedInput label={title}/>}
            renderValue={(selected) => (
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                    {selected.map((value) => (
                        <Chip key={value} label={value}/>
                    ))}
                </Box>
            )}
            MenuProps={MenuProps}
        >
            {list.map((name) => (
                <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, data)}
                >
                    {name}
                </MenuItem>
            ))}
        </Select>
    );
};

export default SelectMultiple;
