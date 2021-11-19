import React from 'react';
import {useHistory} from "react-router-dom";
import BaseCard from "../../components/BaseCard";
import OrdersListItem from "../../components/OrdersListItem";

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
const FindOrderPage = () => {
    const history = useHistory();
    const handlerMyOrder = () => {
        history.push('/');
    }
    return (
        <BaseCard title="Заказы, которые соответствуют вашему профилю"
                  description="Выберите интересующий заказ и нажиме 'Откликнуться'"
                  btnTitle="Активные заказы"
                  btnHandler={handlerMyOrder}>
            {/* TODO: Сделать заглушку, если список пустой */}
            {/* TODO: Показывать заглушку для эксперта, если он не заполнил профиль*/}
            {orders.map((order) => (
                <OrdersListItem order={order} key={order.id}/>
            ))}
        </BaseCard>
    );
};

export default FindOrderPage;
