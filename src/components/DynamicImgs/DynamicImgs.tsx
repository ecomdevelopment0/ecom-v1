import style from "./dynamic-imgs.module.scss";
import { ImgCarousel } from '../ImgCarousel/ImgCarousel'

export default function DynamicImgs() {
    return (
        <>
            <div className={style.dynamic_imgs_container}>
                <ImgCarousel />
            </div>
        </>
    )
}
