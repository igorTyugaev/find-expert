import React, {useState, useEffect} from "react";
import useSWR from "swr";
import {useHistory, useParams} from "react-router-dom";
import {firestore} from "../../firebase";
import MarkdownEditor from "rich-markdown-editor";
import {useAppContext} from "../../AppContext";
import Loader from "../../components/Loader";
import BaseCard from "../../components/BaseCard";

const getFile = async (articleId) => {
    const doc = await firestore
        .collection("articles")
        .doc(articleId)
        .get();

    return doc.data();
};

const ArticlePage = () => {
    const appContext = useAppContext();
    const history = useHistory();
    // Functions
    const {openSnackbar} = appContext;

    const {articleId} = useParams();

    const {data: file, error} = useSWR([articleId], getFile);
    const [value, setValue] = useState(null);


    useEffect(() => {
        if (file !== undefined && value === null) {
            console.log("Set initial content");
            setValue(file.content);
        }
    }, [file, value]);


    if (error) return <p>У нас возникла проблема при получении данных</p>;
    else if (!file) return <Loader/>;
    else {
        return (
            <BaseCard title={file.name}
                      btnTitle="Все статьи"
                      isPaddingBody
                      btnHandler={() => history.push("/articles")}>
                <MarkdownEditor
                    readOnly
                    defaultValue={file.content}
                    onShowToast={(message) => openSnackbar(message)}
                />
            </BaseCard>
        );
    }
};

export default ArticlePage;
