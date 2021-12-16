import React from 'react';
import {Controller} from "react-hook-form";
import {Rating, Typography} from "@mui/material";

const RatingField = ({name, control, rules, value, onChange, label, helperText, error, ...props}) => {
    return (
        <div>
            <Controller name={name} control={control} rules={rules}
                        render={({field}) => {
                            const value = Number.parseInt(field?.value) || 0;
                            return <Rating {...field} size="large" value={value}/>
                        }}/>
            <Typography variant="body1" component="p" color="#d32f2f">
                {error && "Укажите оценку"}
            </Typography>
        </div>
    );
};

export default RatingField;
