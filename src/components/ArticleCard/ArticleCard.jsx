import * as React from 'react';
import {useHistory} from "react-router-dom";
import {Rating, Typography, Button, Card, CardContent, CardMedia, CardActions} from "@mui/material";

const ArticleCard = ({articleId, name, content}) => {
    const history = useHistory();

    function stripMarkdown(text) {
        return String(text).replace(/__|\*|\#|(?:\[([^\]]*)\]\([^)]*\))/gm, '$1');
    }

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
                    {name?.toLowerCase()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {stripMarkdown(content?.slice(0, 90) || "")}...
                </Typography>
            </CardContent>
            <CardActions sx={{justifyContent: "space-between", marginTop: "auto", alignSelf: "flex-end"}}>
                <Rating name="read-only" value={4} readOnly/>
                <Button variant="outlined" size="small" onClick={() => {
                    history.push(`/article/${articleId}`)
                }}>Подробнее</Button>
            </CardActions>
        </Card>
    );
}

export default ArticleCard;
