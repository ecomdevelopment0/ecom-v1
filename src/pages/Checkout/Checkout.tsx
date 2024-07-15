import CheckoutProduct from "../../components/CheckoutProduct/CheckoutProduct";
import style from "./checkout.module.scss";
import rightArrow from "../../assets/right-arrow-icon.svg";
import leftArrow from "../../assets/left-arrow-icon.svg";
import { Checkbox } from "../../components/Checkbox/Checkbox";

export default function Checkout() {
  return (
    <>
      <div className={style.main_container}>
        <div className={style.path_shower}>
          <p>Home</p>
          <img src={rightArrow} alt="right-arrow-img" />
          <p>Search results “antivirus”</p>
        </div>
        <form>
          <div className={style.container}>
            <div className={style.container_left}>
              <div className={style.heading}>
                <h2>Contact </h2>
                <p>
                  Have an account? <span>Log in</span>
                </p>
              </div>

              <p>Email address or Phone number</p>
              <input type="text" placeholder="eg. cyberguardkeyhub@gmail.com" />

              <div className={style.heading}>
                <h2>Shipping address </h2>
              </div>

              <p>Country/Region</p>
              <input type="text" placeholder="India" />

              <p>Full name</p>
              <input type="text" placeholder="Kashif Sheikh" />

              <p>Address</p>
              <input type="text" placeholder="Adarsh Nagar" />

              <p>Apartment, suite, etc (optional)</p>
              <input type="text" placeholder="Ashiyana Manzil" />

              <div className={style.pin_div}>
                <div>
                  <p>PIN code</p>
                  <input type="text" placeholder="440009" />
                </div>
                <div>
                  <p>City</p>
                  <input type="text" placeholder="Nagpur" />
                </div>
                <div>
                  <p>State</p>
                  <input type="text" placeholder="Maharashtra" />
                </div>
              </div>

              <div className={style.check_div}>
                <Checkbox />
                <h6>Save this information for next time.</h6>
              </div>

              <div className={style.return_div}>
                <img src={leftArrow} alt="" />
                <h6>Return to cart</h6>
              </div>
            </div>
            <div className={style.container_right}>
              <div className={style.right_div}>
                <div className={style.check_product_list}>
                  <CheckoutProduct />
                  <CheckoutProduct />
                  <CheckoutProduct />
                </div>
                <div className={style.border_div}></div>
                <div className={style.price_div}>
                  <h4>Subtotal</h4>
                  <p>₹698.00</p>
                </div>
                <div className={style.price_div}>
                  <h4>
                    GST <span>(18%)</span>
                  </h4>
                  <p>₹698.00</p>
                </div>
                <div className={style.border_div}></div>
                <div className={style.price_div}>
                  <h4>Total</h4>
                  <h2>₹823.00</h2>
                </div>

                <button className={style.price_btn}>
                  Continue to shipping
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
