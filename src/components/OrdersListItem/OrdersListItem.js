import React, { useState } from 'react';
import {Button, Chip, styled, Typography} from "@mui/material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DateRangeIcon from '@mui/icons-material/DateRange';
import OrderService from "../../services/OrderService";
import { useAppContext } from "../../AppContext";

const ItemInner = styled('div')(({theme}) => ({
    display: "inline-flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "calc(100% + 1em)",
    margin: "-1em 0 0 -1em",
    padding: "1em",
    "&:not(:last-child)": {
        borderBottom: "1px solid #c4c4c4"
    }
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
 * @param {{ order: {id: string, status: "open" | "completed", budget: string, deadline: Date, title: "Changing the semantic element", description: string, responses: string[]}}} param0 
 * @returns 
 */
const OrdersListItem = ({order}) => {

    const handlerClick = () => {
        console.log("Choose order id", order?.id);
    }

    let appContext = useAppContext();
    let [userData, setUserData] = useState(appContext.userData);
    let e = async () => {
        await OrderService.addMemberToOrder(order.id);
        userData.responses.push(order.id);
        setUserData(userData);
    }

    return (
        <ItemInner>
            <ItemContentCol>
                <ItemHeader>
                    <BadgeHeader label="Small" size="small"/>
                    <BadgeHeader label="Small" size="small"/>
                    <BadgeHeader label="Small" size="small"/>
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
                {
                    userData.responses.includes(order.id)
                        ? <BadgeAction icon={<LocalOfferIcon />} label={"Ждем ответ автора"} variant="outlined" />
                        : < Button variant="contained" color="primary" onClick={e}>Откликнуться</Button>
                }
                <BadgeAction icon={<LocalOfferIcon/>} label={order?.budget} variant="outlined"/>
                <BadgeAction icon={<DateRangeIcon/>} label={order?.deadline} variant="outlined"/>
            </ItemActionsCol>
        </ItemInner>
    );
};

export default OrdersListItem;
