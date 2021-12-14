import React from 'react';
import {useHistory} from "react-router-dom";
import {Box, styled, Typography} from "@mui/material";
import RoleCard from "../../components/RoleCard";
import StudentIllustration from "../../illustrations/student.svg";
import TeachingIllustration from "../../illustrations/teaching.svg";
import UserService from "../../services/UserService";
import {useAppContext} from "../../AppContext";

const roles = [
    {
        img: StudentIllustration,
        title: "Автор",
        label: "author",
        txtBtn: "Войти как автор",
        description:
            "Выберете профиль Автора, если вы хотите найти опытного эксперта,\n" +
            "который поможет Вам решить вашу проблему",
    },

    {
        img: TeachingIllustration,
        title: "Эксперт",
        label: "expert",
        txtBtn: "Войти как эксперт",
        description:
            "Выберете профиль Эксперт, если вы готовы выполнять заказы\n" +
            "ывапывапвыплот"
    },
]

const SelectRoleInner = styled('div')(({theme}) => ({
    display: "inline-flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "calc(100% + 1em)",
    margin: "-1em 0 0 -1em"
}));

const SelectRoleItem = styled('div')(({theme}) => ({
    margin: "1em 0 0 1em"
}));

const SelectRoleHeader = styled('div')(({theme}) => ({
    margin: "1em 0 0 1em"
}));

const SelectRolePage = () => {
    const appContext = useAppContext();
    const history = useHistory();

    const {openSnackbar} = appContext;
    const handleSelect = (selectedRole) => {
        console.log(selectedRole);
        updateProfileRole(selectedRole);
    }

    const updateProfileRole = (role) => {
        UserService
            .updateProfile({role, "isVerified": (Math.random() < 0.5)})
            .then(() => {
                history.push("/");
            })
            .catch((reason) => {
                const message = reason.message;
                openSnackbar(message);
            })
    }

    return (
        <Box sx={{margin: "auto", width: "100%", height: "100%"}}>
            <SelectRoleInner>
                <SelectRoleItem>
                    <Typography variant="h5" component="h3" align="center" sx={{fontWeight: "bold"}}>
                        Как вы планируете использовать приложение?
                    </Typography>
                    <Typography variant="body1" component="p" align="center">
                        Чтобы продолжить, выберите тип учетной записи
                    </Typography>
                </SelectRoleItem>
                <SelectRoleItem>
                    <RoleCard role={roles[0]} handleSelect={handleSelect}/>
                </SelectRoleItem>
                <SelectRoleItem>
                    <RoleCard role={roles[1]} handleSelect={handleSelect}/>
                </SelectRoleItem>
            </SelectRoleInner>
        </Box>
    );
};

export default SelectRolePage;
