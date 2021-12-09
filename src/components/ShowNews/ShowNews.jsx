import React from 'react';
import {Link} from "react-router-dom";
import {Box, Button, Typography, styled} from "@mui/material";

const ShowCaseContainer = styled(Box)(({theme}) => ({
    display: 'block',
    width: '100%',
    marginTop: theme.spacing(6)
}));

const ShowCaseHeader = styled(Box)(({theme}) => ({
    display: 'flex',
    width: '100%',
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(3),
}));

const ShowCaseTitle = styled(Typography)(({theme}) => ({
    fontWeight: 'bold'
}));

const ShowCaseBody = styled(Box)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4)
}));

const ShowNews = ({children, title = "", moreBtnLink = "", moreBtnText = ""}) => {
    return (
        <ShowCaseContainer>
            <ShowCaseHeader>
                <ShowCaseTitle variant='h5' component='h3'>{title}</ShowCaseTitle>
                {moreBtnText &&
                <Button variant="outlined" size="small" component={Link} to={moreBtnLink}>
                    {moreBtnText}
                </Button>}
            </ShowCaseHeader>
            <ShowCaseBody>
                {children}
            </ShowCaseBody>
        </ShowCaseContainer>
    );
};

export default ShowNews;
