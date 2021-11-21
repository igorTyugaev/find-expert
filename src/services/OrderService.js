import {firebaseNames} from "../constants";
import firebase, {analytics, auth, firestore} from "../firebase";

class OrderService {
    static updateOrder = (values, orderId) => {
        return new Promise((resolve, reject) => {
            if (!values) {
                reject(new Error("No values"));
                return;
            }

            const currentUser = auth.currentUser;

            if (!currentUser) {
                reject(new Error("No current user"));
                return;
            }

            const uid = currentUser.uid;

            if (!uid) {
                reject(new Error("No UID"));
                return;
            }

            const collectionReference = firestore.collection("orders");
            const orderDocumentReference = (orderId) ? (collectionReference.doc(orderId)) : (collectionReference.doc());

            if (orderId) {
                orderDocumentReference
                    .update({
                        ...values,
                        author: uid,
                    })
                    .then((value) => {
                        analytics.logEvent("update_order");
                        resolve(value);
                    })
                    .catch((reason) => {
                        reject(reason);
                    });
            } else {
                orderDocumentReference
                    .set({
                        status: "open",
                        author: uid,
                        ...values,
                    })
                    .then((value) => {
                        analytics.logEvent("create");
                        resolve(value);
                    })
                    .catch((reason) => {
                        reject(reason);
                    });
            }
        });
    };


    static getOrders = (subjects) => {
        const collectionReference = firestore.collection("orders");
        const onOrders = collectionReference
            .where("subjects", "array-contains-any", subjects)
        return onOrders;
    };

    /**
     * Поиск заказов по предметным областям.
     * @param {string[]} subjects Все предметные области, которыми владеет эксперт. Массив в selectOptions.js под названием `subjectListRu`.
     * @returns {AsyncGenerator<{id: string, status: "open" | "completed", budget: string, deadline: Date, title: "Changing the semantic element", description: string, responses: string[]}>} Доступные заказы.
     */
    static async* getAllOrdersBySubjects(subjects) {
        const response = await firestore.collection(firebaseNames.collections.orders).get();
        let docs = response.docs;
        for (let doc of docs) {
            if (doc.data().subjects.every(x => subjects.includes(x))) {
                yield {
                    id: doc.id,
                    status: doc.data().status,
                    budget: doc.data().budget,
                    deadline: doc.data().deadline,
                    title: "Changing the semantic element",
                    description: doc.data().description,
                    responses: doc.data().responses
                }
            }
        }
    }
}

export default OrderService;
