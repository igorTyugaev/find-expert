import React, { useEffect, useState } from 'react';
import {useHistory} from "react-router-dom";
import { useAppContext } from '../../AppContext';
import BaseCard from "../../components/BaseCard";
import OrdersListItem from "../../components/OrdersListItem";
import OrderService from '../../services/OrderService';

const FindOrderPage = () => {
    const history = useHistory();
    const handlerMyOrder = () => {
        history.push('/');
    }
    let appContext = useAppContext();
    let [orders, setOrders] = useState(null);
    useEffect(() => {
        if (orders) {
            return;
        }
        let getOrders = async () => {
            let fetchedOrders = [];
            if (!appContext.userData.expertSubjects || appContext.userData.expertSubjects.length === 0) {
                return;
            }
            for await (let order of OrderService.getAllOrdersBySubjects(appContext.userData.expertSubjects, appContext)) {
                fetchedOrders.push(order);
            }
            setOrders(fetchedOrders);
        }
        getOrders();
    });
    return (
        <BaseCard title="Заказы, которые соответствуют вашему профилю"
            description="Выберите интересующий заказ и нажиме 'Откликнуться'"
            btnTitle="Активные заказы"
            btnHandler={handlerMyOrder}>
            {/* TODO: Сделать заглушку, если список пустой */}
            {/* TODO: Показывать заглушку для эксперта, если он не заполнил профиль*/}
            {orders && orders.length > 0 ? orders?.map((order) => (
                <OrdersListItem order={order} key={order.id} />
            )) :
                "Для вас нет заказов :("}
        </BaseCard>
    );
};

export default FindOrderPage;
