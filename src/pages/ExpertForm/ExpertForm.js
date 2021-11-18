import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {
    Box,
    Button,
    Chip,
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
import BaseCard from "../../components/BaseCard";
import SelectMultiple from "../../components/SelectMultiple";

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

const Field = styled('div')(({theme}) => ({
    width: "100%",
    "& > *:last-child": {
        marginTop: "1em"
    }
}));

const ExpertForm = () => {
    const history = useHistory();
    const [service, setService] = useState([]);
    const [subject, setSubject] = useState([]);

    const handlerMyOrder = () => {
        history.push('/');
    }

    return (
        <div>
            <BaseCard
                title="Заполнить профиль эксперта"
                description="Расскажите о своих профессиональных достижениях и мы подберем для заказы персонально для Вас."
                btnTitle="Мои заказы"
                btnHandler={handlerMyOrder}
                isPaddingBody>
                <Stack spacing={3}>
                    <Field>
                        <Typography variant="h6" component="h3">
                            Выберите услуги, по вашему профилю
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel>
                                Выберите услуги, по вашему профилю
                            </InputLabel>
                            <SelectMultiple list={serviceList} data={service} setData={setService}
                                            title="Выберите услуги, по вашему профилю"/>
                        </FormControl>
                    </Field>
                    <Field>
                        <Typography variant="h6" component="h3">
                            Предметная область
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel>
                                Выберите вашу предметную область
                            </InputLabel>
                            <SelectMultiple list={subjectList} data={subject} setData={setSubject}
                                            title="Выберите вашу предметную область"/>
                        </FormControl>
                    </Field>
                    <Field>
                        <Typography variant="h6" component="h3">
                            Мотивационное письмо
                        </Typography>
                        <TextField
                            placeholder="Ваше личное заявление, которое может быть использовано для продвижения вас как эксперта"
                            label="Ваше личное заявление"
                            multiline
                            fullWidth
                            rows={5}
                        />
                    </Field>
                    <Field>
                        <Typography variant="h6" component="h3">
                            О вас
                        </Typography>
                        <TextField
                            placeholder="Пожалуйста, добавьте информацию о себе. Например о вашем происхождении, соотвествующем опыте работы и образовании"
                            label="Расскажите о себе"
                            multiline
                            fullWidth
                            rows={5}
                        />
                    </Field>
                    <Field>
                        <Typography variant="h6" component="h3">
                            Ссылка на соц. сети
                        </Typography>
                        <TextField
                            fullWidth
                            label="Ссылка на соц. сети"
                        />
                    </Field>
                    <Button color="primary" variant="contained" type="submit">Сохранить</Button>
                </Stack>
            </BaseCard>
        </div>
    );
};

export default ExpertForm;
