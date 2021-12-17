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
const CardBody = styled('div', {
    shouldForwardProp: (prop) => prop !== "isPadding"
})(({theme, isPadding}) => ({
    width: '100%',
    display: "flex",
    flexDirection: "column",
    padding: isPadding ? "0 1em 0.5em" : 0,
}));

const Title = styled(Typography)(({theme}) => ({
    wordBreak: "normal",
    "@media screen and (max-width: 540px)": {
        fontSize: "16px",
    }
}));

const AsideCard = ({children, title, isPadding = true}) => {
    return (
        <CardWrapper>
            <CardHeader>
                <Title variant="h6" component="h3">
                    {title || "AsideCard"}
                </Title>
            </CardHeader>
            <CardBody isPadding={isPadding}>
                {children}
            </CardBody>
        </CardWrapper>
    );
};

export default AsideCard;
