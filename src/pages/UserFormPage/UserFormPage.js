import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {Box, Button, Stack, styled, Typography} from "@mui/material";
import RoleCard from "../../components/RoleCard";
import StudentIllustration from "../../illustrations/student.svg";
import TeachingIllustration from "../../illustrations/teaching.svg";
import UserService from "../../services/UserService";
import {useAppContext} from "../../AppContext";
import Field from "../../components/Field";
import BaseCard from "../../components/BaseCard";
import {useForm} from "react-hook-form";

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

const UserFormPage = () => {
    const appContext = useAppContext();
    const history = useHistory();
    // Functions
    const {openSnackbar} = appContext;
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange",
    });

    const handleSelect = (selectedRole) => {
        updateProfile(selectedRole);
    }

    const onSubmit = (data) => {
        if (!data) return;
        updateProfile(data);
    };

    const updateProfile = (fields) => {
        UserService
            .updateProfile(fields)
            .then(() => {
                history.push("/select-role");
            })
            .catch((reason) => {
                const message = reason.message;
                openSnackbar(message);
            })
    }


    return <BaseCard
        title="Форма регистрации"
        description="Прежде чем мы начнем, давайте познакомимся!"
        isPaddingBody>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={3}>
                <Field name="fullName"
                       {...register("fullName", {required: true})}
                       error={!!errors?.fullName}
                       helperText={errors?.fullName?.message}
                       title="Укажите Ваше ФИО"
                       label="ФИО"
                       type="text"
                       fullWidth/>
                <Field name="birthday"
                       {...register("birthday", {required: true})}
                       error={!!errors?.birthday}
                       helperText={errors?.birthday?.message}
                       title="Дата рождения"
                       label="Дата рождения"
                       type="date"
                       fullWidth/>
                <Button color="primary"
                        variant="contained"
                        type="submit">
                    Продолжить
                </Button>
            </Stack>
        </form>
    </BaseCard>


};

export default UserFormPage;
