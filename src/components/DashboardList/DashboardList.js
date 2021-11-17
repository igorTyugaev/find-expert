import * as React from 'react';
import {useHistory} from "react-router-dom";
import {Button, styled, Typography} from "@mui/material";
import DashboardListItem from "../DashboardListItem";

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

const DashboardList = ({role}) => {
    const history = useHistory();
    const handlerNewOrder = () => {
        if (role === 'author') {
            history.push('/request-service');
        } else {
            history.push('/find-order');
        }
    }

    return (
        <ListWrapper>
            <ListHeader>
                <Typography variant="h6" component="h3">
                    Ваши заказы
                </Typography>
                <Button variant="outlined" onClick={handlerNewOrder}>
                    {role === 'author' ?
                        "Запросить услугу" :
                        "Найти заказы"
                    }
                </Button>
            </ListHeader>
            <ListBody>
                {/* TODO: Сделать заглушку, если список пустой */}
                {/* TODO: Показывать заглушку для эксперта, если он не заполнил профиль*/}
                {orders.map(({id, status, budget, deadline, title, description}) => (
                    <DashboardListItem id={id}
                                       key={id}
                                       status={status}
                                       budget={budget}
                                       deadline={deadline}
                                       title={title}
                                       description={description}
                    />
                ))}
            </ListBody>
        </ListWrapper>
    );
}

export default DashboardList;
