import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import ScrollableFeed from "react-scrollable-feed";
import {IconButton, styled, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import firebase, {firestore} from "../../firebase";
import Messages from "./Messages";
import ChatCard from "../ChatCard";
import ChatService from "../../services/ChatService";
import OrderService from "../../services/OrderService";

const DialogWrapper = styled('div')(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flex: "1 1 auto",
    height: "100%"
}));

const MessageForm = styled('form')(({theme}) => ({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "primary",
    borderRadius: "5px",
    padding: "0.5em 1em",
    borderTop: "1px solid #c4c4c4",
    borderTopLeftRadius: "0",
    borderTopRightRadius: "0",
}));

const MessageInput = styled(TextField)(({theme}) => ({
    flex: "20 1 auto",
}));

const MessageBtnSubmit = styled(IconButton)(({theme}) => ({
    marginLeft: "0.5em",
    flex: "1 0 auto",
    borderRadius: "0.24em"
}));

const Dialog = ({chatId, user, userData, openSnackbar}) => {
    const history = useHistory();
    const canGoBack = history.action !== 'POP';

    const [channelName, setChannelName] = useState("");
    const [actionStatus, setActionStatus] = useState("");
    const [userNewMsg, setUserNewMsg] = useState("");

    const sendMsg = (e) => {
        e.preventDefault();
        if (actionStatus === "completed") {
            openSnackbar("Сделка уже закрыта!");
            return;
        }

        if (userNewMsg && chatId) {
            if (userData) {
                const displayName = userData?.fullName;
                const imgUrl = userData.avatar;
                const uid = user.uid;
                const postImg = null;

                const obj = {
                    text: userNewMsg,
                    timestamp: firebase.firestore.Timestamp.now(),
                    userImg: imgUrl ? imgUrl : null,
                    userName: displayName ? displayName : "Профиль не заполнен",
                    uid: uid,
                    postImg: postImg,
                };


                firestore.collection("channels")
                    .doc(chatId)
                    .collection("messages")
                    .add(obj)
                    .then((res) => {
                        console.log("message sent");
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                firestore.collection("channels")
                    .doc(chatId)
                    .update({
                        text: userNewMsg,
                        avatar: imgUrl ? imgUrl : null,
                        userName: displayName ? displayName : "Don't have a display name",
                        uid: uid,
                    })
                    .then((res) => {
                        console.log("message sent");
                    })
                    .catch((err) => {
                        console.log(err);
                    });

            }

            setUserNewMsg("");
        }
    };

    const handleKeyDown = (event) => {
        if (!event) {
            return;
        }

        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return;
        }

        const key = event.key;

        if (!key) {
            return;
        }

        if (key === "Enter") {
            sendMsg(event);
        }
    };

    useEffect(() => {
        ChatService.getChannelById(chatId)
            .then((data) => {
                console.log(data)
                if (!data) return;
                data.channelName && setChannelName(data?.channelName);
                data.status && setActionStatus(data?.status);
            })
            .catch((err) => {
                console.log(err?.message)
            })
    }, [])

    const useItems = () => {
        const [allMessages, setAllMessages] = useState([]);

        useEffect(() => {
            if (!chatId) return;
            const unsubscribe = ChatService
                .getMessages(chatId)
                .onSnapshot((snapshot) => {
                    const items = snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()}));
                    console.log(items)
                    setAllMessages(items);
                }, (error) => {
                    const message = error?.message;
                    openSnackbar(message);
                })
            return () => unsubscribe();
        }, [chatId])
        return allMessages;
    }
    const allMessages = useItems();

    return (
        <ChatCard
            title={channelName || "channelName"}
            btnTitle={canGoBack ? "Назад" : "Мои заказы"}
            btnHandler={canGoBack ? history.goBack : () => history.push("/")}>
            <DialogWrapper>
                <ScrollableFeed>
                    <div style={{padding: "0 1em"}}>
                        {allMessages.map((message) => (
                            <Messages
                                key={message.id}
                                values={message.data}
                                msgId={message.id}
                                user={user}
                                userData={userData}
                            />
                        ))}
                    </div>
                </ScrollableFeed>
                <MessageForm
                    autoComplete="off"
                    onSubmit={(e) => sendMsg(e)}
                    onKeyDown={(e) => handleKeyDown(e)}>

                    <MessageInput
                        required
                        id="outlined-basic"
                        label="Введите сообщение"
                        variant="outlined"
                        multiline
                        rows={1}
                        value={userNewMsg}
                        onChange={(e) => {
                            setUserNewMsg(e.target.value);
                        }}
                    />
                    <MessageBtnSubmit type="submit" variant="contained">
                        <SendIcon/>
                    </MessageBtnSubmit>
                </MessageForm>
            </DialogWrapper>
        </ChatCard>
    )
}

export default Dialog;
