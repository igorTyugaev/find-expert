import React from 'react';
import Carousel from "react-multi-carousel";
import {Typography, styled} from "@mui/material";
import "react-multi-carousel/lib/styles.css";

const PlacementImg = styled('img')(({theme}) => ({
    display: 'block',
    objectFit: 'cover',
    objectPosition: 'center',
    backgroundRepeat: 'no-repeat',
    outline: 'none',
    width: "100%",
    position: 'relative',
}));

const CarouselContent = styled("div")(({theme}) => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(4),
    zIndex: "1",
    backgroundColor: 'rgba(0, 0, 0, 0.42)'
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
        <CarouselContainer responsive={responsive} infinite={true}>
            {items.map((item, i) => <CarouselItem key={i} item={item}/>)}
        </CarouselContainer>
    );
};

const CarouselItem = ({props}) => {
    return <CarouselItemWrapper>
        <PlacementImg src="https://picsum.photos/900/720"/>
        <CarouselContent>
            <Typography variant="h2" component="h3" color="#fff" sx={{fontWeight: "bold"}}>
                Здесь может быть ваша реклама
            </Typography>
            <Typography variant="h4" component="span" color="#fff">
                Продам гараж рядом кировский р-н, екатеринбург
            </Typography>
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
