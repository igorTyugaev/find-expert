import React from 'react';
import {Card, styled} from "@mui/material";
import {useAppContext} from "../../AppContext";
import AsideCard from "../../components/AsideCard";
import DashboardList from "../../components/DashboardList";

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

const DashboardPage = () => {
    const appContext = useAppContext();
    // Properties
    const {user, userData} = appContext;
    const role = userData?.role?.toLowerCase();

    return (
        <DashboardWrapper>
            <DashboardOrders>
                <DashboardList role={role}/>
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
