import React from "react";
import {BrowserRouter, Switch, Redirect, Route} from "react-router-dom";
import {Container, styled} from "@mui/material";
import UserPage from "./pages/UserPage";
import NotFoundPage from "./domain/NotFoundPage";
import {useAppContext} from "./AppContext";
import Bar from "./components/Bar";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import OrderFormPage from "./pages/OrderFormPage";
import FindOrderPage from "./pages/FindOrderPage";
import OrderPage from "./pages/OrderPage";
import ExpertFormPage from "./pages/ExpertFormPage";
import ChatPage from "./pages/ChatPage";
import UserFormPage from "./pages/UserFormPage";
import SelectRolePage from "./pages/SelectRolePage";
import ArticlesDashboardPage from "./pages/ArticlesDashboardPage";
import ArticleEditorPage from "./pages/ArticleEditorPage";
import ArticlesPage from "./pages/ArticlesPage";
import ArticlePage from "./pages/ArticlePage";
import FindExpertPage from "./pages/FindExpertPage";
import AllExpertPage from "./pages/AllExpertPage";

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
    const fullName = userData?.fullName?.toLowerCase();

    const getPublicRoutes = () => ([
        <Route path="/" exact key="Promo">
            <Redirect to="/promo"/>
        </Route>,
    ]);

    const getPrivateRoutes = () => ([
        <Route path="/" exact key="DashboardPage">
            <DashboardPage/>
        </Route>,
        <Route path="/my-articles" exact key="ArticlesDashboardPage">
            <ArticlesDashboardPage user={user} userId={user.uid}/>
        </Route>,
        <Route path="/editor/:articleId" exact key="ArticleEditorPage">
            {/*?????????? ???????? ?????????????? ???????????? ????????????????????????*/}
            <ArticleEditorPage user={user} userId={user.uid}/>
        </Route>,
        <Route path="/user-form" exact key="UserFormPage">
            {/*?????????? ???????? ?????????????? ???????????? ????????????????????????*/}
            <UserFormPage/>
        </Route>,
        <Route path="/select-role" exact key="SelectRolePage">
            {/*?????????? ???????? ?????????????? ???????????? ????????????????????????*/}
            <SelectRolePage/>
        </Route>,
        <Route path="/order-form" exact key="OrderFormPage">
            {/*?????????? ?????????????????? ?????????? ???? ?????????? ????????????*/}
            <OrderFormPage/>
        </Route>,
        <Route path="/expert-form" exact key="ExpertFormPage">
            {/*?????????? ?????????????????????? ????????????????*/}
            <ExpertFormPage/>
        </Route>,
        <Route path="/find-order" exact key="FindOrderPage">
            {/*?????????????? ?????????? ???????????? ??????????????, ?????????????? ???????????????????????? ?????? ??????????????*/}
            <FindOrderPage/>
        </Route>,
        <Route path="/find-expert/:orderId" key="AllExpertPage">
            {/*?????????? ?????????? ???????????? ??????????????????, ?????????????? ???????????????????????? ?????? ?????????????? ???? ????????????*/}
            <FindExpertPage/>
        </Route>,
        <Route path="/order/:orderId" key="OrderPage">
            {user ? <OrderPage/> : <Redirect to="/"/>}
        </Route>,
        <Route path="/chat/:chatId" key="ChatPage">
            {user ? <ChatPage/> : <Redirect to="/"/>}
        </Route>
    ]);

    const AllRoutes = () => (
        <Switch>
            {user ?
                fullName ? (role ? getPrivateRoutes() : <SelectRolePage/>) : <UserFormPage/> :
                getPublicRoutes()
            }
            <Route path="/promo" exact key="LandingPage">
                <LandingPage/>
            </Route>,
            <Route path="/articles" exact key="ArticlesPage">
                <ArticlesPage/>
            </Route>,
            <Route path="/article/:articleId" exact key="ArticlePage">
                <ArticlePage/>
            </Route>,
            <Route path="/experts" exact key="AllExpertPage">
                <AllExpertPage/>
            </Route>,
            <Route path="/user/:userId" key="UserPage">
                <UserPage/>
            </Route>,
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
                    <Container sx={{paddingBottom: "2em"}}>
                        <AllRoutes/>
                    </Container>
                </AppBody>
            </AppWrapper>
        </BrowserRouter>
    );
}

export default AppRouter;
