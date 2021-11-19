import React, {forwardRef} from 'react';
import {FormControl, TextField} from "@mui/material";
import SelectField from "../SelectField";
import DateField from "../DateField";

const InputByType = forwardRef(({...props},
                                ref
) => {
    const {
        label,
        value,
        onChange = null,
        options,
        fullWidth = true,
        type = "text",
        ...propsInput
    } = props;
    switch (type) {
        case 'select':
            return <FormControl fullWidth={fullWidth}>
                <SelectField label={label}
                             value={value}
                             options={options}
                             onChange={onChange}
                             {...propsInput}
                             ref={ref}
                />
            </FormControl>
        case 'date':
            return <DateField ref={ref} label={label} value={value}
                              onChange={onChange} fullWidth={fullWidth}
                              {...propsInput}/>
        default:
            return <TextField inputRef={ref} {...props}/>
    }
});

export default InputByType;
