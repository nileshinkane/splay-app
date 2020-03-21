import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



// const useStyles = makeStyles(theme => ({
//     box: {
//         height: '90px',
//         outline: 'none',
//         padding: '10px'
//     },
//     card: {
//         height: '100%',
//         width: '100%',
//         backgroundColor: 'white'
//     }
// }))

export default function VideoSlider(props) {

    // const classes = useStyles()
    const settings = {
        infinite: true,
        speed: 500,
        lazyLoad: true,
        slidesToShow: 4,
        swipeToSlide: true,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        touchThreshold: 20,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    infinite: true,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    infinite: true,
                    slidesToScroll: 1,

                }
            }
        ]
    };
    return (
        <Slider {...settings}>
            {props.children}
        </Slider>
    )
}


