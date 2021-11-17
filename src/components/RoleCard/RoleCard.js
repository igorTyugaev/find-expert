import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import * as PropTypes from "prop-types";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
});

const RoleCard = ({role, handleSelect}) => {
    const classes = useStyles();

    const handleClick = (event) => {
        if (!event) {
            return;
        }

        handleSelect(role?.label);
    };

    return (
        <Card className={classes.root}>

            <CardMedia
                component="img"
                height="140"
                image={role?.img}
                alt={role?.title}
                title={role?.title}
                sx={{width: "100%", objectFit: "contain", padding: "0.5em"}}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2" align="center">
                    {role?.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {role?.description}
                </Typography>
            </CardContent>

            <CardActions>
                <Button color="primary" variant="contained" fullWidth onClick={handleClick}>
                    {role?.txtBtn}
                </Button>
            </CardActions>

        </Card>
    );
}

RoleCard.propTypes = {
    role: PropTypes.object.isRequired,
    handleSelect: PropTypes.func.isRequired,
}

export default RoleCard;
