import React from 'react';
import {useHistory} from "react-router-dom";
import {Button, Stack} from "@mui/material";
import UserService from "../../services/UserService";
import {useAppContext} from "../../AppContext";
import Field from "../../components/Field";
import BaseCard from "../../components/BaseCard";
import {useForm} from "react-hook-form";

const UserFormPage = () => {
    const appContext = useAppContext();
    const history = useHistory();
    // Functions
    const {openSnackbar} = appContext;
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange",
    });

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
