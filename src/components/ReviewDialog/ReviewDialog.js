import React from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Tooltip,
    IconButton,
    styled, DialogActions, Button,
} from "@mui/material";
import {Close as CloseIcon} from "@mui/icons-material";
import ReviewForm from "../ReviewForm";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function ReviewDialog({onClose, expert, ...dialogProps}) {

    function handleSend() {
        onClose();
    }

    return (
        <BootstrapDialog
            onClose={onClose}
            fullWidth={true}
            maxWidth="sm"
            aria-labelledby="customized-dialog-title"
            {...dialogProps}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
                Оставьте свой отзыв
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <ReviewForm expert={expert} handleSend={handleSend}/>
            </DialogContent>
        </BootstrapDialog>
    );
}

const BootstrapDialogTitle = (props) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

ReviewDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ReviewDialog;
