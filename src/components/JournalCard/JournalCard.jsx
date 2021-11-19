import React from 'react';
import {Box, styled, Typography} from "@mui/material";

const JournalCardContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const JournalCardAvatar = styled('img')(({theme}) => ({
    width: theme.spacing(12),
    height: theme.spacing(12),
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    margin: '0 auto',
    marginBottom: theme.spacing(1),
}));

const JournalCard = () => {
    return (
        <JournalCardContainer>
            <JournalCardAvatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg"/>
            <Typography variant="h6" component="h3">National geographic</Typography>
            <Typography variant="body1" component="span">59 публикаий</Typography>
        </JournalCardContainer>
    );
};

export default JournalCard;
