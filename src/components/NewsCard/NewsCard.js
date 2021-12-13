import React from 'react';
import {Box, Card, CardContent, CardMedia, styled, Typography} from "@mui/material";

const CardWrapper = styled(Card)(({theme}) => ({
    display: "flex",
    width: "100%",
    "@media screen and (max-width: 980px)": {
        flexDirection: "column"
    }
}));

const CardImg = styled(CardMedia)(({theme}) => ({
    display: "flex",
    flex: "0 1 auto",
    width: "auto",
    maxWidth: "30%",
    "@media screen and (max-width: 980px)": {
        maxWidth: "100%",
    }
}));

const CardBox = styled(CardContent)(({theme}) => ({
    display: "flex",
    flexDirection: 'column',
    flex: "1 1 auto"
}));

const NewsCard = ({img, title, description, isSmall}) => {
    if (isSmall) return (
        <CardBox>
            <Typography component="h3" variant="h5">
                {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="p">
                {`${description?.slice(0, 360)}...`}
            </Typography>
        </CardBox>
    )

    return (
        <CardWrapper>
            {!isSmall && <CardImg
                component="img"
                image={img}
                alt={title}
            />}
            <CardBox>
                <Typography component="h3" variant="h5">
                    {title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="p">
                    {`${description?.slice(0, 380)}...`}
                </Typography>
            </CardBox>
        </CardWrapper>
    );
};

export default NewsCard;
