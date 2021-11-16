import React from "react";

import {CircularProgress, styled} from "@mui/material";

const CircularProgressWrapper = styled('div')(({theme}) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
}));

const LaunchScreen = () => {

    return (
        <CircularProgressWrapper>
            <CircularProgress/>
        </CircularProgressWrapper>
    );
}

export default LaunchScreen;
