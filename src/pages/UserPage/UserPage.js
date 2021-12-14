import React, {useState, useEffect} from "react";
import {useParams, Link, useHistory} from "react-router-dom";

import {Grid, Fab, Box, styled, Stack, Avatar, Chip, Typography, Rating} from "@mui/material";

import {Refresh as RefreshIcon, Home as HomeIcon} from "@mui/icons-material";

import {firestore} from "../../firebase";


import {ReactComponent as ErrorIllustration} from "../../illustrations/error.svg";
import {ReactComponent as NoDataIllustration} from "../../illustrations/no-data.svg";
import EmptyState from "../../domain/EmptyState";
import Loader from "../../components/Loader";
import UserCard from "../../components/UserCard";
import BaseCard from "../../components/BaseCard";
import MarkdownEditor from "rich-markdown-editor";
import {useAppContext} from "../../AppContext";
import ChatCard from "../../components/ChatCard";


const ExpertAvatar = styled(Avatar)(({theme}) => ({
    width: theme.spacing(14),
    height: theme.spacing(14),
    margin: "auto",
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

const CardInfo = styled("div")(({theme}) => ({
    width: "100%",
    display: "flex",
}));

const CardInfoAvatar = styled("div")(({theme}) => ({
    flex: "1 0 18%",
    display: "flex",
    justifyContent: "center",
    alignCenter: "flex-start"
}));

const CardInfoGrid = styled("div")(({theme}) => ({
    flex: "5 1 auto"
}));

const UserPage = () => {
    const appContext = useAppContext();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const {userId} = useParams();
    const {openSnackbar} = appContext;
    const canGoBack = history.action !== 'POP';

    useEffect(() => {
        return firestore
            .collection("users")
            .doc(userId)
            .onSnapshot(
                (snapshot) => {
                    setLoading(false);
                    setUser(snapshot.data());
                },
                (error) => {
                    setLoading(false);
                    setError(error);
                }
            );
    }, [userId]);

    if (error) {
        return (
            <EmptyState
                image={<ErrorIllustration/>}
                title="Не удалось получить пользователя."
                description="Что-то пошло не так при попытке получить пользователя."
                button={
                    <Fab
                        variant="extended"
                        color="primary"
                        onClick={() => window.location.reload()}
                    >
                        <Stack direction="row" gap={1}>
                            <RefreshIcon/>
                            <span>Повторить</span>
                        </Stack>
                    </Fab>
                }
            />
        );
    }

    if (loading) {
        return <Loader/>;
    }

    if (!user) {
        return (
            <EmptyState
                image={<NoDataIllustration/>}
                title="Пользователя не существует."
                description="Запрашиваемого пользователь не существует."
                button={
                    <Fab variant="extended" color="primary" component={Link} to="/">
                        <Stack direction="row" gap={1}>
                            <HomeIcon/>
                            Главная
                        </Stack>
                    </Fab>
                }
            />
        );
    }


    return (
        <BaseCard title="Профиль пользователя"
                  isPaddingBody
                  btnTitle={"Назад"}
                  btnHandler={canGoBack ? history.goBack : () => history.push("/")}>
            <div>
                <CardInfo>
                    <CardInfoAvatar>
                        <ExpertAvatar alt={user?.fullName} src={user?.avatar}/>
                    </CardInfoAvatar>

                    <CardInfoGrid>
                        <Typography sx={{marginBottom: "0.5em", fontWeight: "bold"}} variant="h5" component="h3">
                            {user?.fullName || "Не указано"} {(user?.isVerified) && "✔️"}
                        </Typography>
                        <Rating name="read-only" value={4} readOnly/>
                        <Typography sx={{margin: "0.5em 0"}} variant="p" component="p">
                            {user?.expertPromo}
                        </Typography>
                    </CardInfoGrid>
                </CardInfo>

                <Stack gap={2}>
                    <Box>
                        <Typography variant="h6" component="h4">
                            Предметная область:
                        </Typography>
                        <ChipGroup sx={{marginTop: "0.01em"}}>
                            {user?.expertSubjects && user?.expertSubjects.map((label, index) => (index < 5) &&
                                <ChipItem label={label} size="small"/>)}
                        </ChipGroup>
                    </Box>

                    <Box>
                        <Typography variant="h6" component="h4">
                            Услуги:
                        </Typography>
                        <ChipGroup sx={{marginTop: "0.01em"}}>
                            {user?.expertServices && user?.expertServices.map((label, index) => (index < 5) &&
                                <ChipItem label={label} size="small"/>)}
                        </ChipGroup>
                    </Box>

                    <Box>
                        <Typography variant="h6" component="h4">
                            Портфолио:
                        </Typography>
                        <Typography sx={{margin: "0.5em 0"}} variant="p" component="p">
                            {user?.expertPortfolio}
                        </Typography>
                    </Box>
                </Stack>
                <Typography sx={{marginTop: "0.5em"}} variant="h6" component="h4">
                    Отзывы:
                </Typography>
                <Typography sx={{marginTop: "0.5em"}} variant="body1" component="p">
                    Уже скоро⌛
                </Typography>
            </div>
        </BaseCard>
    );
}

export default UserPage;
