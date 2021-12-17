import * as React from 'react';
import {useHistory} from "react-router-dom";
import {Rating, Typography, Button, Card, CardContent, CardMedia, CardActions, styled} from "@mui/material";

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

const ArticleCard = ({articleId, name, content}) => {
    const history = useHistory();

    function stripMarkdown(text) {
        return String(text).replace(/__|\*|\#|(?:\[([^\]]*)\]\([^)]*\))/gm, '$1');
    }

    return (
        <Card>
            <CardContent>
                <Title gutterBottom variant="h5" component="h3"
                       sx={{cursor: "pointer"}}
                       onClick={() => history.push(`/article/${articleId}`)}>
                    {name?.toLowerCase()}
                </Title>
                <Description variant="body2" color="text.secondary">
                    {stripMarkdown(content?.slice(0, 90) || "")}...
                </Description>
            </CardContent>
        </Card>
    );
}

export default ArticleCard;
