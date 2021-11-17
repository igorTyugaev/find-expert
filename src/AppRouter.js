import React from "react";
import {BrowserRouter, Switch, Redirect, Route} from "react-router-dom";

import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import NotFoundPage from "./domain/NotFoundPage";
import {useAppContext} from "./AppContext";
import Bar from "./components/Bar";
import UserFormPage from "./pages/UserFormPage";
import SelectRole from "./pages/SelectRole";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import {Container, styled} from "@mui/material";
import RequestService from "./pages/RequestService";
import FindOrder from "./pages/FindOrder";

const AppWrapper = styled('div')(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh"
}));

const AppHeader = styled(Bar)(({theme}) => ({
    flex: "0 0 auto",
}));

const AppBody = styled('div')(({theme}) => ({
    flex: "1 1 auto",
    marginTop: "0.35em",
    paddingTop: "1.12em",
    overflowY: "scroll"
}));

const AppRouter = () => {
    const appContext = useAppContext();
    // Properties
    const {user, userData, roles} = appContext;
    const role = userData?.role?.toLowerCase();

    return (
        <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
            <AppWrapper>
                <AppHeader/>
                <AppBody>
                    <Container>
                        <Switch>
                            <Route path="/" exact>
                                {user ?
                                    role ? <DashboardPage/> : <Redirect to="/select-role"/> :
                                    <LandingPage/>
                                }
                            </Route>
                            {/*Выбор типа учетной записи пользователя*/}
                            <Route path="/select-role" exact>
                                {user ?
                                    <SelectRole/> :
                                    <Redirect to="/"/>
                                }
                            </Route>
                            {/*Автор заполняет форму на новую услугу*/}
                            <Route path="/request-service" exact>
                                {user ?
                                    <RequestService/> :
                                    <Redirect to="/"/>
                                }
                            </Route>
                            {/*Эксперт видет список закзаов, которые соотвествуют его профилю*/}
                            <Route path="/find-order" exact>
                                {user ?
                                    <FindOrder/> :
                                    <Redirect to="/"/>
                                }
                            </Route>
                            <Route path="/form" exact>
                                <UserFormPage/>
                            </Route>
                            <Route path="/admin">
                                {user && roles.includes("admin") ? (
                                    <AdminPage/>
                                ) : (
                                    <Redirect to="/"/>
                                )}
                            </Route>
                            <Route path="/user/:userId">
                                {user ? <UserPage/> : <Redirect to="/"/>}
                            </Route>
                            <Route>
                                <NotFoundPage/>
                            </Route>
                        </Switch>
                    </Container>
                </AppBody>
            </AppWrapper>
        </BrowserRouter>
    );
}

export default AppRouter;
