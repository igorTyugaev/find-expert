import React from "react";

import {ThemeProvider, StyledEngineProvider} from "@mui/material/styles";
import {CssBaseline, Button, Snackbar} from "@mui/material";

import AppRouter from "./AppRouter";
import DialogHost from "./components/DialogHost";
import ErrorBoundary from "./domain/ErrorBoundary";
import LaunchScreen from "./pages/LaunchScreen";
import {useAppContext} from "./AppContext";

const App = () => {
    // INFO: @mui/styles is not compatible with React.StrictMode or React 18.
    // TODO: Perform a full migration to emotion
    const appContext = useAppContext();
    const {
        ready,
        performingAction,
        theme,
        user,
        userData,
    } = appContext;

    const {
        aboutDialog,
        signUpDialog,
        signInDialog,
        settingsDialog,
        deleteAccountDialog,
        signOutDialog,
    } = appContext;

    const {snackbar} = appContext;
    const {
        openDialog,
        closeDialog,
        deleteAccount,
        signOut,
        openSnackbar,
        closeSnackbar
    } = appContext;

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <ErrorBoundary>
                    {!ready && <LaunchScreen/>}

                    {ready && (
                        <>
                            <AppRouter/>

                            <DialogHost
                                performingAction={performingAction}
                                theme={theme}
                                user={user}
                                userData={userData}
                                openSnackbar={openSnackbar}
                                dialogs={{
                                    aboutDialog: {
                                        dialogProps: {
                                            open: aboutDialog.open,

                                            onClose: () => closeDialog("aboutDialog"),
                                        },
                                    },

                                    signUpDialog: {
                                        dialogProps: {
                                            open: signUpDialog.open,

                                            onClose: (callback) => {
                                                closeDialog("signUpDialog");

                                                if (callback && typeof callback === "function") {
                                                    callback();
                                                }
                                            },
                                        },
                                    },

                                    signInDialog: {
                                        dialogProps: {
                                            open: signInDialog.open,

                                            onClose: (callback) => {
                                                closeDialog("signInDialog");

                                                if (callback && typeof callback === "function") {
                                                    callback();
                                                }
                                            },
                                        },
                                    },

                                    settingsDialog: {
                                        dialogProps: {
                                            open: settingsDialog.open,

                                            onClose: () => closeDialog("settingsDialog"),
                                        },

                                        props: {
                                            onDeleteAccountClick: () =>
                                                openDialog("deleteAccountDialog"),
                                        },
                                    },

                                    deleteAccountDialog: {
                                        dialogProps: {
                                            open: deleteAccountDialog.open,

                                            onClose: () => closeDialog("deleteAccountDialog"),
                                        },

                                        props: {
                                            deleteAccount: deleteAccount,
                                        },
                                    },

                                    signOutDialog: {
                                        dialogProps: {
                                            open: signOutDialog.open,

                                            onClose: () => closeDialog("signOutDialog"),
                                        },

                                        props: {
                                            title: "Sign out?",
                                            contentText:
                                                "While signed out you are unable to manage your profile and conduct other activities that require you to be signed in.",
                                            dismissiveAction: (
                                                <Button
                                                    color="primary"
                                                    onClick={() => closeDialog("signOutDialog")}
                                                >
                                                    Cancel
                                                </Button>
                                            ),
                                            confirmingAction: (
                                                <Button
                                                    color="primary"
                                                    disabled={performingAction}
                                                    variant="contained"
                                                    onClick={signOut}
                                                >
                                                    Sign Out
                                                </Button>
                                            ),
                                        },
                                    },
                                }}
                            />

                            <Snackbar
                                autoHideDuration={snackbar.autoHideDuration}
                                message={snackbar.message}
                                open={snackbar.open}
                                onClose={closeSnackbar}
                            />
                        </>
                    )}
                </ErrorBoundary>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
