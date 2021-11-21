import React from 'react';
import {useAppContext} from "../../AppContext";
import Dialog from "../../components/Chat/Dialog";
import {useParams} from "react-router-dom";

const ChatPage = () => {
    const appContext = useAppContext();
    const {orderId} = useParams();
    // Properties
    const {user, userData, theme} = appContext;
    // Functions
    const {openSnackbar} = appContext;

    return (
        <div>
            <Dialog orderId={orderId} theme={theme} user={user} userData={userData} openSnackbar={openSnackbar}/>
        </div>
    );
};

export default ChatPage;
