import React from 'react';
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import {styled} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


const CardImg = styled(CardMedia)(({theme}) => ({
    padding: theme.spacing(2),
    objectFit: "contain",
    objectPosition: "center",
    width: "auto",
    flex: "1 0 15%",
    alignSelf: "center"
}));

const CardWrapper = styled(Card)(({theme}) => ({
    display: "flex",
    flexDirection: "row",

    "@media screen and (max-width: 600px)": {
        flexDirection: "column",
    }
}));

const Content = styled(CardContent)(({theme}) => ({
    flex: "5 1 auto",
}));

const Title = styled(Typography)(({theme}) => ({
    wordBreak: "normal",
    "@media screen and (max-width: 540px)": {
        fontSize: "16px",
    }
}));

const Description = styled(Typography)(({theme}) => ({
    wordBreak: "normal",
    "@media screen and (max-width: 540px)": {
        fontSize: "14px",
    }
}));

const HowItWorksCard = ({img, title, description}) => {
    return (
        <CardWrapper>
            {img && <CardImg
                component="img"
                height="140"
                image={img}
                alt="green iguana"
            />}
            <Content>
                <Title gutterBottom variant="h5" component="div">
                    {title}
                </Title>
                <Description variant="body2" color="text.secondary">
                    {description}
                </Description>
            </Content>
        </CardWrapper>
    );
};

HowItWorksCard.propTypes = {
    img: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default HowItWorksCard;
