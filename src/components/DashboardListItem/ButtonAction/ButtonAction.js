import React, {useState} from 'react';
import {Button, styled} from "@mui/material";
import {useHistory} from "react-router-dom";
import {useAppContext} from "../../../AppContext";
import OrderService from "../../../services/OrderService";
import ReviewDialog from "../../ReviewDialog";

const Container = styled('div')(({theme}) => ({
    display: "flex",
    gap: "1em",
    flexWrap: "wrap",
    width: "100%"
}));

const BtnItem = styled(Button)(({theme}) => ({
    marginTop: "auto",
    flex: "1 0 auto"
}));

const ButtonAction = ({orderId, status, expert}) => {
    const appContext = useAppContext();
    const history = useHistory();
    // Properties
    const {user, userData} = appContext;
    // Functions
    const {openSnackbar, openDialog} = appContext;
    const role = userData?.role?.toLowerCase();
    const isBusy = status === "busy" && role === "author";
    const isHideReview = status === "completed" && role === "expert";

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseDeal = () => {
        OrderService.updateOrder({status: "completed"}, orderId)
            .then((res) => {

            })
            .catch((err) => {
                console.error(err);
            })
    }

    const handleBtn = () => {
        switch (status) {
            case "open":
                history.push(`/find-expert/${orderId}`);
                break;
            case "busy":
                history.push(`/chat/${orderId + expert}`);
                break;
            case "completed":
                setOpen(true);
                break;
            default:
                return;
        }
    }

    const getTitleBtn = () => {
        switch (status) {
            case "open":
                return "Выбрать испольнителя";
            case "busy":
                return "Перейти к обсуждению";
            case "completed":
                return "Оставить отзыв";
            default:
                return;
        }
    }

    const handlerBtn = () => {
        if (!handleBtn) return;
        handleBtn(orderId);
    }

    return (
        <Container>
            {!isHideReview && <BtnItem variant="outlined" onClick={handlerBtn}>
                {getTitleBtn()}
            </BtnItem>}
            {isBusy &&
            <BtnItem variant="outlined" onClick={handleCloseDeal}>
                Закрыть сделку
            </BtnItem>}
            <ReviewDialog open={open} onClose={handleClose} expert={expert}/>
        </Container>
    );
};

export default ButtonAction;
