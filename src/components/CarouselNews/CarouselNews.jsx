import React, {useEffect, useState} from 'react';
import Carousel from "react-multi-carousel";
import {styled} from "@mui/material";
import "react-multi-carousel/lib/styles.css";
import NewsCard from "../NewsCard";
import NewsService from "../../services/NewsService";

const CarouselContainer = styled(Carousel)(({theme}) => ({
    marginTop: theme.spacing(2),
    cursor: 'grab',
    outline: 'none',
    margin: "0 -12px",
    flex: 1,
}));


const CarouselNews = () => {
    const responsive = {
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 1
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 1
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1
        }
    };
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
        <CarouselContainer responsive={responsive} infinite={true} autoPlay showDots
                           removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}>
            {news && news.map(({img, title, description}) => (
                <NewsCard isSmall key={title} img={img} title={title} description={description}/>
            ))}
        </CarouselContainer>
    );
};

export default CarouselNews;
