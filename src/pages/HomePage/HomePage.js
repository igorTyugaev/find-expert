import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";

import {auth} from "../../firebase";
import UserService from "../../services/UserService";


import {ReactComponent as CabinIllustration} from "../../illustrations/cabin.svg";
import {ReactComponent as InsertBlockIllustration} from "../../illustrations/insert-block.svg";
import EmptyState from "../../domain/EmptyState";
import {useAppContext} from "../../AppContext";

const HomePage = () => {
    const appContext = useAppContext();
    // Properties
    const {user} = appContext;

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
