import React from "react";
import {BrowserRouter, Switch, Redirect, Route} from "react-router-dom";
import {Container, styled} from "@mui/material";
import UserPage from "./pages/UserPage";
import NotFoundPage from "./domain/NotFoundPage";
import {useAppContext} from "./AppContext";
import Bar from "./components/Bar";
import SelectRolePage from "./pages/SelectRolePage";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import OrderFormPage from "./pages/OrderFormPage";
import FindOrderPage from "./pages/FindOrderPage";
import FindExpertPage from "./pages/FindExpertPage";
import OrderPage from "./pages/OrderPage";
import ExpertFormPage from "./pages/ExpertFormPage";

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
    overflowY: "scroll",
}));

const AppRouter = () => {
    const appContext = useAppContext();
    // Properties
    const {user, userData} = appContext;
    const role = userData?.role?.toLowerCase();

    const getPublicRoutes = () => ([
        <Route path="/" exact key="LandingPage">
            <LandingPage/>
        </Route>
    ]);

    const getPrivateRoutes = () => ([
        <Route path="/" exact key="DashboardPage">
            <DashboardPage/>
        </Route>,
        <Route path="/select-role" exact key="SelectRolePage">
            {/*Выбор типа учетной записи пользователя*/}
            <SelectRolePage/>
        </Route>,
        <Route path="/order-form" exact key="OrderFormPage">
            {/*Автор заполняет форму на новую услугу*/}
            <OrderFormPage/>
        </Route>,
        <Route path="/expert-form" exact key="ExpertFormPage">
            {/*Форма регистрации эксперта*/}
            <ExpertFormPage/>
        </Route>,
        <Route path="/find-order" exact key="FindOrderPage">
            {/*Эксперт видет список закзаов, которые соотвествуют его профилю*/}
            <FindOrderPage/>
        </Route>,
        <Route path="/find-expert/:orderId" key="FindExpertPage">
            {/*Автор видет список экспертов, которые соотвествуют его запросу на услуги*/}
            <FindExpertPage/>
        </Route>,
        <Route path="/order/:orderId" key="OrderPage">
            {user ? <OrderPage/> : <Redirect to="/"/>}
        </Route>,
        <Route path="/user/:userId" key="UserPage">
            {user ? <UserPage/> : <Redirect to="/"/>}
        </Route>
    ]);

    const AllRoutes = () => (
        <Switch>
            {user ?
                role ? getPrivateRoutes() : <SelectRolePage/> :
                getPublicRoutes()
            }
            <Route>
                <NotFoundPage/>
            </Route>
        </Switch>
    );

    return (
        <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
            <AppWrapper>
                <AppHeader/>
                <AppBody>
                    <Container>
                        <AllRoutes/>
                    </Container>
                </AppBody>
            </AppWrapper>
        </BrowserRouter>
    );
}

export default AppRouter;
