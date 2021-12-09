import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import BaseCard from "../../components/BaseCard";
import ExpertListItem from "../../components/ExpertListItem";
import {useAppContext} from "../../AppContext";
import {ExpertsService} from "../../services/ExpertsService";
import OrderService from "../../services/OrderService";

const AllExpertPage = () => {
    const appContext = useAppContext();
    const history = useHistory();
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
            const unsubscribe = ExpertsService
                .getAllExperts()
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
        }, [])
        return experts;
    }
    const experts = useItems();


    const handlerSelect = (expertId) => {
        console.log(expertId);
    }

    return (
        <BaseCard
            title="Найти своего эксперта"
            description="Только лучшие экперты"
            btnTitle="На главную"
            btnHandler={handlerMyOrder}>
            {experts.map((expert) => (
                <ExpertListItem hideBar expert={expert} key={expert.expertId} handlerSelect={handlerSelect}/>
            ))}
        </BaseCard>
    );
};

export default AllExpertPage;
