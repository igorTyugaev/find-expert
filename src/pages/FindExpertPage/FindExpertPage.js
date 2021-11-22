import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import BaseCard from "../../components/BaseCard";
import ExpertListItem from "../../components/ExpertListItem";
import {useAppContext} from "../../AppContext";
import OrderService from "../../services/OrderService";
import {ExpertsService} from "../../services/ExpertsService";

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
    const appContext = useAppContext();
    const history = useHistory();
    const {orderId} = useParams();
    // Properties
    const {user, userData} = appContext;
    // Functions
    const {openSnackbar} = appContext;

    const handlerMyOrder = () => {
        history.push('/');
    }

    const useItems = () => {
        const [experts, setExperts] = useState([]);

        useEffect(() => {
            if (!orderId) return;
            const unsubscribe = ExpertsService
                .findExpertsByOrderId(orderId)
                .onSnapshot((snapshot) => {
                    const items = snapshot.docs
                        .map(doc => ({
                            expertId: doc.id,
                            ...doc.data(),
                        }));
                    setExperts(items);
                }, (error) => {
                    const message = error?.message;
                    openSnackbar(message);
                })
            return () => unsubscribe();
        }, [orderId])
        return experts;
    }
    const experts = useItems();

    return (
        <BaseCard
            title="Эксперты, соответствующие вашему заказу"
            description="Выберите подходящего эксперта и нажиме 'Выбрать'"
            btnTitle="Активные заказы"
            btnHandler={handlerMyOrder}>
            {experts.map((expert) => (
                <ExpertListItem expert={expert} orderId={orderId} key={expert.id}/>
            ))}
        </BaseCard>
    );
};

export default FindExpertPage;
