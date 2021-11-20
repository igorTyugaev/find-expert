import React from 'react';
import {useHistory} from "react-router-dom";
import {
    Button,
    Stack,
} from "@mui/material";
import BaseCard from "../../components/BaseCard";
import {useAppContext} from "../../AppContext";
import {useForm} from "react-hook-form";
import UserService from "../../services/UserService";
import Field from "../../components/Field";

const serviceList = [
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
                    <Field name="service"
                           {...register("service", {required: true})}
                           error={!!errors?.service}
                           helperText={errors?.service?.message}
                           title="Ваши услуги"
                           label="Выберите услуги, по вашему профилю"
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
                    <Field name="promo"
                           {...register("promo", {required: true})}
                           error={!!errors?.promo}
                           helperText={errors?.promo?.message}
                           title="Продающий текст о себе"
                           label="Кратко опишите свои профессиональные навыки и образование"
                           type="text"
                           placeholder="Ваше личное заявление, которое может быть использовано для продвижения вас как эксперта"
                           multiline
                           rows={5}
                           fullWidth/>
                    <Field name="portfolio"
                           {...register("portfolio", {required: true})}
                           error={!!errors?.portfolio}
                           helperText={errors?.portfolio?.message}
                           title="Образование и профессиональные достижения"
                           label="Расскажите о своем опыте"
                           type="text"
                           placeholder="Пожалуйста, добавьте информацию о себе. Например о вашем происхождении, соотвествующем опыте работы и образовании"
                           multiline
                           rows={5}
                           fullWidth/>
                    <Field name="link"
                           {...register("link", {required: true})}
                           error={!!errors?.link}
                           helperText={errors?.link?.message}
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
