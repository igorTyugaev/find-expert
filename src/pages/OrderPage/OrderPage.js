import React from "react";
import {useHistory, useParams} from "react-router-dom";
import BaseCard from "../../components/BaseCard";
import {Card, Chip, styled, Typography} from "@mui/material";
import DashboardListItem from "../../components/DashboardListItem";
import AsideCard from "../../components/AsideCard";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DateRangeIcon from "@mui/icons-material/DateRange";

const OrderWrapper = styled('div')(({theme}) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "calc(100% + 1em)",
    margin: "-1em 0 0 -1em",
}));

const OrderContent = styled(Card)(({theme}) => ({
    margin: "1em 0 0 1em",
    flex: "1 1 calc(60% - 1em)",
}));

const OrderAside = styled('div')(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    margin: "1em 0 0 1em",
    flex: "1 1 calc(40% - 1em)",
    minWidth: "320px",
}));

const OrderAsideItem = styled('div')(({theme}) => ({
    "&:not(:first-of-type)": {
        marginTop: "1em",
    }
}));

const OrderPage = () => {
    const history = useHistory();
    const {orderId} = useParams();
    const canGoBack = history.action !== 'POP';

    return (
        <OrderWrapper>
            <OrderContent>
                <BaseCard title={`Заках №${orderId}`}
                          btnTitle={canGoBack ? "Назад" : "Мои заказы"}
                          btnHandler={canGoBack ? history.goBack : () => history.push("/")}
                          isPaddingBody>
                    <Typography variant="h6" component="h3">
                        Название заказа
                    </Typography>
                    <Typography sx={{marginTop: "0.2em"}} variant="p" component="p">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur expedita in necessitatibus
                        officia
                        officiis, quis sit ut? Aut blanditiis, delectus dolor eligendi eveniet ex laborum omnis optio
                        quaerat
                        repudiandae sunt!
                    </Typography>
                    <Chip label={"212334"}/>
                    <Chip icon={<LocalOfferIcon/>} label={"budget"} variant="outlined"/>
                    <Chip icon={<DateRangeIcon/>} label={"deadline"} variant="outlined"/>
                </BaseCard>
            </OrderContent>
            <OrderAside>
                <OrderAsideItem>
                    <AsideCard title="Информация об авторе">
                        <ol>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                        </ol>
                    </AsideCard>
                </OrderAsideItem>
                <OrderAsideItem>
                    <AsideCard title="Рекламный баннер">
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
                </OrderAsideItem>
                <OrderAsideItem>
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
                </OrderAsideItem>
            </OrderAside>
        </OrderWrapper>
    );
}

export default OrderPage;
