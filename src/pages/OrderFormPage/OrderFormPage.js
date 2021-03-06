import React from 'react';
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import BaseCard from "../../components/BaseCard";
import {
    Button,
    Stack,
} from "@mui/material";
import Field from "../../components/Field";
import {useAppContext} from "../../AppContext";
import OrderService from "../../services/OrderService";
import {serviceListRu, subjectListRu} from "../../constants";

const OrderFormPage = () => {
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
        console.log(data);
        OrderService.updateOrder(data)
            .then(() => {
                history.push('/');
            })
            .catch((reason) => {
                const message = reason.message;
                openSnackbar(message);
            })
            .finally(() => {

            });
    };


    return (
        <BaseCard
            title="Разместить новый запрос"
            description="Добавьте как можно больше деталей к вашему запросу.
                Это поможет эксперам в формировании индивидуального предложения для Вас."
            btnTitle="Мои заказы"
            btnHandler={handlerBtnHeader}
            isPaddingBody>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={3}>
                    <Field name="title"
                           {...register("title", {required: true})}
                           error={!!errors?.title}
                           helperText={errors?.title?.message}
                           title="Название заказа"
                           label="Название заказа"
                           subtitle="Коротко опишите, что нужно сделать"
                           fullWidth/>
                    <Field name="description"
                           {...register("description", {required: true})}
                           error={!!errors?.description}
                           helperText={errors?.description?.message}
                           title="Опишите свой заказ"
                           label="Опишите свой заказ"
                           type="text"
                           placeholder="Пожалуйста, опишите как можно подробнее ваш заказ."
                           multiline
                           rows={5}
                           fullWidth/>
                    <Field name="services"
                           {...register("services", {required: true})}
                           error={!!errors?.services}
                           helperText={errors?.services?.message}
                           title="Услуга"
                           label="Выберите услугу"
                           type="select"
                           options={serviceListRu}
                           multiple
                           fullWidth/>
                    <Field name="subjects"
                           {...register("subjects", {required: true})}
                           error={!!errors?.subjects}
                           helperText={errors?.subjects?.message}
                           title="Предметная область"
                           label="Выберите вашу предметную область"
                           type="select"
                           options={subjectListRu}
                           multiple
                           fullWidth/>
                    <Field name="deadline"
                           {...register("deadline", {required: true})}
                           error={!!errors?.deadline}
                           helperText={errors?.deadline?.message}
                           title="Крайний срок"
                           label="Крайний срок"
                           type="date"
                           fullWidth/>
                    <Field name="budget"
                           {...register("budget", {required: true})}
                           error={!!errors?.budget}
                           helperText={errors?.budget?.message}
                           title="Бюджет"
                           label="Доступный бюджет"
                           type="number"
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

export default OrderFormPage;
