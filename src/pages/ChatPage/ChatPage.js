import React from 'react';
import {useAppContext} from "../../AppContext";
import Dialog from "../../components/Chat/Dialog";

const ChatPage = () => {
    const appContext = useAppContext();
    // Properties
    const {user, userData, theme} = appContext;
    // Functions
    const {openSnackbar} = appContext;

    return (
        <div>
            <Dialog theme={theme} user={user} userData={userData} openSnackbar={openSnackbar}/>
        </div>
    );
};

export default ChatPage;
