import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import Loader from "../../components/Loader";
import {useAppContext} from "../../AppContext";
import {firestore} from "../../firebase";
import {
    Avatar,
    ListItemAvatar, ListItemButton,
    ListItemText,
    Stack,
} from "@mui/material";
import BaseCard from "../../components/BaseCard";
import ArticleIcon from '@mui/icons-material/Article';
import ArticlesService from "../../services/articlesService";


const ArticlesPage = () => {
    const appContext = useAppContext();
    const history = useHistory();
    // Functions
    const {openSnackbar} = appContext;

    const useItems = () => {
        const [articles, setArticles] = useState([]);

        useEffect(() => {
            const unsubscribe = ArticlesService
                .getArticles()
                .onSnapshot((snapshot) => {
                    const items = snapshot.docs
                        .map(doc => ({
                            articleId: doc.id,
                            ...doc.data(),
                        }));
                    setArticles(items);
                }, (error) => {
                    const message = error?.message;
                    openSnackbar(message);
                })
            return () => unsubscribe();
        }, [])
        return articles;
    }
    const articles = useItems();

    if (!articles) return <Loader/>;
    else {
        return (
            <BaseCard title="Все статьи"
                      isPaddingBody>
                <Stack spacing={1} sx={{marginTop: "1em"}}>
                    {articles.map((file) => (
                        <ListItemButton sx={{border: "1px solid #c4c4c4", borderRadius: "0.25em"}}
                                        component={Link}
                                        to={`/article/${file.articleId}`}
                                        key={file.articleId}>
                            <ListItemAvatar>
                                <Avatar>
                                    <ArticleIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={file?.name}/>
                        </ListItemButton>
                    ))}
                </Stack>
            </BaseCard>
        );
    }
};

export default ArticlesPage;
