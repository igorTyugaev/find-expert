import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import BaseCard from "../../components/BaseCard";
import {
    Button,
    Stack,
} from "@mui/material";
import Field from "../../components/Field";
import {useForm} from "react-hook-form";
import {useAppContext} from "../../AppContext";
import OrderService from "../../services/OrderService";

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

const serviceListRu = [
    // "(Grant) Proposal editing", // редактирование предложения? содержания?
    // "(Grant) Proposal review", // проверка содержания?
    "Помощь с приложением",
    // "Copy editing", 
    "Копирайтинг",
    "Написание резюме",
    "Помощь в сборе данных",
    "Управление данными",
    "Помощь в распределении данных",
    "Визуализация данных",
    "Редактирование рисунков",
    "Индексирование сервисов",
    "Руководство журнала",
    "Проверка языка",
    "Поиск литературы",
    "Обзор манускрипта",
    "Помощь в написании манускрипта",
    // "OA book funding service",
    "Редактирование после машинного перевода",
    // "Promotion services",
    "Помощь в публикации",
    "Ментор при поиске",
    "Права и доступ",
    "Научное редактирование",
    "Статистика и анализ данных",
    "Проверка статисктики",
    // "Study design",
    // "Submission service",
    "Работа над тезисом",
    "Работа над переводом",
    "Транслитерация",
    "Графические и видео абстракции",
    "Семинар/тренинг",
    "Другое"
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

const subjectListRu = [
    "Здоровье",
    "Медицина и стоматология",
    "Уход за больными",
    "Фармакология, токсикология и фармацевтика",
    "Ветеринарная наука и медицина",
    "Наука о жизни",
    "Сельскохозяйственные и биологические науки",
    "Биохимия, генетика и молекулярная биология",
    "Наука об окружающей среде",
    "Иммунология и микробиология",
    "Неврология",
    "Физические науки",
    "Химическая инженерия",
    "Химия",
    "Информатика",
    "Науки о Земле и планетах",
    "Энергия",
    "Инженерное дело",
    "Материаловедение",
    "Математика",
    "Физика и астрономия",
    "Социальные и гуманитарные науки",
    "Искусство и гуманитарные науки",
    "Бизнес, менеджмент и бухгалтерский учет",
    "Науки о принятии решений",
    "Экономика, эконометрика и финансы",
    "Психология",
    "Социальные науки"
];
const OrderFormPage = () => {
    const valueContext = useAppContext();
    const history = useHistory();
    const {openSnackbar} = valueContext;
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
                const code = reason.code;
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
                    <Field name="service"
                           {...register("service", {required: true})}
                           error={!!errors?.service}
                           helperText={errors?.service?.message}
                           title="Услуга"
                           label="Выберите услугу"
                           type="select"
                        options={serviceListRu}
                        fullWidth/>
                    <Field name="subject"
                           {...register("subject", {required: true})}
                           error={!!errors?.subject}
                           helperText={errors?.subject?.message}
                           title="Предметная область"
                           label="Выберите вашу предметную область"
                           type="select"
                        options={subjectListRu}
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
