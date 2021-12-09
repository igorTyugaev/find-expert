import React from 'react';
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import {styled} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


const CardImg = styled(CardMedia)(({theme}) => ({
    padding: theme.spacing(4),
    objectFit: "contain"
}));

const ServiceCard = ({img, title, description}) => {
    return (
        <Card>
            <CardImg
                component="img"
                height="140"
                image={img}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

ServiceCard.propTypes = {
    img: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default ServiceCard;
