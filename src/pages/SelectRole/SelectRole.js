import React from 'react';
import {useHistory} from "react-router-dom";
import {styled} from "@mui/material";
import RoleCard from "../../components/RoleCard";
import StudentIllustration from "../../illustrations/student.svg";
import TeachingIllustration from "../../illustrations/teaching.svg";
import authentication from "../../services/authentication";
import {useAppContext} from "../../AppContext";

const roles = [
    {
        img: StudentIllustration,
        title: "Автор",
        label: "author",
        txtBtn: "Войти как автор",
        description:
            "Выберете профиль студента, если вы хотите найти опытного наставника,\n" +
            "который научит Вас тому, чего Вы желаете, а так же покажет как работать с \n" +
            "настоящей задачей и живым заказчиком. ",
    },

    {
        img: TeachingIllustration,
        title: "Эксперт",
        label: "expert",
        txtBtn: "Войти как эксперт",
        description:
            "Выберете профиль Наставника, если вы хотите найти желающих получать\n" +
            "знания студентов, а также интересные заказы, которыми Вы сможете пополнять\n" +
            "своё портфолио.",
    },
]

const SelectRoleWrapper = styled('div')(({theme}) => ({
    display: "inline-flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "calc(100% + 1em)",
    margin: "-1em 0 0 -1em"
}));

const SelectRoleItem = styled('div')(({theme}) => ({
    margin: "1em 0 0 1em"
}));

const SelectRole = () => {
    const valueContext = useAppContext();
    const history = useHistory();

    const {openSnackbar} = valueContext;
    const handleSelect = (selectedRole) => {
        console.log(selectedRole);
        updateProfileRole(selectedRole);
    }

    const updateProfileRole = (role) => {
        authentication
            .updateProfile({role})
            .then(() => {
                history.push("/");
            })
            .catch((reason) => {
                const message = reason.message;
                openSnackbar(message);
            })
    }

    return (
        <SelectRoleWrapper>
            <SelectRoleItem>
                <RoleCard role={roles[0]} handleSelect={handleSelect}/>
            </SelectRoleItem>
            <SelectRoleItem>
                <RoleCard role={roles[1]} handleSelect={handleSelect}/>
            </SelectRoleItem>
        </SelectRoleWrapper>
    );
};

export default SelectRole;
