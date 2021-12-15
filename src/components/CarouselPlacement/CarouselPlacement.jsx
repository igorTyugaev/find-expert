import React from 'react';
import Carousel from "react-multi-carousel";
import {Typography, styled} from "@mui/material";
import "react-multi-carousel/lib/styles.css";

const PlacementImg = styled('img')(({theme}) => ({
    display: 'block',
    objectFit: 'cover',
    objectPosition: 'top center',
    backgroundRepeat: 'no-repeat',
    outline: 'none',
    width: "100%",
    height: "100%",
    position: 'relative',
}));

const CarouselContent = styled("div")(({theme}) => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: "1",
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
}));

const CarouselInner = styled("div")(({theme}) => ({
    padding: `${theme.spacing(4)} ${theme.spacing(12)}`,
    maxWidth: "85%",

    "@media screen and (max-width: 842px)": {
        padding: `${theme.spacing(4)}`,
        maxWidth: "100%",
    },

    "@media screen and (max-width: 542px)": {
        padding: "14px 12px",
        fontSize: "16px"
    },
}));


const CarouselContainer = styled(Carousel)(({theme}) => ({
    marginTop: theme.spacing(2),
    cursor: 'grab',
    outline: 'none',
    margin: "0 -12px",
}));

const CarouselItemWrapper = styled("div")(({theme}) => ({
    position: "relative",
    borderRadius: theme.spacing(2),
    overflow: "hidden",
    cursor: 'pointer',
    pointerEvents: 'none',
    margin: "12px",
    height: theme.spacing(56),


    "@media screen and (max-width: 842px)": {
        height: theme.spacing(51),
    },

    "@media screen and (max-width: 542px)": {
        height: theme.spacing(42),
    }
}));

const CarouselItemTitle = styled(Typography)(({theme}) => ({
    fontWeight: "bold",
    color: "white",
    wordBreak: "normal",

    "@media screen and (max-width: 842px)": {
        fontSize: "28px"
    },

    "@media screen and (max-width: 542px)": {
        fontSize: "21px"
    },

    "@media screen and (max-width: 342px)": {
        fontSize: "16px"
    }
}));

const CarouselItemSubtitle = styled(Typography)(({theme}) => ({
    marginTop: "1em",
    color: "white",
    fontSize: "21px",
    wordBreak: "normal",

    "@media screen and (max-width: 842px)": {
        fontSize: "18px"
    },

    "@media screen and (max-width: 542px)": {
        fontSize: "16px"
    },

    "@media screen and (max-width: 342px)": {
        fontSize: "14px"
    }
}));

const CarouselPlacement = () => {
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

    return (
        <CarouselContainer responsive={responsive} infinite={true} removeArrowOnDeviceType={["tablet", "mobile"]}>
            {items.map((item, i) => <CarouselItem key={i} item={item}/>)}
        </CarouselContainer>
    );
};

const CarouselItem = ({props}) => {
    return <CarouselItemWrapper>
        <PlacementImg src="http://kaye.ccny.cuny.edu/wp-content/uploads/2021/10/kaye-collage-scholars-2020-2021-3.jpg"/>
        <CarouselContent>
            <CarouselInner>
                <CarouselItemTitle variant="h4" component="h3">
                    Общайтесь и сотрудничайте с академическими экспертами
                </CarouselItemTitle>
                <CarouselItemSubtitle variant="body1" component="p">
                    «Платформа проста в управлении, и мне нравится, что она обеспечивает прямую связь с экспертом. Это
                    позволяет выбрать лучшего эксперта для работы, как с точки зрения затрат, так и с точки зрения типа
                    услуг. Отличный сервис по разумной цене, что значительно дешевле, чем у коммерческих поставщиков ".
                </CarouselItemSubtitle>
            </CarouselInner>
        </CarouselContent>
    </CarouselItemWrapper>
}

const items = [
    {
        name: "Random Name #1",
        description: "Probably the most random thing you have ever seen!"
    },
    {
        name: "Random Name #2",
        description: "Hello World!"
    }
]

export default CarouselPlacement;
