import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import "./ArticlesDashboardPage.css";
import Loader from "../../components/Loader";
import {useAppContext} from "../../AppContext";
import {firestore} from "../../firebase";
import {
    Avatar,
    Button,
    IconButton,
    ListItemAvatar, ListItemButton,
    ListItemText,
    Stack,
    TextField
} from "@mui/material";
import BaseCard from "../../components/BaseCard";
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import ArticlesService from "../../services/articlesService";

const createFile = async (userId, fileName) => {
    let res = await firestore
        .collection("articles")
        .add({
            name: fileName,
            content: "",
            author: userId
        });
    return res;
};

const deleteFile = async (fileId) => {
    let res = await firestore
        .collection("articles")
        .doc(fileId)
        .delete();
    return res;
};

const ArticlesDashboardPage = () => {
    const appContext = useAppContext();
    const history = useHistory();
    // Properties
    const {user, userData} = appContext;
    // Functions
    const {openSnackbar} = appContext;
    const userId = user?.uid;
    const [nameValue, setNameValue] = useState("");

    useEffect(() => {
        if (!user) {
            history.push("/")
        }
    }, [user]);

    const useItems = () => {
        const [articles, setArticles] = useState([]);

        useEffect(() => {
            const unsubscribe = ArticlesService
                .getArticles()
                .where("author", "==", userId)
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
            <BaseCard title="Ваши статьи"
                      description="Выберите статью или создайте новую"
                      isPaddingBody>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (nameValue) {
                        setNameValue("");
                        createFile(userId, nameValue);
                    }
                }}
                      className=" new-file-form"
                >
                    <Stack direction="row" spacing={2}>
                        <TextField
                            sx={{flex: "5"}}
                            type="text"
                            fullWidth
                            placeholder="Название вашей новой статьи..."
                            value={nameValue}
                            onChange={(e) => setNameValue(e.target.value)}
                        />
                        <Button sx={{flex: "1"}} variant="outlined" type="submit">
                            Создать
                        </Button>
                    </Stack>
                </form>

                <Stack spacing={1} sx={{marginTop: "1em"}}>
                    {articles.map((file) => (
                        <ListItemButton sx={{border: "1px solid #c4c4c4", borderRadius: "0.25em"}} component={Link}
                                        to={`/editor/${file.articleId}`}
                                        key={file.articleId}>

                            <ListItemAvatar>
                                <Avatar>
                                    <ArticleIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={file?.name}/>
                            <IconButton edge="end" aria-label="delete"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            deleteFile(file.articleId)
                                        }}>
                                <DeleteIcon/>
                            </IconButton>
                        </ListItemButton>
                    ))}
                </Stack>
            </BaseCard>
        );
    }
};

export default ArticlesDashboardPage;
