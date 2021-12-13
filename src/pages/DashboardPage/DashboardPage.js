import React, {useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {Add as AddIcon} from "@mui/icons-material";
import {Box, Card, Fab, Stack, styled, Typography} from "@mui/material";
import {useAppContext} from "../../AppContext";
import AsideCard from "../../components/AsideCard";
import BaseCard from "../../components/BaseCard";
import DashboardListItem from "../../components/DashboardListItem";
import {firestore} from "../../firebase";
import Loader from "../../components/Loader";
import EmptyState from "../../domain/EmptyState";
import {ReactComponent as NotFoundIllustration} from "../../illustrations/not-found.svg";
import UserService from "../../services/UserService";
import AlignItemsList from "../../components/AlignItemsList";
import JournalCard from "../../components/JournalCard/JournalCard";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import AdBlock from "../../components/AdBlock";
import DenseTable from "../../components/DenseTable";
import MyProfileTable from "../../components/MyProfileTable";
import NewsCard from "../../components/NewsCard";
import ShowNews from "../../components/ShowNews";
import NewsService from "../../services/NewsService";
import CarouselPlacement from "../../components/CarouselPlacement/CarouselPlacement";
import CarouselNews from "../../components/CarouselNews";

const DashboardWrapper = styled('div')(({theme}) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "calc(100% + 1em)",
    margin: "-1em 0 0 -1em",
}));

const DashboardOrders = styled('div')(({theme}) => ({
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

/**
 * Выполнять переадресацию в зависимости от роли и статуса заказа
 * Автор:
 * - Требуеться выбрать эксперта (AllExpertPage) - missing
 * - Требуеться выбрать эксперта (ChatOrder) - working
 */
const DashboardPage = () => {
    const [loading, setLoading] = useState(true);
    const [expertProfileCompletion, setExpertLoading] = useState(false);
    const appContext = useAppContext();
    const history = useHistory();
    // Properties
    const {user, userData} = appContext;
    // Functions
    const {openSnackbar} = appContext;
    const role = userData?.role?.toLowerCase();

    const getNewOrderLink = () => {
        if (role === 'author') return "/order-form";
        else return "/find-order"
    }

    const handlerNewOrder = () => {
        if (role === 'author') {
            history.push('/order-form');
        } else {
            expertProfileCompletion ?
                history.push('/find-order') :
                history.push('/expert-form');
        }
    }
    const handlerOrder = (orderId) => {
        history.push(`/order/${orderId}`);
    }

    useEffect(() => {
        console.log(userData);
        const expertProfileCompletion = UserService.getExpertProfileCompletion(userData);
        console.log(expertProfileCompletion);
        setExpertLoading(expertProfileCompletion);
    }, [userData])

    const useItems = () => {
        const [items, setItems] = useState([])
        useEffect(() => {
            const unsubscribe = firestore
                .collection("orders")
                .onSnapshot(snapshot => {
                    const listItems = snapshot.docs
                        .filter((doc) => {
                            const data = doc.data();
                            const isAuthor = (role === "author");
                            const isExpert = (role === "expert");
                            const isAuthorOrder = isAuthor && data?.author === user.uid;
                            const isExpertOrder = isExpert && data?.expert === user.uid;
                            return (isAuthorOrder || isExpertOrder);
                        })
                        .map(doc => ({
                            orderId: doc.id,
                            ...doc.data(),
                        }))
                    setLoading(false);
                    setItems(listItems)
                }, (error) => {
                    setLoading(false);
                    const message = error?.message;
                    openSnackbar(message);
                })
            return () => unsubscribe()
        }, [])
        return items
    }
    const orders = useItems();

    const DashboardOrdersContent = () => {
        if (loading) {
            return <Loader/>;
        }

        if (!orders?.length) return <EmptyState
            image={<NotFoundIllustration/>}
            title="У Вас пока нет заказов"
            description="Здесь будет отображаться список ваших заказов"
            button={
                <Fab variant="extended" color="primary" component={Link}
                     to={getNewOrderLink()}>
                    <Stack direction="row" spacing={1}>
                        <AddIcon/>
                        <span>Новый заказ</span>
                    </Stack>
                </Fab>
            }
        />

        return orders.map(({orderId, status, budget, deadline, title, description}) => (
            <DashboardListItem orderId={orderId}
                               key={orderId}
                               status={status}
                               budget={budget}
                               deadline={deadline}
                               title={title}
                               description={description}
                               handlerOrder={handlerOrder}
            />
        ))
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
                    <DashboardOrdersContent/>
                </BaseCard>
            </DashboardOrders>
            <DashboardAside>
                <DashboardAsideItem>
                    <AsideCard title="Мой профиль" isPadding={false}>
                        <MyProfileTable/>
                    </AsideCard>
                </DashboardAsideItem>
                <DashboardAsideItem>
                    <AsideCard title="Новости науки">
                        {/*<DenseTable/>*/}
                        <CarouselNews/>
                    </AsideCard>
                </DashboardAsideItem>
                <DashboardAsideItem>
                    <AsideCard title="Лучшие по вашей области" isPadding={false}>
                        <AlignItemsList/>
                    </AsideCard>
                </DashboardAsideItem>
            </DashboardAside>
        </DashboardWrapper>
    );
};

export default DashboardPage;
