import React from 'react';
import {useHistory} from "react-router-dom";
import {Button, Chip, styled, Typography} from "@mui/material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DateRangeIcon from '@mui/icons-material/DateRange';
import {useAppContext} from "../../AppContext";
import ChatService from "../../services/ChatService";
import UserService from "../../services/UserService";


const ItemInner = styled('div')(({theme}) => ({
    display: "inline-flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "calc(100% + 1em)",
    margin: "-1em 0 0 -1em",
    padding: "1em",
    borderBottom: "1px solid #c4c4c4",
}));

const ItemContentCol = styled('div')(({theme}) => ({
    flex: "4 1 480px",
    display: "flex",
    flexDirection: "column",
    margin: "1em 0 0 1em"
}));

const ItemActionsCol = styled('div')(({theme}) => ({
    flex: "1 0 120px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: "1em 0 0 1em",
}));

const ItemHeader = styled('div')(({theme}) => ({
    display: "inline-flex",
    flexWrap: "wrap",
    width: "calc(100% + .6em)",
    margin: "-.6em 0 0 -.6em"
}));

const BadgeHeader = styled(Chip)(({theme}) => ({
    margin: ".6em 0 0 .6em",
    padding: ".5em"
}));

const ItemBody = styled('div')(({theme}) => ({
    width: '100%',
    display: "flex",
    flexDirection: "column",
    marginTop: "0.5em",
    marginBottom: "auto",
}));

const BadgeAction = styled(Chip)(({theme}) => ({
    display: "flex",
    justifyContent: "center",
    width: '100%',
    padding: "1em",
    marginTop: "0.5em",
    color: "black",
    fontSize: "1.2em",
    fontWeight: "bold",
}));

const ItemFooter = styled('div')(({theme}) => ({
    width: '100%',
    display: "flex",
    marginTop: "1em"
}));

/**
 *
 * @param {{
 * order: {
 *  id: string,
 *  status: "open" | "completed",
 *  budget: string,
 *  deadline: Date,
 *  title: "Changing the semantic element",
 *  description: string, responses: string[]
 * }}}
 * param0
 * @returns
 */
const OrdersListItem = ({order}) => {
    const appContext = useAppContext();
    const history = useHistory();
    // Properties
    const {user, userData} = appContext;
    const existChat = userData?.responses?.includes(order?.orderId);
    // Functions
    const {openSnackbar} = appContext;

    const handlerClick = () => {
        const orderId = order?.orderId;
        if (!orderId) return;
        history.push(`/order/${orderId}`);
    }

    const handlerCreateChanel = () => {
        ChatService.createChannel(order, userData)
            .then((chatId) => {
                if (!chatId) return;
                history.push(`/chat/${chatId}`);
            });
    }

    const addOrderToProfile = () => {
        UserService.addOrderIdToUser(order?.orderId)
            .then(() => {
                handlerCreateChanel();
            })
            .catch((error) => {
                const message = error?.message;
                openSnackbar(message);
            })
    }

    const handlerRespond = () => {
        if (existChat) {
            const orderId = order?.orderId;
            if (!orderId) return;
            history.push(`/chat/${orderId + user.uid}`);
        } else
            addOrderToProfile();
    }

    return (
        <ItemInner>
            <ItemContentCol>
                <ItemHeader>
                    {order?.services?.map((item) => (
                        <BadgeHeader label={item} size="small"/>
                    ))}
                </ItemHeader>
                <ItemBody>
                    <Typography variant="h6" component="h3">
                        {order?.title}
                    </Typography>
                    <Typography sx={{marginTop: "0.2em"}} variant="p" component="p">
                        {order?.description}
                    </Typography>
                </ItemBody>
                <ItemFooter>
                    <Button variant="outlined" onClick={handlerClick}>
                        Подробнее
                    </Button>
                </ItemFooter>
            </ItemContentCol>
            <ItemActionsCol>
                <Button variant="contained" color="primary" onClick={handlerRespond}>
                    {existChat ? "Перейти в чат" : "Откликнуться"}
                </Button>
                <BadgeAction icon={<LocalOfferIcon/>} label={order?.budget} variant="outlined"/>
                <BadgeAction icon={<DateRangeIcon/>} label={order?.deadline} variant="outlined"/>
            </ItemActionsCol>
        </ItemInner>
    );
};

export default OrdersListItem;
