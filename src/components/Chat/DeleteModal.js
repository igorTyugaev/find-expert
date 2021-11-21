import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

function DeleteModal({msgId, text, deleteMsg, handleModal, postImg, title}) {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        handleModal();
    };

    const handleDelete = () => {
        deleteMsg(msgId);
        handleModal();
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title ? title : "Вы уверены, что хотите удалить сообщение?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-description"
                        style={{fontSize: "1.2rem"}}
                    >
                        {text}
                    </DialogContentText>
                    {postImg ? (
                        <img
                            src={postImg}
                            alt="img"
                            style={{height: "200px", width: "250px", borderRadius: "4px"}}
                        />
                    ) : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Отмена
                    </Button>

                    <Button
                        onClick={handleDelete}
                        color="primary"
                        autoFocus
                        variant="contained"
                    >
                        Подтвердить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteModal;
