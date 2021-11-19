import React, {forwardRef} from 'react';
import PropTypes from "prop-types";
import {Typography} from "@mui/material";
import InputByType from "../InputByType";

const Field = forwardRef(({
                              subtitle,
                              ...props
                          }, ref) => {
    return (
        <div>
            <Typography variant="h6" component="h3">
                {props?.title}
            </Typography>
            <Typography sx={{marginBottom: "1em"}} variant="body1" component="p" color="gray">
                {subtitle}
            </Typography>
            <InputByType {...props} ref={ref}/>
        </div>
    );
});

Field.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    options: PropTypes.array,
    fullWidth: PropTypes.bool,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    multiline: PropTypes.bool,
    multiple: PropTypes.bool,
    error: PropTypes.bool,
    helperText: PropTypes.string,
};

export default Field;
