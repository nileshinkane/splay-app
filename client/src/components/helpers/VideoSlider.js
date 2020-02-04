import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const useStyles = makeStyles(theme => ({
    box: {
        height: '90px',
        outline: 'none',
        padding: '10px'
    },
    card: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white'
    }
}))

export default function VideoSlider(props) {

    // const classes = useStyles()
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        swipeToSlide: true,
        slidesToScroll: 1,
        arrows: false,
        touchThreshold: 20
    };
    return (
        <Slider {...settings}>
            {props.children}
        </Slider>
    )
}


