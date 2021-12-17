import React from 'react';
import {Box, Button, Card, styled, Typography} from "@mui/material";
import PropTypes from "prop-types";

const ListWrapper = styled(Card)(({theme}) => ({
    width: '100%',
    display: "flex",
    flexDirection: "column",
    flexGrow: "0",
    height: `calc(100vh - ${theme.spacing(12)})`,
}));

const ListHeader = styled('div')(({theme}) => ({
    width: '100%',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1em",
    flex: "1 0 auto",
    borderBottom: "1px solid #c4c4c4",
    minHeight: "70px",
    height: "10%",

    "@media screen and (max-width: 720px)": {
        flexDirection: "column",
        alignItems: "flex-start",
        height: "18%",
    }
}));

const BtnHeader = styled(Button)(({theme}) => ({
    flexShrink: "0",
    "@media screen and (max-width: 720px)": {
        width: "100%",
        marginTop: "1em",
    }
}));

const ListBody = styled('div', {
    shouldForwardProp: (prop) => prop !== "isPadding"
})(({theme, isPadding}) => ({
    width: '100%',
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: isPadding ? "1em" : 0,
    height: "90%",

    "@media screen and (max-width: 720px)": {
        height: "82%",
    }
}));

const Title = styled(Typography)(({theme}) => ({
    display: "inline-block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "100%",
    "@media screen and (max-width: 540px)": {
        fontSize: "16px",
    }
}));

const ChatCard = ({children, title, description, btnTitle, btnHandler, isPaddingBody = false}) => {
    const handlerBtnHeader = () => {
        if (!btnHandler) return;
        btnHandler();
    }

    return (
        <ListWrapper>
            <ListHeader>
                <Title variant="h6" component="h3">
                    {title}
                </Title>
                {
                    btnTitle &&
                    <BtnHeader variant="outlined" onClick={handlerBtnHeader}>
                        {btnTitle}
                    </BtnHeader>
                }
            </ListHeader>
            <ListBody isPadding={isPaddingBody}>
                {children}
            </ListBody>
        </ListWrapper>
    );
}

ChatCard.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),

    // Custom Properties
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    btnTitle: PropTypes.string,
    btnHandler: PropTypes.func,
    isPaddingBody: PropTypes.bool,
};

export default ChatCard;
