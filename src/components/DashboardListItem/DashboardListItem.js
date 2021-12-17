import React from 'react';
import {Button, Chip, Link, styled, Typography} from "@mui/material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EditIcon from '@mui/icons-material/Edit';
import {NavLink} from "react-router-dom";
import ButtonAction from "./ButtonAction";

const Item = styled('div')(({theme}) => ({
    width: '100%',
    display: "flex",
    flexDirection: "column",
    padding: "1em",
    borderBottom: "1px solid #c4c4c4",
    minHeight: "180px"
}));

const ItemHeader = styled('div')(({theme}) => ({
    display: "inline-flex",
    flexWrap: "wrap",
    width: "calc(100% + .6em)",
    margin: "-.6em 0 0 -.6em"
}));

const BadgeHeader = styled(Chip)(({theme}) => ({
    margin: ".6em 0 0 .6em",
    padding: ".5em"
}));

const ItemBody = styled('div')(({theme}) => ({
    width: '100%',
    display: "flex",
    flexDirection: "column",
    margin: "0.5em 0"
}));

const ItemFooter = styled('div')(({theme}) => ({
    width: '100%',
    display: "flex",
    marginTop: "auto"
}));

const Title = styled(Typography)(({theme}) => ({
    "@media screen and (max-width: 540px)": {
        fontSize: "16px",
    }
}));

const Description = styled(Typography)(({theme}) => ({
    "@media screen and (max-width: 540px)": {
        fontSize: "14px",
    }
}));

const DashboardListItem = ({orderId, status, budget, deadline, title, description, expert}) => {

    return (
        <Item>
            <ItemHeader>
                <BadgeHeader label={status}/>
                <BadgeHeader icon={<LocalOfferIcon/>} label={`₽${budget}`} variant="outlined"/>
                <BadgeHeader icon={<DateRangeIcon/>} label={deadline} variant="outlined"/>
            </ItemHeader>
            <ItemBody>
                <Title variant="h6" component="h3">
                    <Link
                        style={{wordBreak: "break-word"}}
                        color="inherit"
                        component={NavLink}
                        to={`/order/${orderId}`}
                        underline="none"
                    >
                        {title || "Без заголовка"}
                    </Link>
                </Title>
                <Description sx={{marginTop: "0.2em"}} variant="p" component="p" style={{wordBreak: "break-word"}}>
                    {description}
                </Description>
            </ItemBody>
            <ItemFooter>
                {status && <ButtonAction orderId={orderId} status={status} expert={expert}/>}
            </ItemFooter>
        </Item>
    );
};

export default DashboardListItem;
