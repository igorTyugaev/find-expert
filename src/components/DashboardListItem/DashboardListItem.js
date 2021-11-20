import React from 'react';
import {Button, Chip, styled, Typography} from "@mui/material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DateRangeIcon from '@mui/icons-material/DateRange';

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

const DashboardListItem = ({id, status, budget, deadline, title, description, handlerOrder}) => {
    const handlerBtn = () => {
        console.log("Choose order id", id);
        if (!handlerOrder) return;
        handlerOrder(id);
    }

    return (
        <Item>
            <ItemHeader>
                <BadgeHeader label={status}/>
                <BadgeHeader icon={<LocalOfferIcon/>} label={`₽${budget}`} variant="outlined"/>
                <BadgeHeader icon={<DateRangeIcon/>} label={deadline} variant="outlined"/>
            </ItemHeader>
            <ItemBody>
                <Typography variant="h6" component="h3">
                    {title}
                </Typography>
                <Typography sx={{marginTop: "0.2em"}} variant="p" component="p">
                    {description}
                </Typography>
            </ItemBody>
            <ItemFooter>
                <Button sx={{marginTop: "auto"}} variant="outlined" onClick={handlerBtn}>
                    Подробнее
                </Button>
            </ItemFooter>
        </Item>
    );
};

export default DashboardListItem;
