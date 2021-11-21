import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import BaseCard from "../../components/BaseCard";
import ExpertListItem from "../../components/ExpertListItem";

const experts = [
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

const FindExpertPage = () => {
    const history = useHistory();
    const {orderId} = useParams();
    const handlerMyOrder = () => {
        history.push('/');
    }

    return (
        <BaseCard
            title="Эксперты, соответствующие вашему заказу"
            description="Выберите подходящего эксперта и нажиме 'Выбрать'"
            btnTitle="Активные заказы"
            btnHandler={handlerMyOrder}>
            {experts.map((expert) => (
                <ExpertListItem expert={expert} key={expert.id}/>
            ))}
        </BaseCard>
    );
};

export default FindExpertPage;
