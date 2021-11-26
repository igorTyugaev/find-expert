import {firestore} from "../firebase";

class ArticlesService {
    static getArticles = () => {
        const collectionReference = firestore.collection("articles");
        const onArticles = collectionReference
        return onArticles;
    };
}

export default ArticlesService;
