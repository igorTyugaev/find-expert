import React from 'react';
import {Avatar, Box, Rating, Typography, styled} from "@mui/material";

const AuthorCardContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const AuthorCardAvatar = styled(Avatar)(({theme}) => ({
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: '0 auto',
    marginBottom: theme.spacing(2),
}));

const AuthorCard = () => {
    return (
        <AuthorCardContainer>
            <AuthorCardAvatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg"/>
            <Typography variant="button" component="h3">Анджей Сапковский</Typography>
            <Rating name="read-only" value={4} readOnly/>
        </AuthorCardContainer>
    );
};

export default AuthorCard;
