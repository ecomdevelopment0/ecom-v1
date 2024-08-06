import style from "./checkout-product.module.scss";
import productImg from "../../assets/product-img.png";

export default function CheckoutProduct({ name, quantity, price }: any) {
  return (
    <>
      <div className={style.container_div}>
        <div className={style.product}>
          <div className={style.product_img}>
            <img src={productImg} alt="" />
            <p>{quantity}</p>
          </div>
          <h4>{name}</h4>
        </div>
        <div className={style.price}>
          <h3>₹{price}</h3>
        </div>
      </div>
    </>
  );
}
