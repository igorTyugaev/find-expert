import React, {forwardRef, useState} from 'react';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {TextField} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";

const DateField = forwardRef(({label, value, onChange, ...props},
                              ref) => {
    const [innerValue, setInnerValue] = useState(new Date());
    const isSafe = (typeof value === 'undefined') || !onChange;
    const handleChange = (newValue) => {
        if (isSafe) {
            setInnerValue(newValue)
        } else {
            onChange(newValue);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
                label={label}
                inputFormat="MM/dd/yyyy"
                value={isSafe ? innerValue : value}
                onChange={handleChange}
                inputRef={ref}
                renderInput={(params) => <TextField {...params} {...props}/>}
            />
        </LocalizationProvider>
    );
});

export default DateField;
