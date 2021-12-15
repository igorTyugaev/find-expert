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
            <CardContent>
                <Typography gutterBottom variant="h5" component="h3"
                            sx={{cursor: "pointer"}}
                            onClick={() => history.push(`/article/${articleId}`)}>
                    {name?.toLowerCase()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {stripMarkdown(content?.slice(0, 90) || "")}...
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ArticleCard;
