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
import ArticlesService from "../../services/articlesService";

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
    const useItems = () => {
        const [articles, setArticles] = useState([]);

        useEffect(() => {
            const unsubscribe = ArticlesService
                .getArticles()
                .limit(6)
                .onSnapshot((snapshot) => {
                        const items = snapshot.docs
                            .map(doc => ({
                                articleId: doc.id,
                                ...doc.data(),
                            }));
                        setArticles(items);
                    },
                    (error) => {
                        const message = error?.message;
                        console.log(message)
                    })
            return () => unsubscribe();
        }, [])
        return articles;
    }
    const articles = useItems();
    console.log(articles)

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
                <ShowCase title="Популярные статьи" moreBtnText="Все статьи">
                    {articles && articles.map(({articleId, name, content}) => (
                        <ArticleCard key={articleId} articleId={articleId} name={name} content={content}/>
                    ))}
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
