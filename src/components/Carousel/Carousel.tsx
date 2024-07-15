import Slider from "react-slick";
import leftArrow from "../../assets/left-arrow-icon.svg";
import rightArrow from "../../assets/right-arrow-icon.svg";
import CategoryTab from "../CategoryTab/CategoryTab";
import style from "./carousel.module.scss";
import { useEffect, useState } from "react";
import { categoryProvider } from "../../services/Category/categoryProvider";

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      style={{
        ...style,
        display: "block",
        width: "25px",
        height: "25px",
        margin: "0 -40px",
      }}
      onClick={onClick}
      src={rightArrow}
      alt=""
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      style={{
        ...style,
        display: "block",
        width: "25px",
        height: "25px",
        margin: "0 -40px",
      }}
      onClick={onClick}
      src={leftArrow}
      alt=""
    />
  );
}

export function CategoryCarousel() {
  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablet breakpoint
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // Mobile breakpoint
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
    centerMode: true,
  };
  const [categories, setCategories] = useState<any[]>([]);
  let response: any;
  async function getAllCategories() {
    response = await categoryProvider.getAllCategories();
    setCategories(response?.rows);
  }
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div className={style["slider-container"]}>
      <Slider {...settings}>
        {categories.map((category, index) => (
          <CategoryTab categoryId={category.categoryId} key={index} text={category.name} />
        ))}
      </Slider>
    </div>
  );
}
