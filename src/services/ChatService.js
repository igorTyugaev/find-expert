import {analytics, auth, firestore} from "../firebase";

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

        });
    };

    static getMessages = (channelId) => {
        return new Promise((resolve, reject) => {
            if (!channelId) {
                reject(new Error("No channel id"));
                return;
            }

            const collectionReference = firestore.collection("channels");
            const onMessage = collectionReference
                .doc(channelId)
                .collection("messages")
                .orderBy("timestamp", "asc")
            resolve(onMessage);
        });
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

    static getChannelAsExpert = (orderId) => {
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
}

export default ChatService;
