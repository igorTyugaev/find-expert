import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";

import {auth} from "../../firebase";
import authentication from "../../services/authentication";


import {ReactComponent as CabinIllustration} from "../../illustrations/cabin.svg";
import {ReactComponent as InsertBlockIllustration} from "../../illustrations/insert-block.svg";
import EmptyState from "../../domain/EmptyState";
import {useAppContext} from "../../AppContext";

const HomePage = () => {
    const history = useHistory();
    const appContext = useAppContext();
    // Properties
    const {user} = appContext;
    // Functions
    const {openSnackbar} = appContext;

    const signInWithEmailLink = () => {
        if (user) return;

        const emailLink = window.location.href;
        if (!emailLink) return;

        if (auth.isSignInWithEmailLink(emailLink)) {
            const emailAddress = localStorage.getItem("emailAddress");

            if (!emailAddress) {
                history.push("/");
                return;
            }

            authentication
                .signInWithEmailLink(emailAddress, emailLink)
                .then((value) => {
                    const user = value.user;
                    const displayName = user.displayName;
                    const emailAddress = user.email;

                    openSnackbar(
                        `Signed in as ${displayName || emailAddress}`
                    );
                })
                .catch((reason) => {
                    const code = reason.code;
                    const message = reason.message;

                    switch (code) {
                        case "auth/expired-action-code":
                        case "auth/invalid-email":
                        case "auth/user-disabled":
                            openSnackbar(message);
                            break;

                        default:
                            openSnackbar(message);
                            return;
                    }
                })
                .finally(() => {
                    history.push("/");
                });
        }
    };

    useEffect(() => {
        signInWithEmailLink();
    }, []);

    if (user) {
        return (
            <EmptyState
                image={<CabinIllustration/>}
                title="Home"
                description="This is the home page. You can edit it from HomePage.js."
            />
        );
    }

    return (
        <EmptyState
            image={<InsertBlockIllustration/>}
            title="RMUIF"
            description="Supercharged version of Create React App with all the bells and whistles."
        />
    );
}

export default HomePage;
