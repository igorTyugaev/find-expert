import React from 'react';
import {Button, Card, CardContent, CardMedia, styled, Typography} from "@mui/material";
import * as PropTypes from "prop-types";

const Role = styled(Card)(({theme}) => ({
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    padding: "1em",

    "@media screen and (max-width: 567px)": {
        flexDirection: "column"
    }
}));

const RoleHeader = styled(CardMedia)(({theme}) => ({
    width: "20%",
    minWidth: "120px",
    objectFit: "contain",
    padding: "0",
    paddingRight: "1em",

    "@media screen and (max-width: 567px)": {
        maxHeight: "180px",
        width: "100%",
        flexDirection: "column"
    }
}));

const RoleBody = styled('div')(({theme}) => ({
    width: "80%",
    padding: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",

    "@media screen and (max-width: 567px)": {
        width: "100%",
    }
}));

const RoleCard = ({role, handleSelect}) => {

    const handleClick = (event) => {
        if (!event) {
            return;
        }

        handleSelect(role?.label);
    };

    return (
        <Role>
            <RoleHeader
                component="img"
                image={role?.img}
                alt={role?.title}
                title={role?.title}
            />
            <RoleBody>
                <Typography gutterBottom variant="h5" component="h2">
                    {role?.title}
                </Typography>
                <Typography sx={{margin: "1em 0"}} variant="body2" color="textSecondary" component="p">
                    {role?.description}
                </Typography>
                <Button sx={{marginTop: "auto", minWidth: "180px"}} color="primary" variant="contained"
                        onClick={handleClick}>
                    {role?.txtBtn}
                </Button>
            </RoleBody>
        </Role>
    );
}

RoleCard.propTypes = {
    role: PropTypes.object.isRequired,
    handleSelect: PropTypes.func.isRequired,
}

export default RoleCard;
