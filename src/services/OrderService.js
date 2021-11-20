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
                        ...values,
                        status: "missing",
                        author: uid,
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
}

export default OrderService;