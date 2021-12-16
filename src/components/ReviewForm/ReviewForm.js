import React from 'react';
import {Button, Stack} from "@mui/material";
import Field from "../Field";
import {useAppContext} from "../../AppContext";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import UserService from "../../services/UserService";

const ReviewForm = ({expert, handleSend}) => {
    const appContext = useAppContext();
    const history = useHistory();
    // Functions
    const {openSnackbar, user} = appContext;
    const {register, control, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange",
    });

    const onSubmit = (data) => {
        console.log(data)
        if (!data) return;
        updateProfile(data);
    };

    const updateProfile = (fields) => {
        console.log(expert)
        UserService
            .updateReviewsProfile(fields, expert, user)
            .then(() => {
                if (!handleSend) return;
                handleSend();
                // history.push("/select-role");
            })
            .catch((reason) => {
                const message = reason.message;
                openSnackbar(message);
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={3}>
                <Field name="review"
                       {...register("review", {required: true})}
                       error={!!errors?.review}
                       helperText={errors?.review?.message}
                       title="Ваш отзыв"
                       label="Напишите ваш отзыв"
                       placeholder="Пожалуйста, опишите как можно подробнее ваш отзыв"
                       multiline
                       rows={5}
                       type="text"
                       fullWidth/>
                <Field name="rate"
                       control={control}
                       rules={{required: true}}
                       error={!!errors?.rate}
                       helperText={errors?.rate?.message}
                       title="Ваша оценка"
                       label="Ваша оценка"
                       type="rating"
                       fullWidth/>
                <Button color="primary"
                        variant="contained"
                        type="submit">
                    Продолжить
                </Button>
            </Stack>
        </form>
    );
};

export default ReviewForm;
