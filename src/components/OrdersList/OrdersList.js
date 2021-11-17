import * as React from 'react';
import {useHistory} from "react-router-dom";
import {Box, Button, styled, Typography} from "@mui/material";
import OrdersListItem from "../OrdersListItem";

const ListWrapper = styled('div')(({theme}) => ({
    width: '100%',
    display: "flex",
    flexDirection: "column"
}));
const ListHeader = styled('div')(({theme}) => ({
    width: '100%',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1em",
    borderBottom: "1px solid #c4c4c4",
    minHeight: "70px"
}));
const ListBody = styled('div')(({theme}) => ({
    width: '100%',
    display: "flex",
    flexDirection: "column"
}));

const orders = [
    {
        id: 1,
        status: "draft",
        budget: "$3252",
        deadline: "11/12/21",
        title: "Changing the semantic element",
        description: "It's important to realize that the style of a typography component is independent from the semantic underlying element."
    },
    {
        id: 2,
        status: "open",
        budget: "$3252",
        deadline: "11/12/21",
        title: "Changing the semantic element",
        description: "It's important to realize that the style of a typography component is independent from the semantic underlying element."
    },
    {
        id: 3,
        status: "complite",
        budget: "$3252",
        deadline: "11/12/21",
        title: "Changing the semantic element",
        description: "It's important to realize that the style of a typography component is independent from the semantic underlying element."
    }
]

const OrdersList = ({role}) => {
    const history = useHistory();
    const handlerMyOrder = () => {
        history.push('/');
    }

    return (
        <ListWrapper>
            <ListHeader>
                <Box>
                    <Typography variant="h6" component="h3">
                        Заказы, которые соответствуют вашему профилю
                    </Typography>
                    <Typography color="#616161" variant="body1" component="span">
                        Выберите интересующий заказ и нажиме "Откликнуться"
                    </Typography>
                </Box>
                <Button variant="outlined" onClick={handlerMyOrder}>
                    Активные заказы
                </Button>
            </ListHeader>
            <ListBody>
                {/* TODO: Сделать заглушку, если список пустой */}
                {/* TODO: Показывать заглушку для эксперта, если он не заполнил профиль*/}
                {orders.map((order) => (
                    <OrdersListItem order={order} key={order.id}/>
                ))}
            </ListBody>
        </ListWrapper>
    );
}

export default OrdersList;
