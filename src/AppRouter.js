import React from "react";
import {BrowserRouter, Switch, Redirect, Route} from "react-router-dom";

import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import NotFoundPage from "./domain/NotFoundPage";
import {useAppContext} from "./AppContext";
import Bar from "./components/Bar";


const AppRouter = () => {
    const appContext = useAppContext();
    // Properties
    const {user, roles} = appContext;

    return (
        <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
            <Bar/>
            <Switch>
                <Route path="/" exact>
                    <HomePage user={user}/>
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
        </BrowserRouter>
    );
}

export default AppRouter;
