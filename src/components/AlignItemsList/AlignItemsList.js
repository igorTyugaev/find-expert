import React, {Fragment, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {ExpertsService} from "../../services/ExpertsService";
import {styled} from "@mui/material";


const AuthorItem = styled(ListItem)(({theme}) => ({
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.03)"
    }
}));

const AlignItemsList = () => {
    const history = useHistory();
    const useItems = () => {
        const [experts, setExperts] = useState([]);

        useEffect(() => {
            const unsubscribe = ExpertsService
                .getAllExperts()
                .limit(4)
                .onSnapshot((snapshot) => {
                    const items = snapshot.docs
                        .map(doc => ({
                            expertId: doc.id,
                            ...doc.data(),
                        }))
                        .filter((item) => !!item?.expertPromo);
                    setExperts(items);
                }, (error) => {
                    const message = error?.message;
                    console.log(message);
                })
            return () => unsubscribe();
        }, [])
        return experts;
    }
    const experts = useItems();

    const handlerProfile = (expertId) => {
        if (!expertId) return;
        history.push(`/user/${expertId}`)
    }

    return (
        <List sx={{padding: 0}}>
            {experts && experts.map(({expertId, fullName, expertPromo, avatar}, index) => (
                <Fragment key={expertId}>
                    <AuthorItem alignItems="flex-start" onClick={() => handlerProfile(expertId)}>
                        <ListItemAvatar>
                            <Avatar alt={fullName || "Безымянный"} src={avatar}/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={fullName || "Безымянный"}
                            secondary={
                                <Typography
                                    sx={{display: 'inline'}}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {expertPromo?.slice(0, 90) || ""}...
                                </Typography>
                            }
                        />
                    </AuthorItem>
                    {index !== (experts.length - 1) && < Divider variant="inset" component="li"/>}
                </Fragment>
            ))}
        </List>
    );
}

export default AlignItemsList;
