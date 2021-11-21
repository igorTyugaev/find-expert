import React from 'react';
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {
    Button,
    Stack,
} from "@mui/material";
import BaseCard from "../../components/BaseCard";
import {useAppContext} from "../../AppContext";
import UserService from "../../services/UserService";
import Field from "../../components/Field";
import {serviceListRu, subjectListRu} from "../../constants";

const ExpertFormPage = () => {
    const appContext = useAppContext();
    const history = useHistory();
    const {openSnackbar} = appContext;
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange",
    });

    const handlerBtnHeader = () => {
        history.push('/');
    };

    const onSubmit = (data) => {
        if (!data) return;
        updateProfile(data);
    };

    const updateProfile = (fields) => {
        UserService
            .updateProfile(fields)
            .then(() => {
                history.push("/");
            })
            .catch((reason) => {
                const message = reason.message;
                openSnackbar(message);
            })
    }

    return (
        <BaseCard
            title="Заполнить профиль эксперта"
            description="Расскажите о своих профессиональных достижениях и мы подберем для заказы персонально для Вас."
            btnTitle="Мои заказы"
            btnHandler={handlerBtnHeader}
            isPaddingBody>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={3}>
                    <Field name="expertServices"
                           {...register("expertServices", {required: true})}
                           error={!!errors?.expertServices}
                           helperText={errors?.expertServices?.message}
                           title="Ваши услуги"
                           label="Выберите услуги, по вашему профилю"
                           type="select"
                           options={serviceListRu}
                           multiple
                           fullWidth/>
                    <Field name="expertSubjects"
                           {...register("expertSubjects", {required: true})}
                           error={!!errors?.expertSubjects}
                           helperText={errors?.expertSubjects?.message}
                           title="Предметная область"
                           label="Выберите вашу предметную область"
                           type="select"
                           options={subjectListRu}
                           multiple
                           fullWidth/>
                    <Field name="expertPromo"
                           {...register("expertPromo", {required: true})}
                           error={!!errors?.expertPromo}
                           helperText={errors?.expertPromo?.message}
                           title="Продающий текст о себе"
                           label="Кратко опишите свои профессиональные навыки и образование"
                           type="text"
                           placeholder="Ваше личное заявление, которое может быть использовано для продвижения вас как эксперта"
                           multiline
                           rows={5}
                           fullWidth/>
                    <Field name="expertPortfolio"
                           {...register("expertPortfolio", {required: true})}
                           error={!!errors?.expertPortfolio}
                           helperText={errors?.expertPortfolio?.message}
                           title="Образование и профессиональные достижения"
                           label="Расскажите о своем опыте"
                           type="text"
                           placeholder="Пожалуйста, добавьте информацию о себе. Например о вашем происхождении, соотвествующем опыте работы и образовании"
                           multiline
                           rows={5}
                           fullWidth/>
                    <Field name="expertLink"
                           {...register("expertLink", {required: true})}
                           error={!!errors?.expertLink}
                           helperText={errors?.expertLink?.message}
                           title="Ссылка на соц. сети"
                           label="Ссылка на соц. сети"
                           fullWidth/>
                    <Button color="primary"
                            variant="contained"
                            type="submit">
                        Продолжить
                    </Button>
                </Stack>
            </form>
        </BaseCard>
    );
};

export default ExpertFormPage;
