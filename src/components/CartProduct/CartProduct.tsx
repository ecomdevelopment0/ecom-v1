import style from "./cart-product.module.scss";
import coming_soon_img from "../../assets/img-coming-soon.png";
import minusIcon from "../../assets/minus-icon.svg";
import plusIcon from "../../assets/plus-icon.svg";
import crossIcon from "../../assets/cross-icon.svg";
import { truncateName } from "../../utils/generator";

interface CartInterface {
  name: string;
  price: number;
  pord_quantity: number;
  productId: string;
  handleAddToCart: any;
  handleRemoveFromCart: any;
}

export default function CartProduct({
  name,
  price,
  pord_quantity,
  productId,
  handleAddToCart,
  handleRemoveFromCart,
}: CartInterface) {
  const incrementQuan = () => handleAddToCart(productId);
  const decrementQuan = () => handleRemoveFromCart(productId,"");
  const removeProd = () => handleRemoveFromCart(productId,"remove");
  return (
    <>
      <div className={style.cart_product_container}>
        <img className={style.product_img} src={coming_soon_img} alt="" />
        <p className={style.product_name}>{truncateName(name, 45)}</p>
        <p className={style.product_price}>₹{price}</p>

        <div className={style.quantity_div}>
          <img
            onClick={decrementQuan}
            className={style.quan_icon}
            src={minusIcon}
            alt="minus-img"
          />
          <p>{pord_quantity}</p>
          <img
            onClick={incrementQuan}
            className={style.quan_icon}
            src={plusIcon}
            alt="plus-img"
          />
        </div>

        <h6 className={style.sub_total}>₹{pord_quantity*price}</h6>
        <div onClick={removeProd} className={style.cross_icon}>
          <img src={crossIcon} alt="" />
        </div>
      </div>
      <div className={style.border_div}></div>
    </>
  );
}
