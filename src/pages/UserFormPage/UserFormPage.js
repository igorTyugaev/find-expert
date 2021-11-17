import React, {useEffect, useState} from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {
    Box,
    Button,
    Container,
    Grid,
    Step,
    StepLabel,
    Stepper,
    Typography
} from "@mui/material";
import authentication from "../../services/authentication";
import validate from "validate.js";
import constraintsAuth from "../../data/constraintsAuth";
import RoleCard from "../../components/RoleCard";
import ProfileEdit from "../../components/ProfileEdit";
import {useAppContext} from "../../AppContext";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        marginTop: theme.spacing(14),
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    stepper: {
        width: "100%",
        paddingLeft: 0,
        paddingRight: 0,
    },
    inner: {
        width: "100%",
        height: "100%",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    action: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));

function getSteps() {
    return [
        'Выбрать роль',
        'Заполнить профиль',
        'Начать пользоваться сайтом'
    ];
}

function UserFormPage(props) {
    const valueContext = useAppContext();
    const {theme, openSnackbar} = valueContext;

    const classes = useStyles();
    const steps = getSteps();

    // Defining initial state
    const [activeStep, setActiveStep] = useState(0);
    // Base user info
    const [errors, setErrors] = useState(null);
    const [role, setRole] = useState(null);
    const [fullName, setFullName] = useState("");
    const [dateBirth, setDateBirth] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [aboutUser, setAboutUser] = useState("");

    const [position, setPosition] = useState("");
    const [company, setCompany] = useState("");
    const [city, setCity] = useState("");
    const [education, setEducation] = useState("");
    const [experience, setExperience] = useState("");
    const [serviceCost, setServiceCost] = useState("");

    const values = {
        errors,
        role,
        fullName,
        dateBirth,
        phoneNumber,
        aboutUser,
        position,
        company,
        city,
        education,
        experience,
        serviceCost
    }

    const changeField = (value, fieldId) => {
        if (!fieldId) {
            return;
        }

        const errorsCurrent = validate(
            {
                fullName: fullName,
                dateBirth: dateBirth,
                phoneNumber: phoneNumber,
                education: education,
                experience: experience,
            },
            {
                fullName: constraintsAuth.fullName,
                dateBirth: constraintsAuth.dateBirth,
                phoneNumber: constraintsAuth.phoneNumber,
                education: constraintsAuth.education,
                experience: constraintsAuth.experience,
            }
        );

        if (!errorsCurrent)
            setErrors(null);
        else
            setErrors(errorsCurrent);

        switch (fieldId) {
            case "fullName":
                setFullName(value);
                return;

            case "dateBirth":
                setDateBirth(value);
                return;

            case "phoneNumber":
                setPhoneNumber(value);
                return;

            case "aboutUser":
                setAboutUser(value);
                return;

            case "position":
                setPosition(value);
                return;

            case "company":
                setCompany(value);
                return;


            case "city":
                setCity(value);
                return;

            case "education":
                setEducation(value);
                return;

            case "experience":
                setExperience(value);
                return;

            case "serviceCost":
                setServiceCost(value);
                return;

            default:
                return;
        }
    };

    const checkValid = () => {
        if (role.toLowerCase() === "mentor") {
            const errorsCurrent = validate(
                {
                    fullName: fullName,
                    dateBirth: dateBirth,
                    phoneNumber: phoneNumber,
                    education: education,
                },
                {
                    fullName: constraintsAuth.fullName,
                    dateBirth: constraintsAuth.dateBirth,
                    phoneNumber: constraintsAuth.phoneNumber,
                    education: constraintsAuth.education,
                }
            );

            return errorsCurrent;

        } else if (role.toLowerCase() === "student") {

            const errorsCurrent = validate(
                {
                    fullName: fullName,
                    dateBirth: dateBirth,
                    phoneNumber: phoneNumber,
                    education: education,
                },
                {
                    fullName: constraintsAuth.fullName,
                    dateBirth: constraintsAuth.dateBirth,
                    phoneNumber: constraintsAuth.phoneNumber,
                    education: constraintsAuth.education,
                }
            );
            return errorsCurrent;

        } else if (role.toLowerCase() === "customer") {
            const errorsCurrent = validate(
                {
                    fullName: fullName,
                    dateBirth: dateBirth,
                    phoneNumber: phoneNumber,
                },
                {
                    fullName: constraintsAuth.fullName,
                    dateBirth: constraintsAuth.dateBirth,
                    phoneNumber: constraintsAuth.phoneNumber,
                }
            );

            return errorsCurrent;
        }
    };

    // creating user and submitting data to firebase
    const submitForm = (values) => {

        const errorsCurrent = checkValid();

        if (!errorsCurrent) {
            setErrors(null);

            authentication
                .updateProfile(values)
                .then(() => {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                })
                .catch((reason) => {
                    const code = reason.code;
                    const message = reason.message;

                    switch (code) {
                        default:
                            openSnackbar(message);
                            return;
                    }
                })
                .finally(() => {
                });
        } else {
            setErrors(errorsCurrent);
            return;
        }
    }

    const handleNext = () => {
        if (activeStep === 1) {
            submitForm(values);
        } else
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const StepperContent = ({activeStep, handleNext, setRole}) => {
        switch (activeStep) {
            case 1:
                return (
                    <div></div>
                )
            case 0:
                return (
                    <ProfileEdit
                        theme={theme}
                        openSnackbar={openSnackbar}
                        changeField={changeField}
                        values={values}
                    />
                );
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'Unknown active step';
        }
    }

    useEffect(() => {
        if (role) {
            setErrors(null);
            values.errors = null;
        }

    }, [role]);

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box className={classes.inner}>
                <StepperContent activeStep={activeStep} handleNext={handleNext} setRole={setRole}/>
                <Box className={classes.action}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                    >
                        Назад
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Сохранить' : 'Далее'}
                    </Button>
                </Box>
                {/*activeStep === steps.length*/}
                <Typography>Все шаги выполнены</Typography>
                <Button onClick={handleReset}>Сбросить</Button>
            </Box>
        </div>
    );
}

export default UserFormPage;
