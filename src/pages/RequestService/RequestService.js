import React from 'react';
import {useHistory} from "react-router-dom";
import BaseCard from "../../components/BaseCard";
import {
    Button,
    Card,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    styled,
    TextField,
    Typography
} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';

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

const Field = styled('div')(({theme}) => ({
    width: "100%",
    "& > *:last-child": {
        marginTop: "1em"
    }
}));

const RequestService = () => {
    const history = useHistory();
    const [service, setService] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const [date, setDate] = React.useState(new Date());

    const handlerMyOrder = () => {
        history.push('/');
    }
    const handleService = (event) => {
        setService(event.target.value);
    };

    const handleSubject = (event) => {
        setSubject(event.target.value);
    };

    const handleDate = (newValue) => {
        setDate(newValue);
    };

    return (
        <div>
            <BaseCard
                title="Разместить новый запрос"
                description="Добавьте как можно больше деталей к вашему запросу.
                Это поможет эксперам в формировании индивидуального предложения для Вас."
                btnTitle="Мои заказы"
                btnHandler={handlerMyOrder}
                isPaddingBody>
                <Stack spacing={3}>
                    <Field>
                        <Typography variant="h6" component="h3">
                            Услуга
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel>Выберите услугу</InputLabel>
                            <Select
                                value={service}
                                label="Выберите услугу"
                                onChange={handleService}
                            >
                                {serviceList.map((item) => <MenuItem
                                    value={item.toLocaleLowerCase()}>{item}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Field>
                    <Field>
                        <Typography variant="h6" component="h3">
                            Предметная область
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel>Выберите предметную область</InputLabel>
                            <Select
                                value={subject}
                                label="Выберите предметную область"
                                onChange={handleSubject}
                            >
                                {subjectList.map((item) => <MenuItem
                                    value={item.toLocaleLowerCase()}>{item}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Field>
                    <Field>
                        <Typography variant="h6" component="h3">
                            Опишите свой заказ
                        </Typography>
                        <TextField placeholder="Пожалуйста, опишите как можно подробнее ваш заказ.
                               Например: предысторию вашего исследовани, количество слов, необходимые сроки (когда оно должно быть закончено).
                               Если возможно, пожалуйста, также укажите свой уровень английского языка (базовый/средний/продвинутый)."
                                   label="Опишите Ваш запрос"
                                   multiline
                                   fullWidth
                                   rows={5}
                        />
                    </Field>
                    <Field>
                        <Typography variant="h6" component="h3">
                            Крайний срок
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Крайний срок"
                                inputFormat="MM/dd/yyyy"
                                value={date}
                                onChange={handleDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Field>
                    <Field>
                        <Typography variant="h6" component="h3">
                            Бюджет
                        </Typography>
                        <TextField
                            fullWidth
                            label="Доступный бюджет"
                            type="number"
                        />
                    </Field>
                    <Button color="primary" variant="contained" type="submit">Продолжить</Button>
                </Stack>
            </BaseCard>
        </div>
    );
};

export default RequestService;
