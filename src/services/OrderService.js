import {analytics, auth, firestore} from "../firebase";

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

    static getOrder = (orderId) => {
        return new Promise((resolve, reject) => {
            if (!orderId) {
                reject(new Error("No order id"));
                return;
            }

            const collectionReference = firestore.collection("orders");
            collectionReference
                .doc(orderId)
                .onSnapshot(
                    (snapshot) => {
                        const data = snapshot.data();
                        if (!snapshot.exists || !data) return;
                        resolve(data);
                    },
                    (error) => {
                        reject(error);
                    }
                );
        });
    };

    static getOrders = (subjects) => {
        const collectionReference = firestore.collection("orders");
        const onOrders = collectionReference
            .where("subjects", "array-contains-any", subjects)
        return onOrders;
    };
}

export default OrderService;
