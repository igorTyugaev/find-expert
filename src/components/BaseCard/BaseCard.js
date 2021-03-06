import React from 'react';
import {Box, Button, Card, styled, Typography} from "@mui/material";
import PropTypes from "prop-types";

const ListWrapper = styled(Card)(({theme}) => ({
    width: '100%',
    display: "flex",
    flexDirection: "column",
    height: "100%",
    minHeight: "86vh"
}));

const ListHeader = styled('div')(({theme}) => ({
    width: '100%',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1em",
    borderBottom: "1px solid #c4c4c4",
    minHeight: "70px",
    flex: "0 0 auto",

    "@media screen and (max-width: 720px)": {
        flexDirection: "column",
        alignItems: "flex-start",
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
    flex: "1 0 auto",
    flexDirection: "column",
    padding: isPadding ? "1em" : 0,
    minHeight: "420px",
}));

const Title = styled(Typography)(({theme}) => ({
    wordBreak: "normal",
    "@media screen and (max-width: 540px)": {
        fontSize: "16px",
    }
}));

const Description = styled(Typography)(({theme}) => ({
    wordBreak: "normal",
    "@media screen and (max-width: 540px)": {
        fontSize: "14px",
    }
}));

const BaseCard = ({children, title, description, btnTitle, btnHandler, disabled, isPaddingBody = false}) => {
    const handlerBtnHeader = () => {
        if (!btnHandler) return;
        btnHandler();
    }

    return (
        <ListWrapper>
            <ListHeader>
                <Box>
                    <Title variant="h6" component="h3">
                        {title}
                    </Title>
                    {description && <Description color="gray" variant="body1" component="span">
                        {description}
                    </Description>}
                </Box>
                {
                    btnTitle &&
                    <BtnHeader variant="outlined" disabled={disabled} onClick={handlerBtnHeader}>
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

BaseCard.propTypes = {
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

export default BaseCard;
