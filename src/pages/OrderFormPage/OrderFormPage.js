import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import BaseCard from "../../components/BaseCard";
import {
    Button,
    Stack,
} from "@mui/material";
import Field from "../../components/Field";
import {useForm} from "react-hook-form";

const serviceList = [
    "Select a service",
    "(Grant) Proposal editing",
    "(Grant) Proposal review",
    "(PhD) Application support",
    "Copy editing",
    "Copy writing ",
    "CV support",
    "Data collection support",
    "Data management",
    "Data sharing support",
    "Data visualisation",
    "Figure editing",
    "Indexing services",
    "Journal guidance",
    "Language editing",
    "Literature search",
    "Manuscript review",
    "Manuscript writing support",
    "OA book funding service",
    "Post editing after Machine Translation",
    "Promotion services",
    "Publication support",
    "Research mentor",
    "Rights and permissions",
    "Scientific editing",
    "Statistical and data analysis",
    "Statistical review",
    "Study design",
    "Submission service",
    "Thesis services",
    "Translation services",
    "Transliteration",
    "Video and graphical abstracts",
    "Workshop/training",
    "Other"
];
const subjectList = [
    "Select a subject area",
    "Health Sciences",
    "Medicine and Dentistry",
    "Nursing and Health Professions",
    "Pharmacology, Toxicology and Pharmaceutical Science",
    "Veterinary Science and Veterinary Medicine",
    "Life Sciences",
    "Agricultural and Biological Sciences",
    "Biochemistry, Genetics and Molecular Biology",
    "Environmental Science",
    "Immunology and Microbiology",
    "Neuroscience",
    "Physical Sciences",
    "Chemical Engineering",
    "Chemistry",
    "Computer Science",
    "Earth and Planetary Sciences",
    "Energy",
    "Engineering",
    "Materials Science",
    "Mathematics",
    "Physics and Astronomy",
    "Social Sciences and Humanities",
    "Arts and Humanities",
    "Business, Management and Accounting",
    "Decision Sciences",
    "Economics, Econometrics and Finance",
    "Psychology",
    "Social Sciences"
];

const OrderFormPage = () => {
    const history = useHistory();
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onChange",
    });

    useEffect(() => {
        console.log(errors)
    }, [errors]);

    const handlerBtnHeader = () => {
        history.push('/');
    };

    const onSubmit = (data) => {
        console.log(data)
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
                    <Field name="service"
                           {...register("service", {required: true})}
                           error={!!errors?.service}
                           helperText={errors?.service?.message}
                           title="Услуга"
                           label="Выберите услугу"
                           type="select"
                           options={serviceList}
                           fullWidth/>
                    <Field name="subject"
                           {...register("subject", {required: true})}
                           error={!!errors?.subject}
                           helperText={errors?.subject?.message}
                           title="Предметная область"
                           label="Выберите вашу предметную область"
                           type="select"
                           options={subjectList}
                           multiple
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
