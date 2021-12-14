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
    Divider, Chip, Box, Stack
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

const ChipGroup = styled('div')(({theme}) => ({
    display: "inline-flex",
    flexWrap: "wrap",
    width: "calc(100% + .6em)",
    margin: "-.6em 0 0 -.6em"
}));

const ChipItem = styled(Chip)(({theme}) => ({
    margin: ".6em 0 0 .6em",
    padding: ".5em"
}));

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

    return (
        <OrderWrapper>
            <OrderContent>
                <BaseCard title={`Заказ №${orderId}`}
                          btnTitle={canGoBack ? "Назад" : "Мои заказы"}
                          btnHandler={canGoBack ? history.goBack : () => history.push("/")}
                          isPaddingBody>
                    <Stack gap={2}>
                        <Typography sx={{fontWeight: "bold"}} variant="h5" component="h3"
                                    style={{wordBreak: "break-word"}}>
                            {order?.title || "Название заказа"}
                        </Typography>
                        <Typography variant="p" component="p" style={{wordBreak: "break-word"}}>
                            {order?.description || "Нет данных 😞"}
                        </Typography>
                        <Box>
                            <Typography variant="h6" component="h4">
                                Предметная область:
                            </Typography>
                            <ChipGroup sx={{marginTop: "0.01em"}}>
                                {order?.subjects && order?.subjects.map((label, index) => (index < 5) &&
                                    <ChipItem label={label} size="small"/>)}
                            </ChipGroup>
                        </Box>

                        <Box>
                            <Typography variant="h6" component="h4">
                                Услуги:
                            </Typography>
                            <ChipGroup sx={{marginTop: "0.01em"}}>
                                {order?.services && order?.services.map((label, index) => (index < 5) &&
                                    <ChipItem label={label} size="small"/>)}
                            </ChipGroup>
                        </Box>
                    </Stack>
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
                    <AsideCard title="Анонсы и реклама" isPadding={false}>
                        <a style={{display: "block", objectFit: "contain", width: "100%"}}
                           href="https://minobrnauki.gov.ru/press-center/news/?ELEMENT_ID=44939" target="_blank">
                            <img style={{display: "block", objectFit: "contain", width: "100%"}}
                                 src="https://minobrnauki.gov.ru/upload/iblock/d58/hxpdwcci9yv2z86i7nnqtrjz06ui6vnu.png"
                                 alt=""/>
                        </a>
                    </AsideCard>
                </OrderAsideItem>
                <OrderAsideItem>
                    <AsideCard title="Лучшие эксперты" isPadding={false}>
                        <AlignItemsList/>
                    </AsideCard>
                </OrderAsideItem>
            </OrderAside>
        </OrderWrapper>
    );
}

export default OrderPage;
