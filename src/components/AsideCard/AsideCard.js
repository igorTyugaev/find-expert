import React from 'react';
import {Card, styled, Typography} from "@mui/material";

const CardWrapper = styled(Card)(({theme}) => ({
    width: '100%',
    display: "flex",
    flexDirection: "column"
}));
const CardHeader = styled('div')(({theme}) => ({
    width: '100%',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1em",
    borderBottom: "1px solid #c4c4c4",
    minHeight: "70px"
}));
const CardBody = styled('div')(({theme}) => ({
    width: '100%',
    display: "flex",
    flexDirection: "column",
    padding: "0 1em 0.5em",
}));
const AsideCard = ({children, title}) => {
    return (
        <CardWrapper>
            <CardHeader>
                <Typography variant="h6" component="h3">
                    {title || "AsideCard"}
                </Typography>
            </CardHeader>
            <CardBody>
                {children}
            </CardBody>
        </CardWrapper>
    );
};

export default AsideCard;
