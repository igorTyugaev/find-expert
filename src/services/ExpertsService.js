import {firestore} from "../firebase";

export class ExpertsService {
    static findExpertsByOrderId = (orderId) => {
        const collectionReference = firestore.collection("users");
        const onUsers = collectionReference
            .where("responses", "array-contains", orderId)
        return onUsers;
    };

    static getAllExperts = () => {
        const collectionReference = firestore.collection("users")
            .where("role", "==", "expert");
        const onUsers = collectionReference
        return onUsers;
    };
}
