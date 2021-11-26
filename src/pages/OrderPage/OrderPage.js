import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import BaseCard from "../../components/BaseCard";
import {
    Card,
    Typography,
    styled,
    ListItem,
    ListItemText,
    List,
    ListItemIcon,
    Divider
} from "@mui/material";
import AsideCard from "../../components/AsideCard";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DateRangeIcon from "@mui/icons-material/DateRange";
import {ExpertsService} from "../../services/ExpertsService";
import {useAppContext} from "../../AppContext";
import OrderService from "../../services/OrderService";
import Loader from "../../components/Loader";
import FindExpertPage from "../FindExpertPage";
import ArticleIcon from '@mui/icons-material/Article';
import AlignItemsList from "../../components/AlignItemsList";

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

const searchAnExpert = async () => {
    // XXX: Переделать поиск эксперта. @nekochanoide
    for await (let res of ExpertsService.findExpertsBySubjects(["Здоровье", "Уход за больными"])) {
        console.log(res);
    }
}

const OrderPage = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const appContext = useAppContext();
    const history = useHistory();
    // Properties
    const {user, userData} = appContext;
    // Functions
    const {openSnackbar} = appContext;

    const role = userData?.role?.toLowerCase();
    const {orderId} = useParams();
    const canGoBack = history.action !== 'POP';

    useEffect(() => {
        if (!orderId) return;
        OrderService.getOrder(orderId)
            .then((order) => {
                setOrder(order);
            })
            .catch((error) => {
                const message = error?.message;
                openSnackbar(message);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [orderId])

    if (loading) {
        return <Loader/>;
    }

    if (order?.status === "open") {
        return <FindExpertPage/>
    }

    return (
        <OrderWrapper>
            <OrderContent>
                <BaseCard title={`Заказ №${orderId}`}
                          btnTitle={canGoBack ? "Назад" : "Мои заказы"}
                          btnHandler={canGoBack ? history.goBack : () => history.push("/")}
                          isPaddingBody>
                    <Typography variant="h6" component="h3">
                        {order?.title || "Название заказа"}
                    </Typography>
                    <Typography sx={{marginTop: "0.2em"}} variant="p" component="p">
                        {order?.description || "Описание заказа"}
                    </Typography>
                </BaseCard>
            </OrderContent>
            <OrderAside>
                <OrderAsideItem>
                    <AsideCard title="Информация о заказе" isPadding={false}>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <LocalOfferIcon/>
                                </ListItemIcon>
                                <ListItemText primary={`₽${order?.budget}`}/>
                            </ListItem>
                            <Divider variant="middle" component="li"/>
                            <ListItem>
                                <ListItemIcon>
                                    <DateRangeIcon/>
                                </ListItemIcon>
                                <ListItemText primary={`${order?.deadline}`}/>
                            </ListItem>
                            <Divider variant="middle" component="li"/>
                            <ListItem>
                                <ListItemIcon>
                                    <ArticleIcon/>
                                </ListItemIcon>
                                <ListItemText primary={`${order?.status}`}/>
                            </ListItem>
                        </List>
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
                    <AsideCard title="Лучшие по вашей области" isPadding={false}>
                        <AlignItemsList/>
                    </AsideCard>
                </OrderAsideItem>
            </OrderAside>
        </OrderWrapper>
    );
}

export default OrderPage;
