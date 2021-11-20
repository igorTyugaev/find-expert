import React, {useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {Add as AddIcon} from "@mui/icons-material";
import {Card, Fab, Stack, styled} from "@mui/material";
import {useAppContext} from "../../AppContext";
import AsideCard from "../../components/AsideCard";
import BaseCard from "../../components/BaseCard";
import DashboardListItem from "../../components/DashboardListItem";
import {firestore} from "../../firebase";
import Loader from "../../components/Loader";
import EmptyState from "../../domain/EmptyState";
import {ReactComponent as NotFoundIllustration} from "../../illustrations/not-found.svg";
import UserService from "../../services/UserService";

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
 * - Требуеться выбрать эксперта (FindExpertPage) - missing
 * - Требуеться выбрать эксперта (ChatOrder) - working
 */
const DashboardPage = () => {
    const [loading, setLoading] = useState(true);
    const [expertProfileCompletion, setExpertLoading] = useState(false);
    const appContext = useAppContext();
    const history = useHistory();
    const getNewOrderLink = () => {
        if (role === 'author') return "/order-form";
        else return "/find-order"
    }

    // Properties
    const {user, userData} = appContext;
    // Functions
    const {openSnackbar} = appContext;

    const role = userData?.role?.toLowerCase();
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
        setExpertLoading(UserService.getExpertProfileCompletion(userData));
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
                            const role = data?.role?.toLowerCase();
                            const isAuthor = (role === "author");
                            const isExpert = (role === "expert");
                            const isAuthorOrder = isAuthor && data?.author === user.uid;
                            const isExpertOrder = isExpert && data?.expert === user.uid;
                            return (isAuthorOrder || isExpertOrder)
                        })
                        .map(doc => ({
                            id: doc.id,
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

        return orders.map(({id, status, budget, deadline, title, description}) => (
            <DashboardListItem id={id}
                               key={id}
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
