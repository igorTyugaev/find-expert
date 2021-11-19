import React from 'react';
import {Container, Paper} from "@mui/material";
import CarouselPlacement from "../../components/CarouselPlacement/CarouselPlacement";
import ShowCase from "../../components/ShowCase/ShowCase";
import Footer from "../../components/Footer/Footer";
import AuthorCard from "../../components/AuthorCard/AuthorCard";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import JournalCard from "../../components/JournalCard/JournalCard";

const LandingPage = () => {
    return (
        <div>
            <Container>
                <CarouselPlacement/>
                <ShowCase title="Поупулярные авторы" moreBtnText="Все авторы">
                    <AuthorCard/>
                    <AuthorCard/>
                    <AuthorCard/>
                    <AuthorCard/>
                </ShowCase>
                <ShowCase title="Поупулярные статьи" moreBtnText="Все статьи">
                    <ArticleCard/>
                    <ArticleCard/>
                    <ArticleCard/>
                    <ArticleCard/>

                    <ArticleCard/>
                    <ArticleCard/>
                    <ArticleCard/>
                    <ArticleCard/>
                </ShowCase>
            </Container>
            <Paper elevation={0} sx={{padding: "1em 0 4em", marginTop: 6}}>
                <Container>
                    <ShowCase title="Поупулярные журналы" moreBtnText="Все журналы">
                        <JournalCard/>
                        <JournalCard/>
                        <JournalCard/>
                        <JournalCard/>
                    </ShowCase>
                </Container>
            </Paper>
            <Container>
                <ShowCase title="Поупулярные авторы" moreBtnText="Все авторы">
                    <AuthorCard/>
                    <AuthorCard/>
                    <AuthorCard/>
                    <AuthorCard/>
                </ShowCase>
                <ShowCase title="Поупулярные статьи" moreBtnText="Все статьи">
                    <ArticleCard/>
                    <ArticleCard/>
                    <ArticleCard/>
                    <ArticleCard/>

                    <ArticleCard/>
                    <ArticleCard/>
                    <ArticleCard/>
                    <ArticleCard/>
                </ShowCase>
            </Container>
            <Footer/>
        </div>
    );
};

export default LandingPage;
