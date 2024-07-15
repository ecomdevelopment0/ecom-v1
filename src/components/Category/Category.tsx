import { CategoryCarousel } from "../Carousel/Carousel";
import style from "./category.module.scss";


const Category = () => {
    return (
        <div className={style.category_container}>
            <h2>Categories</h2>
            <CategoryCarousel />

        </div>
    );
};

export default Category;
