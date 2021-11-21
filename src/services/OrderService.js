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

    /**
     * Поиск заказов по предметным областям.
     * @param {string[]} subjects Все предметные области, которыми владеет эксперт. Массив в selectOptions.js под названием `subjectListRu`.
     * @returns {AsyncGenerator<{id: string, status: "open" | "completed", budget: string, deadline: Date, title: "Changing the semantic element", description: string, responses: string[]}>} Доступные заказы.
     */
    static async* getAllOrdersBySubjects(subjects) {
        // yield {
        //     id: 1,
        //     status: "draft",
        //     budget: "$3252",
        //     deadline: "11/12/21",
        //     title: "Changing the semantic element",
        //     description: "It's important to realize that the style of a typography component is independent from the semantic underlying element."
        // }
        // yield {
        //     id: 2,
        //     status: "open",
        //     budget: "$3252",
        //     deadline: "11/12/21",
        //     title: "Changing the semantic element",
        //     description: "It's important to realize that the style of a typography component is independent from the semantic underlying element."
        // }
        // yield {
        //     id: 3,
        //     status: "complite",
        //     budget: "$3252",
        //     deadline: "11/12/21",
        //     title: "Changing the semantic element",
        //     description: "It's important to realize that the style of a typography component is independent from the semantic underlying element."
        // }
        let response = await firestore.collection(firebaseNames.collections.orders).get();
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

    static addMemberToOrder = (orderId) => {
        return new Promise((resolve, reject) => {
            if (!orderId) {
                reject(new Error("No orderId"));
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

            const collectionReference = firestore.collection(firebaseNames.collections.users);
            const orderDocumentReference = collectionReference.doc(uid);

            orderDocumentReference
                .update({
                    responses: firebase.firestore.FieldValue.arrayUnion(orderId)
                })
                .then((value) => {
                    analytics.logEvent("add_member_to_order");
                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };
}

export default OrderService;
