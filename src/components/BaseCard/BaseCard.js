import * as React from 'react';
import {Box, Button, Card, styled, Typography} from "@mui/material";
import PropTypes from "prop-types";

const ListWrapper = styled(Card)(({theme}) => ({
    width: '100%',
    display: "flex",
    flexDirection: "column"
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
    flexDirection: "column",
    padding: isPadding ? "1em" : 0,
    minHeight: "80vh",
    position: "relative",
}));

const BaseCard = ({children, title, description, btnTitle, btnHandler, isPaddingBody = false}) => {
    const handlerBtnHeader = () => {
        if (!btnHandler) return;
        btnHandler();
    }

    return (
        <ListWrapper>
            <ListHeader>
                <Box>
                    <Typography variant="h6" component="h3">
                        {title}
                    </Typography>
                    {description && <Typography color="gray" variant="body1" component="span">
                        {description}
                    </Typography>}
                </Box>
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
