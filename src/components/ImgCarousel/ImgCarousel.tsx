import Slider from "react-slick";
import leftArrow from "../../assets/left-arrow-icon.svg"
import rightArrow from "../../assets/right-arrow-icon.svg"
import bannerImg from "../../assets/banner01.png"

function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <img
            className={className}
            style={{ ...style, display: "block", width: "25px", height: "25px", margin: "0 40px 0 0", zIndex: 1 }}
            onClick={onClick}
            src={rightArrow} alt="" />
    );
}

function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <img
            className={className}
            style={{ ...style, display: "block", width: "25px", height: "25px", margin: "0 0 0 40px", zIndex: 1 }}
            onClick={onClick}
            src={leftArrow} alt="" />
    );
}

export function ImgCarousel() {
    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                <img src={bannerImg} alt="banner-img" />
                <img src={bannerImg} alt="banner-img" />
                <img src={bannerImg} alt="banner-img" />
                <img src={bannerImg} alt="banner-img" />
                <img src={bannerImg} alt="banner-img" />
                <img src={bannerImg} alt="banner-img" />
            </Slider>
        </div>
    );
}
