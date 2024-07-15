import { useEffect } from "react";
import BestDeal from "../../components/BestDeal/BestDeal";
import Brand from "../../components/Brand/Brand";
import Category from "../../components/Category/Category";
import DynamicImgs from "../../components/DynamicImgs/DynamicImgs";
import Feature from "../../components/Feature/Feature";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import style from "./home.module.scss";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className={style.home_container}>
        <DynamicImgs />
        <Feature />
        <Category />
        <BestDeal />
        <Brand />
        <FeaturedProducts />
      </div>
    </>
  );
}
