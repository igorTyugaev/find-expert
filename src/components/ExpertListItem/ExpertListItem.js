import React from 'react';
import {Avatar, Button, Chip, Rating, styled, Typography} from "@mui/material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const ItemInner = styled('div')(({theme}) => ({
    display: "inline-flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "calc(100% + 1em)",
    margin: "-1em 0 0 -1em",
    padding: "1em",
    "&:not(:last-child)": {
        borderBottom: "1px solid #c4c4c4"
    }
}));

const ItemContentCol = styled('div')(({theme}) => ({
    flex: "5 1 480px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    margin: "1em 0 0 1em"
}));

const ItemActionsCol = styled('div')(({theme}) => ({
    flex: "2 0 120px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: "1em 0 0 1em",
}));

const ChipGroup = styled('div')(({theme}) => ({
    display: "inline-flex",
    flexWrap: "wrap",
    width: "calc(100% + .6em)",
    margin: "-.6em 0 0 -.6em"
}));

const ChipItem = styled(Chip)(({theme}) => ({
    margin: ".6em 0 0 .6em",
    padding: ".5em"
}));

const BadgeAction = styled(Chip)(({theme}) => ({
    display: "flex",
    justifyContent: "center",
    width: '100%',
    padding: "1em",
    marginTop: "0.5em",
    color: "black",
    fontSize: "1.2em",
    fontWeight: "bold",
}));

const ItemAvatarCol = styled('div')(({theme}) => ({
    flex: "1 1 auto",
    display: "flex",
    align: "center",
    justifyContent: "center",
    paddingTop: "1em"
}));

const ExpertAvatar = styled(Avatar)(({theme}) => ({
    width: theme.spacing(14),
    height: theme.spacing(14),
    margin: "auto",
}));

const ExpertListItem = ({expert}) => {

    const handlerClick = () => {
        console.log("Choose order id", expert?.id);
    }

    return (
        <ItemInner>
            <ItemAvatarCol>
                <ExpertAvatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg"/>
            </ItemAvatarCol>
            <ItemContentCol>
                <Rating name="read-only" value={4} readOnly/>
                <Typography variant="h6" component="h3">
                    {expert?.title}
                </Typography>
                <ChipGroup sx={{marginTop: "0.2em"}}>
                    <ChipItem label="Small" size="small"/>
                    <ChipItem label="Small" size="small"/>
                    <ChipItem label="Small" size="small"/>
                </ChipGroup>
                <Typography sx={{margin: "0.3em 0"}} variant="p" component="p">
                    {expert?.description}
                </Typography>
                <Button sx={{marginTop: "auto"}} variant="outlined" onClick={handlerClick}>
                    Смотреть профиль
                </Button>
            </ItemContentCol>
            <ItemActionsCol>
                <Button variant="contained" color="primary">
                    Выбрать
                </Button>
                <BadgeAction icon={<LocalOfferIcon/>} label={expert?.budget} variant="outlined"/>
            </ItemActionsCol>
        </ItemInner>
    );
};

export default ExpertListItem;
