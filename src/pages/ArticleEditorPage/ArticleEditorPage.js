import React, {useState, useEffect} from "react";
import useSWR, {mutate} from "swr";
import {Link, useHistory, useParams} from "react-router-dom";
import {firestore, storage} from "../../firebase";
import MarkdownEditor from "rich-markdown-editor";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./ArticleEditorPage.css";
import {useAppContext} from "../../AppContext";
import Loader from "../../components/Loader";
import {Button, IconButton} from "@mui/material";

const getFile = async (articleId) => {
    const doc = await firestore
        .collection("articles")
        .doc(articleId)
        .get();

    return doc.data();
};


const ArticleEditorPage = () => {
    const appContext = useAppContext();
    const history = useHistory();
    // Properties
    const {user, userData} = appContext;
    // Functions
    const {openSnackbar} = appContext;
    const userId = user?.uid;
    const {articleId} = useParams();

    const {data: file, error} = useSWR([articleId], getFile);
    const [value, setValue] = useState(null);

    useEffect(() => {
        if (!user) {
            history.push("/")
        }
    }, [user]);

    useEffect(() => {
        if (file !== undefined && value === null) {
            console.log("Set initial content");
            setValue(file.content);
        }
    }, [file, value]);

    useEffect(() => {
        if (file && !(file.content === value)) {
            window.addEventListener("beforeunload", onUnload);
        } else {
            window.removeEventListener("beforeunload", onUnload);
        }

        return () => window.removeEventListener("beforeunload", onUnload);
    });

    const onUnload = (event) => {
        event.preventDefault();
        event.returnValue = "У вас есть несохраненные изменения!";
        return "У вас есть несохраненные изменения!";
    };

    const saveChanges = () => {
        firestore.collection("articles")
            .doc(articleId)
            .update({
                content: value,
            });
        mutate([articleId])
            .then(r => openSnackbar("🎉 Ваши изменения были сохранены!"));
    };

    const uploadImage = async (file) => {
        if (!file.size >= 1000000) {
            const doc = await firestore
                .collection("articles")
                .doc(userId)
                .collection("images")
                .add({
                    name: file.name,
                });

            const uploadTask = await storage
                .ref()
                .child(`articles/${userId}/${doc.id}-${file.name}`)
                .put(file);

            return uploadTask.ref.getDownloadURL();
        }
    };

    if (error) return <p>У нас возникла проблема при получении данных</p>;
    else if (!file) return <Loader/>;
    else {
        return (
            <div>
                <header className="editor-header">
                    <IconButton sx={{marginRight: "0.5em"}} onClick={() => history.push("/my-articles")}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <h3>{file.name}</h3>
                    <Button
                        variant="outlined"
                        disabled={file.content === value}
                        onClick={saveChanges}
                        className="save-button"
                    >
                        Сохранить изменения
                    </Button>
                </header>
                <div sx={{margin: "0 1em"}} className="editor">
                    <MarkdownEditor
                        placeholder="Просто начните печатать текст или нажмите '+'"
                        defaultValue={file.content}
                        onChange={(getValue) => {
                            setValue(getValue());
                        }}
                        uploadImage={uploadImage}
                        onShowToast={(message) => openSnackbar(message)}
                    />
                </div>
            </div>
        );
    }
};

export default ArticleEditorPage;
