import React from 'react';
import {useHistory} from "react-router-dom";
import {Card, Container, styled} from "@mui/material";
import {useAppContext} from "../../AppContext";
import AsideCard from "../../components/AsideCard";
import BaseCard from "../../components/BaseCard";
import DashboardListItem from "../../components/DashboardListItem";

const DashboardWrapper = styled('div')(({theme}) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "calc(100% + 1em)",
    margin: "-1em 0 0 -1em",
}));

const DashboardOrders = styled(Card)(({theme}) => ({
    margin: "1em 0 0 1em",
    flex: "1 1 calc(60% - 1em)",
}));

const DashboardAside = styled('div')(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    margin: "1em 0 0 1em",
    flex: "1 1 calc(40% - 1em)",
    minWidth: "320px",
}));

const DashboardAsideItem = styled('div')(({theme}) => ({
    "&:not(:first-of-type)": {
        marginTop: "1em",
    }
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
/**
 * Выполнять переадресацию в зависимости от роли и статуса заказа
 * Автор:
 * - Требуеться выбрать эксперта (FindExpertPage) - missing
 * - Требуеться выбрать эксперта (ChatOrder) - working
 */
const DashboardPage = () => {
    const appContext = useAppContext();
    const history = useHistory();

    // Properties
    const {user, userData} = appContext;
    const role = userData?.role?.toLowerCase();
    const handlerNewOrder = () => {
        if (role === 'author') {
            history.push('/order-form');
        } else {
            history.push('/find-order');
        }
    }
    const handlerOrder = (orderId) => {
        history.push(`/order/${orderId}`);
    }

    return (
        <DashboardWrapper>
            <DashboardOrders>
                <BaseCard
                    title="Ваши заказы"
                    btnTitle={role === 'author' ?
                        "Запросить услугу" :
                        "Новый заказ"}
                    btnHandler={handlerNewOrder}>
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
                                           handlerOrder={handlerOrder}
                        />
                    ))}
                </BaseCard>
            </DashboardOrders>
            <DashboardAside>
                <DashboardAsideItem>
                    <AsideCard title="Ваша статистика">
                        <ol>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                        </ol>
                    </AsideCard>
                </DashboardAsideItem>
                <DashboardAsideItem>
                    <AsideCard title="Популярные темы в этом мес.">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur at corporis
                            dignissimos
                            dolorum
                            eius facilis iure labore minima molestiae mollitia quaerat quam quia, quo quos,
                            recusandae
                            saepe
                            voluptas, voluptatem. Cumque.
                        </p>
                    </AsideCard>
                </DashboardAsideItem>
                <DashboardAsideItem>
                    <AsideCard title="Лучшие по вашей области">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur at corporis
                            dignissimos
                            dolorum
                            eius facilis iure labore minima molestiae mollitia quaerat quam quia, quo quos,
                            recusandae
                            saepe
                            voluptas, voluptatem. Cumque.
                        </p>
                    </AsideCard>
                </DashboardAsideItem>
            </DashboardAside>
        </DashboardWrapper>
    );
};

export default DashboardPage;
