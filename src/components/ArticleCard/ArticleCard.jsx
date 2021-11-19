import * as React from 'react';
import {Rating, Typography, Button, Card, CardContent, CardMedia, CardActions} from "@mui/material";

const ArticleCard = () => {
    return (
        <Card>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions sx={{justifyContent: "space-between"}}>
                <Rating name="read-only" value={4} readOnly/>
                <Button variant="outlined" size="small">Подробнее</Button>
            </CardActions>
        </Card>
    );
}

export default ArticleCard;
