import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import useSWR, {mutate} from "swr";
import "./ArticlesDashboardPage.css";
import Loader from "../../components/Loader";
import {useAppContext} from "../../AppContext";
import {firestore} from "../../firebase";
import {
    Avatar,
    Button, Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar, ListItemButton,
    ListItemText,
    Stack,
    TextField
} from "@mui/material";
import BaseCard from "../../components/BaseCard";
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';

const getUserFiles = async (userId) => {
    const doc = await firestore.collection("articles").doc(userId).get();

    if (doc.exists) {
        console.log("User found in database");
        const snapshot = await firestore
            .collection("articles")
            .doc(doc.id)
            .collection("files")
            .get();

        let userFiles = [];
        snapshot.forEach((file) => {
            let {name, content} = file.data();
            userFiles.push({id: file.id, name: name, content: content});
        });
        return userFiles;
    } else {
        console.log("User not found in database, creating new entry...");
        firestore.collection("articles").doc(userId).set({});
        return [];
    }
};

const createFile = async (userId, fileName) => {
    let res = await firestore.collection("articles").doc(userId).collection("files").add({
        name: fileName,
        content: "",
    });
    return res;
};

const deleteFile = async (userId, fileId) => {
    let res = await firestore
        .collection("articles")
        .doc(userId)
        .collection("files")
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
    const {data, error} = useSWR(userId, getUserFiles);

    useEffect(() => {
        if (!user) {
            history.push("/")
        }
    }, [user]);

    if (error) return <p>Ошибка загрузки данных!</p>;
    else if (!data) return <Loader/>;
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
                        mutate(userId);
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
                    {data.map((file) => (
                        <ListItemButton sx={{border: "1px solid #c4c4c4", borderRadius: "0.25em"}} component={Link}
                                        to={`/editor/${file.id}`}
                                        key={file.id}>

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
                                            deleteFile(userId, file.id).then(() => mutate(userId));
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
