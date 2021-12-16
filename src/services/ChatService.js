import {analytics, auth, firestore} from "../firebase";
import UserService from "./UserService";

class ChatService {
    static addChannelOrder = (order, userData) => {
        return new Promise((resolve, reject) => {
            if (!order) {
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

            const collectionReference = firestore.collection("channels");

            collectionReference
                .where("orderId", "==", order.id)
                .where("members", "array-contains", uid)
                .get()
                .then(snapshot => {
                    if (snapshot && snapshot.docs && snapshot.docs.length > 0)
                        return resolve(snapshot.docs[0].id);
                    else
                        createChannel()
                }, (error) => {
                    return reject(new Error("Check failure"));
                })

            function createChannel() {
                collectionReference
                    .add({
                        orderId: order.id,
                        channelName: order.name ? order.name : "Dialog",
                        members: [uid, order.author],
                        avatar: currentUser.photoURL,
                        userName: userData && userData.fullName ? userData.fullName : null,
                        status: 'request_order',
                    })
                    .then((res) => {
                        analytics.logEvent("add_channel");
                        resolve(res.id);
                    })
                    .catch((reason) => {
                        reject(reason);
                    });
            }

            function addStatusChannel(userId) {
                collectionReference
                    .doc(userId)
                    .collection("actions")
                    .doc(uid)
                    .set({
                        status: "out_intent",
                    })
                    .then((res) => {
                        analytics.logEvent("add_channel");
                        console.log("Create new channel with id:", res.id)
                        resolve(res.id);
                    })
                    .catch((reason) => {
                        reject(reason);
                    });
            }

        });
    };

    static createChannel = (order, userData) => {
        return new Promise((resolve, reject) => {
            if (!order) {
                reject(new Error("No order"));
                return;
            }

            const orderId = order?.orderId;

            if (!orderId) {
                reject(new Error("No order id"));
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

            const collectionReference = firestore.collection("channels");
            const chatId = orderId + uid;
            collectionReference.doc(chatId)
                .set({
                    orderId,
                    channelName: `Обсуждение заказа ${order?.orderId}`,
                    members: [uid, order.author],
                    avatar: currentUser.photoURL,
                    userName: userData && userData.fullName ? userData.fullName : null,
                    status: 'request_order',
                })
                .then((res) => {
                    analytics.logEvent("add_channel");
                    resolve(chatId);
                })
                .catch((reason) => {
                    reject(reason);
                });

        });
    };

    static getMessages = (channelId) => {
        const collectionReference = firestore.collection("channels");
        const onMessage = collectionReference
            .doc(channelId)
            .collection("messages")
            .orderBy("timestamp", "asc")
        return onMessage;
    }

    static getChannelAsAuthor = (orderId, expertId) => {
        return new Promise((resolve, reject) => {
            if (!orderId) {
                reject(new Error("No order id"));
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

            const collectionReference = firestore.collection("channels");

            collectionReference
                .where("members", "array-contains", uid)
                .where("members", "array-contains", expertId)
                .get()
                .then((snapshot) => {
                    resolve(snapshot.data());
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    };

    static getChannelAsExpert = () => {
        return new Promise((resolve, reject) => {
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

            const collectionReference = firestore.collection("channels");

            collectionReference
                .where("members", "array-contains", uid)
                // .where("members", "array-contains", expertId)
                .onSnapshot((snapshot) => {
                    const listItems = snapshot.docs
                        .map(doc => ({
                            channelId: doc.id,
                            ...doc.data(),
                        }))
                    resolve(listItems[0]);
                }, (error) => {
                    reject(error)
                })
        });
    };

    static getChannelById = (chatId) => {
        return new Promise((resolve, reject) => {
            if (!chatId) {
                reject(new Error("No chat id"));
                return;
            }

            const collectionReference = firestore.collection("channels");

            collectionReference
                .doc(chatId)
                .onSnapshot((snapshot) => {
                    const data = snapshot.data();
                    resolve(data);
                }, (error) => {
                    reject(error)
                })
        });
    };
}

export default ChatService;
