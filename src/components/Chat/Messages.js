import React from "react";
import {NavLink} from "react-router-dom";

import {Anchorme} from "react-anchorme";
import {Avatar, Grid, IconButton, Link} from "@mui/material";
import {deepPurple} from "@mui/material/colors";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        width: "100%",
    },
    paperSent: {
        display: "flex",
        alignItems: "center",
        color: "black",
        borderRadius: theme.spacing(1),
        padding: theme.spacing(1.4),
        width: "100%",

        "&:hover": {
            background: "#e5e5ea",
        },

        "@media screen and (max-width: 540px)": {
            padding: 0,
            "&:hover": {
                backgroundColor: "transparent",
            },
        }
    },

    paperReceived: {
        display: "flex",
        alignItems: "center",
        color: "black",
        borderRadius: theme.spacing(1),
        padding: theme.spacing(1.5),
        width: "100%",

        "&:hover": {
            background: "#e5e5ea",
        },

        "@media screen and (max-width: 540px)": {
            padding: 0,
            "&:hover": {
                backgroundColor: "transparent",
            },
        }
    },
    avatar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "@media screen and (max-width: 540px)": {
            display: "none"
        }
    },
    message: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: "1rem",
        width: "100%",
        marginTop: "1em",

        "@media screen and (max-width: 540px)": {
            borderBottom: "1px solid #c4c4c4",
            padding: 0
        }
    },
    chatHeading: {
        marginBlockStart: 0,
        marginBlockEnd: 0,
        display: "inline-block",
        fontSize: "1rem",
        fontWeight: "600",
        maxWidth: "40vw",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        paddingRight: "0.5em",
    },
    chatTimming: {
        marginBlockStart: 0,
        marginBlockEnd: 0,
        display: "inline-block",
    },
    chatText: {
        wordBreak: "break-all",
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: "#3f51b5",
    },
    emojiDiv: {
        position: "absolute",
        right: 0,
        top: 0,
    },
    emojiDivInner: {
        position: "absolute",
        right: 0,
        padding: "0 35px 0 32px",
    },
    emojiBtn: {
        fontSize: "1.1rem",
        color: "rgb(255 195 54)",
    },
    allEmoji: {
        backgroundColor: "#2d2e31ba",
        borderRadius: "5px",
        paddingLeft: "2px",
        paddingRight: "2px",
        display: "flex",
    },
    countEmojiBtn: {
        padding: "3px",
        borderRadius: "4px",
        fontSize: "0.8em",
        backgroundColor: "#ffffff4a",
        color: "#cacaca",
        paddingLeft: "5px",
        paddingRight: "5px",
        "&:hover": {
            backgroundColor: "#ffffff4a",
            color: "#e7e7e7",
        },
    },
}));

function Messages({values, msgId, user, userData}) {
    const classes = useStyles();

    const senderUid = user.uid;
    const messegerUid = values.uid;
    const date = values.timestamp.toDate();
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const time = `${day}/${month}/${year}   ${hour}:${minute}`;

    const postImg = values.postImg;
    const messageClass = messegerUid === senderUid ? classes.paperSent : classes.paperReceived;

    return (
        <div className={classes.root}>
            <div className={messageClass}>
                <div className={classes.avatar}>
                    <IconButton
                        color="inherit"
                        component={NavLink} to={`/user/${messegerUid}`}>
                        <Avatar
                            alt={values.userName}
                            src={values.userImg}
                            className={classes.purple}
                        />
                    </IconButton>
                </div>

                <div className={classes.message}>
                    <Grid item container direction="row">
                        <h6 className={classes.chatHeading}>
                            <Link
                                color="inherit"
                                component={NavLink}
                                to={`/user/${messegerUid}`}
                                underline="none"
                            >
                                {values.userName}
                            </Link>
                        </h6>
                        <p className={classes.chatTimming}>{time}</p>
                    </Grid>

                    <div className={classes.chatText}>
                        {values.text.split("\n").map((txt, idx) => (
                            <p key={idx} style={{marginTop: 0}}>
                                <Anchorme target="_blank" rel="noreferrer noopener">
                                    {txt}
                                </Anchorme>
                            </p>
                        ))}
                    </div>

                    <Grid item xs={12} md={12} style={{paddingTop: "5px"}}>
                        {postImg ? (
                            <img
                                src={postImg}
                                alt="user"
                                style={{height: "30vh", width: "auto", borderRadius: "4px"}}
                            />
                        ) : null}
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default Messages;
