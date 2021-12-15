import React, {useState} from "react";
import {Link as RouterLink, useHistory} from "react-router-dom";

import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    ButtonGroup,
    Button,
    IconButton,
    Divider,
    Menu,
    MenuItem,
    Link, Stack, Hidden,
} from "@mui/material";

import UserAvatar from "../UserAvatar";
import {useAppContext} from "../../AppContext";

const Bar = () => {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);

    const appContext = useAppContext();

    const openMenu = (event) => {
        const anchorEl = event.currentTarget;
        setAnchorEl(anchorEl);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    // Properties
    const {performingAction, user, userData} = appContext;

    // Functions
    const {openDialog} = appContext;

    // Events
    const onAboutClick = () => openDialog("aboutDialog"),
        onSettingsClick = () => openDialog("settingsDialog"),
        onSignOutClick = () => openDialog("signOutDialog"),
        onSignUpClick = () => openDialog("signUpDialog"),
        onSignInClick = () => openDialog("signInDialog");

    const menuItems = [
        {
            name: "О сервисе",
            onClick: onAboutClick,
        },
        {
            name: "Мой профиль",
            to: user ? `/user/${user.uid}` : null,
        },
        {
            name: "Сменить роль",
            to: "/select-role",
        },
        {
            name: "Настройки",
            onClick: onSettingsClick,
        },
        {
            name: "Выйти",
            divide: true,
            onClick: onSignOutClick,
        },
    ];

    return (
        <AppBar color="primary" position="static">
            <Toolbar>
                <Box display="flex" flexGrow={1}>
                    <Typography color="inherit" variant="h6">
                        <Link
                            color={userData?.role === "author" ? "white" : "inherit"}
                            component={RouterLink}
                            to="/promo"
                            underline="none"
                        >
                            {process.env.REACT_APP_TITLE}
                        </Link>
                    </Typography>
                </Box>

                {user && (
                    <>
                        <Stack direction="row" spacing={3} sx={{marginRight: "1em"}}>
                            <Button sx={{color: "white"}} variant="text"
                                    onClick={() => history.push("/")}>
                                Мои заказы
                            </Button>
                            <Button sx={{color: "white"}} variant="text"
                                    onClick={() => history.push("/my-articles")}>
                                Мои статьи
                            </Button>
                        </Stack>
                        <IconButton
                            color="inherit"
                            disabled={performingAction}
                            onClick={openMenu}
                            size="large">
                            <UserAvatar user={Object.assign(user, userData)}/>
                        </IconButton>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={closeMenu}
                        >
                            {menuItems.map((menuItem, index) => {
                                if (
                                    menuItem.hasOwnProperty("condition") &&
                                    !menuItem.condition
                                ) {
                                    return null;
                                }

                                let component = null;

                                if (menuItem.to) {
                                    component = (
                                        <MenuItem
                                            key={index}
                                            component={RouterLink}
                                            to={menuItem.to}
                                            onClick={closeMenu}
                                        >
                                            {menuItem.name}
                                        </MenuItem>
                                    );
                                } else {
                                    component = (
                                        <MenuItem
                                            key={index}
                                            onClick={() => {
                                                closeMenu();

                                                menuItem.onClick();
                                            }}
                                        >
                                            {menuItem.name}
                                        </MenuItem>
                                    );
                                }

                                if (menuItem.divide) {
                                    return (
                                        <span key={index}>
                        <Divider/>

                                            {component}
                      </span>
                                    );
                                }

                                return component;
                            })}
                        </Menu>
                    </>
                )}

                {!user && (
                    <Stack direction="row" spacing={3} sx={{marginRight: "1em"}}>
                        <Hidden smDown>
                            <Button sx={{color: "white"}} variant="text"
                                    onClick={() => history.push("/articles")}>
                                Все статьи
                            </Button>
                        </Hidden>
                        <ButtonGroup
                            color="inherit"
                            disabled={performingAction}
                            variant="outlined"
                        >
                            <Button onClick={onSignUpClick}>Регистрация</Button>
                            <Button onClick={onSignInClick}>Вход</Button>
                        </ButtonGroup>
                    </Stack>
                )}
            </Toolbar>
        </AppBar>
    );

}

export default Bar;
