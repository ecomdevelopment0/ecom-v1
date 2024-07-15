import style from "./checkout-product.module.scss";
import productImg from "../../assets/product-img.png";

export default function CheckoutProduct() {
  return (
    <>
      <div className={style.container_div}>
        <div className={style.product}>
          <div className={style.product_img}>
            <img src={productImg} alt="" />
            <p>1</p>
          </div>
          <h4>AVG Antivirus 1 user 1 year</h4>
        </div>
        <div className={style.price}>
          <h3>₹349.00</h3>
        </div>
      </div>
    </>
  );
}
