import React from "react";
import {makeStyles} from "@mui/styles";
import {Box} from "@mui/material";

const useStyles = makeStyles({
    main: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",

        "@media (max-width: 642px)": {
            display: "flex",
            flexDirection: "column",
        },
    },

    col_1: {
        width: "60%",
        height: "100%",

        "@media (max-width: 642px)": {
            width: "100%",
        },
    },

    col_2: {
        width: "38%",
        "@media (max-width: 642px)": {
            width: "100%",
        },
    },

    titleDescription: {
        display: "inline-block",
        position: "relative",
        marginTop: "0px",
        minHeight: "32px",
        textDecoration: "none"
    },

    customInput: {
        marginTop: "0px",
        paddingTop: "0px",
    },

    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },

    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },

    title: {
        display: "inline-block",
        position: "relative",
        marginTop: "0px",
        minHeight: "32px",
        textDecoration: "none"
    },
});

export default function DialogItem(props) {
    const classes = useStyles();
    const {openSnackbar, dialog} = props;

    return (
        <Box className={classes.main}>
            <Box className={classes.col_1}>
                <DialogItemDescription dialog={dialog}/>
            </Box>

            <Box className={classNames(classes.col_2)}>
                <DialogActions dialog={dialog} openSnackbar={openSnackbar}/>
            </Box>
        </Box>
    );
}

