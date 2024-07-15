import Slider from "react-slick";
import style from "./related-products.module.scss";
import SingleProduct from "../SingleProduct/SingleProduct";
import leftArrow from "../../assets/left-arrow-icon.svg";
import rightArrow from "../../assets/right-arrow-icon.svg";
import { useEffect, useState } from "react";
import { productProvider } from "../../services/Product/productProvider";

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

export default function RelatedProducts({ categoryId }: any) {
  const settings = {
    infinite: true,
    slidesToShow: 5,
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

  const [products, setProducts] = useState<any[]>([]);
  let response: any;
  async function getAllProducts() {
    response = await productProvider.getAllProducts(1, 20, categoryId);
    setProducts(response?.rows);
  }
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className={style.featured_products_container}>
        <h2>Related products</h2>
        <div className={style.all_products}>
          <div className={style["slider-container"]}>
            <Slider {...settings}>
              {products.map((product, index) => (
                <SingleProduct
                  key={index}
                  onSale={product.onSale}
                  productImg={product.productImg}
                  name={product.name}
                  cutPrice={product.actualPrice}
                  price={product.marketPrice}
                  productId={product.productId}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
