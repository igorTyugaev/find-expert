import React, {Component} from "react";

import PropTypes from "prop-types";

import validate from "validate.js";

import withStyles from '@mui/styles/withStyles';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Tooltip,
    IconButton,
    Hidden,
    Grid,
    Button,
    Divider,
    TextField,
} from "@mui/material";

import {Close as CloseIcon} from "@mui/icons-material";

import AuthProviderList from "../AuthProviderList";

import constraints from "../../data/constraints";
import UserService from "../../services/UserService";

const styles = (theme) => ({
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
    },

    icon: {
        marginRight: theme.spacing(0.5),
    },

    divider: {
        margin: "auto",
    },

    grid: {
        marginBottom: theme.spacing(2),
    },
});

const initialState = {
    performingAction: false,
    emailAddress: "",
    password: "",
    errors: null,
};

class SignInDialog extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    getSignInButton = () => {
        const {emailAddress, password, performingAction} = this.state;

        if (emailAddress && !password) {
            return (
                <Button
                    color="primary"
                    disabled={!emailAddress || performingAction}
                    variant="contained"
                    onClick={() => this.sendSignInLinkToEmail()}
                >
                    Отправить ссылку для входа
                </Button>
            );
        }

        return (
            <Button
                color="primary"
                disabled={!emailAddress || performingAction}
                variant="contained"
                onClick={() => this.signIn()}
            >
                Войти
            </Button>
        );
    };

    resetPassword = () => {
        const {emailAddress} = this.state;

        const errors = validate(
            {
                emailAddress: emailAddress,
            },
            {
                emailAddress: constraints.emailAddress,
            }
        );

        if (errors) {
            this.setState({
                errors: errors,
            });
        } else {
            this.setState(
                {
                    errors: null,
                },
                () => {
                    this.setState(
                        {
                            performingAction: true,
                        },
                        () => {
                            UserService
                                .resetPassword(emailAddress)
                                .then((value) => {
                                    this.props.openSnackbar(
                                        `Письмо для сброса пароля отправлено на адрес ${emailAddress}`
                                    );
                                })
                                .catch((reason) => {
                                    const code = reason.code;
                                    const message = reason.message;

                                    switch (code) {
                                        case "auth/invalid-email":
                                        case "auth/missing-android-pkg-name":
                                        case "auth/missing-continue-uri":
                                        case "auth/missing-ios-bundle-id":
                                        case "auth/invalid-continue-uri":
                                        case "auth/unauthorized-continue-uri":
                                        case "auth/user-not-found":
                                            this.props.openSnackbar(message);
                                            return;

                                        default:
                                            this.props.openSnackbar(message);
                                            return;
                                    }
                                })
                                .finally(() => {
                                    this.setState({
                                        performingAction: false,
                                    });
                                });
                        }
                    );
                }
            );
        }
    };

    signIn = () => {
        const {emailAddress, password} = this.state;

        const errors = validate(
            {
                emailAddress: emailAddress,
                password: password,
            },
            {
                emailAddress: constraints.emailAddress,
                password: constraints.password,
            }
        );

        if (errors) {
            this.setState({
                errors: errors,
            });
        } else {
            this.setState(
                {
                    performingAction: true,
                    errors: null,
                },
                () => {
                    UserService
                        .signIn(emailAddress, password)
                        .then((user) => {
                            this.props.dialogProps.onClose(() => {
                                const displayName = user.displayName;
                                const emailAddress = user.email;

                                this.props.openSnackbar(
                                    `Вы вошли как ${displayName || emailAddress}`
                                );
                            });
                        })
                        .catch((reason) => {
                            const code = reason.code;
                            const message = reason.message;

                            switch (code) {
                                case "auth/invalid-email":
                                case "auth/user-disabled":
                                case "auth/user-not-found":
                                case "auth/wrong-password":
                                    this.props.openSnackbar(message);
                                    return;

                                default:
                                    this.props.openSnackbar(message);
                                    return;
                            }
                        })
                        .finally(() => {
                            this.setState({
                                performingAction: false,
                            });
                        });
                }
            );
        }
    };

    sendSignInLinkToEmail = () => {
        const {emailAddress} = this.state;

        const errors = validate(
            {
                emailAddress: emailAddress,
            },
            {
                emailAddress: constraints.emailAddress,
            }
        );

        if (errors) {
            this.setState({
                errors: errors,
            });

            return;
        }

        this.setState(
            {
                performingAction: true,
                errors: null,
            },
            () => {
                UserService
                    .sendSignInLinkToEmail(emailAddress)
                    .then(() => {
                        this.props.dialogProps.onClose(() => {
                            this.props.openSnackbar(`Письмо для входа отправлено на адрес ${emailAddress}`);
                        });
                    })
                    .catch((reason) => {
                        const code = reason.code;
                        const message = reason.message;

                        switch (code) {
                            case "auth/argument-error":
                            case "auth/invalid-email":
                            case "auth/missing-android-pkg-name":
                            case "auth/missing-continue-uri":
                            case "auth/missing-ios-bundle-id":
                            case "auth/invalid-continue-uri":
                            case "auth/unauthorized-continue-uri":
                                this.props.openSnackbar(message);
                                return;

                            default:
                                this.props.openSnackbar(message);
                                return;
                        }
                    })
                    .finally(() => {
                        this.setState({
                            performingAction: false,
                        });
                    });
            }
        );
    };

    signInWithAuthProvider = (provider) => {
        this.setState(
            {
                performingAction: true,
            },
            () => {
                UserService
                    .signInWithAuthProvider(provider)
                    .then((user) => {
                        this.props.dialogProps.onClose(() => {
                            const displayName = user.displayName;
                            const emailAddress = user.email;

                            this.props.openSnackbar(
                                `Вы вошли как ${displayName || emailAddress}`
                            );
                        });
                    })
                    .catch((reason) => {
                        const code = reason.code;
                        const message = reason.message;

                        switch (code) {
                            case "auth/account-exists-with-different-credential":
                            case "auth/auth-domain-config-required":
                            case "auth/cancelled-popup-request":
                            case "auth/operation-not-allowed":
                            case "auth/operation-not-supported-in-this-environment":
                            case "auth/popup-blocked":
                            case "auth/popup-closed-by-user":
                            case "auth/unauthorized-domain":
                                this.props.openSnackbar(message);
                                return;

                            default:
                                this.props.openSnackbar(message);
                                return;
                        }
                    })
                    .finally(() => {
                        this.setState({
                            performingAction: false,
                        });
                    });
            }
        );
    };

    handleKeyPress = (event) => {
        const {emailAddress, password} = this.state;

        if (!emailAddress && !password) {
            return;
        }

        const key = event.key;

        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return;
        }

        if (key === "Enter") {
            if (emailAddress && !password) {
                this.sendSignInLinkToEmail();
            } else {
                this.signIn();
            }
        }
    };

    handleExited = () => {
        this.setState(initialState);
    };

    handleEmailAddressChange = (event) => {
        const emailAddress = event.target.value;

        this.setState({
            emailAddress: emailAddress,
        });
    };

    handlePasswordChange = (event) => {
        const password = event.target.value;

        this.setState({
            password: password,
        });
    };

    render() {
        // Styling
        const {classes} = this.props;

        // Dialog Properties
        const {dialogProps} = this.props;

        const {performingAction, emailAddress, password, errors} = this.state;

        return (
            <Dialog
                fullWidth
                maxWidth="sm"
                disableEscapeKeyDown={performingAction}
                {...dialogProps}
                onKeyPress={this.handleKeyPress}
                TransitionProps={{
                    onExited: this.handleExited
                }}>
                <DialogTitle>
                    <Typography variant="span">Войдите в свой аккаунт</Typography>

                    <Tooltip title="Закрыть">
                        <IconButton
                            className={classes.closeButton}
                            disabled={performingAction}
                            onClick={dialogProps.onClose}
                            size="large">
                            <CloseIcon/>
                        </IconButton>
                    </Tooltip>
                </DialogTitle>

                <DialogContent>
                    <Grid container direction="column" spacing={2}>
                        <Grid item xs>
                            <TextField
                                autoComplete="email"
                                disabled={performingAction}
                                error={!!(errors && errors.emailAddress)}
                                fullWidth
                                helperText={
                                    errors && errors.emailAddress ? errors.emailAddress[0] : ""
                                }
                                label="E-mail адрес"
                                placeholder="simple@mail.com"
                                required
                                type="email"
                                value={emailAddress}
                                variant="outlined"
                                InputLabelProps={{required: false}}
                                onChange={this.handleEmailAddressChange}
                            />
                        </Grid>

                        <Grid item xs>
                            <TextField
                                autoComplete="current-password"
                                disabled={performingAction}
                                error={!!(errors && errors.password)}
                                fullWidth
                                helperText={
                                    errors && errors.password ? errors.password[0] : ""
                                }
                                label="Пароль"
                                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                                required
                                type="password"
                                value={password}
                                variant="outlined"
                                InputLabelProps={{required: false}}
                                onChange={this.handlePasswordChange}
                            />
                        </Grid>
                    </Grid>
                    <AuthProviderList
                        gutterTop
                        performingAction={performingAction}
                        onAuthProviderClick={this.signInWithAuthProvider}
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        color="primary"
                        disabled={!emailAddress || performingAction}
                        variant="outlined"
                        onClick={this.resetPassword}
                    >
                        Сбросить пароль
                    </Button>

                    {this.getSignInButton()}
                </DialogActions>
            </Dialog>
        );
    }
}

SignInDialog.propTypes = {
    // Styling
    classes: PropTypes.object.isRequired,

    // Dialog Properties
    dialogProps: PropTypes.object.isRequired,

    // Custom Functions
    openSnackbar: PropTypes.func.isRequired,
};

export default withStyles(styles)(SignInDialog);
