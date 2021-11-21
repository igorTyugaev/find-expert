import React, {useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {useAppContext} from '../../AppContext';
import BaseCard from "../../components/BaseCard";
import OrdersListItem from "../../components/OrdersListItem";
import OrderService from '../../services/OrderService';
import EmptyState from "../../domain/EmptyState";
import {ReactComponent as NotFoundIllustration} from "../../illustrations/not-found.svg";
import {Fab, Stack} from "@mui/material";
import {Add as AddIcon} from "@mui/icons-material";
import {firestore} from "../../firebase";

const FindOrderPage = () => {
    const history = useHistory();
    const appContext = useAppContext();
    // Properties
    const {userData} = appContext;
    const {expertServices = [], expertSubjects = []} = userData;
    // Functions
    const {openSnackbar} = appContext;

    const handlerMyOrder = () => {
        history.push('/');
    }

    const useItems = () => {
        const [orders, setOrders] = useState([]);

        useEffect(() => {
            if (!(expertServices?.length && expertSubjects?.length)) return;
            const unsubscribe = OrderService
                .getOrders(expertSubjects)
                .onSnapshot((snapshot) => {
                    const items = snapshot.docs
                        .filter(doc => (doc.data()?.services?.some((item) => expertServices.includes(item))))
                        .map(doc => ({
                            orderId: doc.id,
                            ...doc.data(),
                        }));
                    setOrders(items);
                }, (error) => {
                    const message = error?.message;
                    openSnackbar(message);
                })
            return () => unsubscribe();
        }, [expertServices, expertSubjects])
        return orders;
    }
    const orders = useItems();

    return (
        <BaseCard title="Заказы, которые соответствуют вашему профилю"
                  description="Выберите интересующий заказ и нажиме 'Откликнуться'"
                  btnTitle="Активные заказы"
                  btnHandler={handlerMyOrder}>
            {orders?.length ?
                orders?.map((order) => (
                    <OrdersListItem order={order} key={order?.orderId}/>
                )) :
                <EmptyState
                    key="NotFound"
                    image={<NotFoundIllustration/>}
                    title="Заказов нет"
                    description="Пока что по вашему профилю заказов нет"/>
            }
        </BaseCard>
    );
};

export default FindOrderPage;
