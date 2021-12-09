import React, {useEffect, useState} from 'react';
import {Container, Paper} from "@mui/material";
import CarouselPlacement from "../../components/CarouselPlacement/CarouselPlacement";
import ShowCase from "../../components/ShowCase/ShowCase";
import AuthorCard from "../../components/AuthorCard/AuthorCard";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import JournalCard from "../../components/JournalCard/JournalCard";
import ServiceCard from "../../components/ServiceCard";
import {authorsPopular, cardsService} from "../../constants";
import NewsService from "../../services/NewsService";
import NewsCard from "../../components/NewsCard";
import ShowNews from "../../components/ShowNews";

const LandingPage = () => {
    const [news, setNews] = useState([]);

    const fetchNews = () => {
        NewsService.getNews({limit: 4})
            .then((res) => {
                setNews(res);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchNews()
    }, [])

    return (
        <div>
            <Container>
                <CarouselPlacement/>
                <ShowCase title="Наши услуги">
                    {cardsService.map(({img, title, description}) => (
                        <ServiceCard key={title} img={img} title={title} description={description}/>
                    ))}
                </ShowCase>
                <ShowNews title="Новости" moreBtnText="Все статьи">
                    {news && news.map(({img, title, description}) => (
                        <NewsCard key={title} img={img} title={title} description={description}/>
                    ))}
                </ShowNews>
                <ShowCase title="Поупулярные авторы" moreBtnLink="/experts" moreBtnText="Все авторы">
                    {authorsPopular.map(({img, title, description}) => (
                        <AuthorCard key={title} img={img} title={title} description={description}/>
                    ))}
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
                <ShowCase title="Поупулярные журналы" moreBtnText="Все журналы">
                    <JournalCard/>
                    <JournalCard/>
                    <JournalCard/>
                    <JournalCard/>
                </ShowCase>
            </Container>
            {/*<Footer/>*/}
        </div>
    );
};

export default LandingPage;
