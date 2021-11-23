import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import BaseCard from "../../components/BaseCard";
import ExpertListItem from "../../components/ExpertListItem";
import {useAppContext} from "../../AppContext";
import {ExpertsService} from "../../services/ExpertsService";

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
