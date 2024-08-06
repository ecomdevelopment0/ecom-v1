import CheckoutProduct from "../../components/CheckoutProduct/CheckoutProduct";
import style from "./checkout.module.scss";
import rightArrow from "../../assets/right-arrow-icon.svg";
// import leftArrow from "../../assets/left-arrow-icon.svg";
// import { Checkbox } from "../../components/Checkbox/Checkbox";
import { GenericPaths } from "../../services/genericPaths";
import { localStorageProvider } from "../../utils/methods";
import { useAppSelector } from "../../hooks/hooks";
import { useState } from "react";
import { calculateGST } from "../../utils/common";
import { validateEmail } from "../../utils/validation";
import Swal from "sweetalert2";
import useRazorpay from "react-razorpay";
import { cartProvider } from "../../services/Cart/cartProvider";
import { useQuery } from "react-query";
import { trio } from "ldrs";
import { paymentProvider } from "../../services/Payment/paymentProvider";
import { orderProvider } from "../../services/Order/orderProvider";
import { useNavigate } from "react-router-dom";
trio.register();

const authFromLocalStorage = localStorageProvider.get(
  GenericPaths.AUTH_DATA_LOCAL_STORAGE
);

const intitiatePayment = async (userId: string) => {
  return await paymentProvider.intitiatePayment(userId);
};

const checkPayment = async (userId: string, data: any) => {
  return await paymentProvider.checkPayment(userId, data);
};

const failedPayment = async (userId: string, data: any) => {
  return await paymentProvider.failedPayment(userId, data);
};

async function getCart({ queryKey }: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, userId] = queryKey;
  return await cartProvider.getCart(userId);
}

const orderPlace = async (userId: string, data: any) => {
  return await orderProvider.createOrder(userId, data);
};

export default function CartCheckout() {
  const [Razorpay] = useRazorpay();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const authFromRedux = useAppSelector((state) => state.auth.user);
  const authData = authFromLocalStorage || authFromRedux;
  const navigate = useNavigate();

  const { data: cart, isLoading }: any = useQuery(
    ["cart", authData?.userId],
    getCart,
    {
      enabled: !!authData, // only run this query if authData is available
    }
  );

  let subTotal: number = 0;
  cart?.products.map((c: any) => {
    subTotal = subTotal + c.marketPrice * c.quantity;
  });
  const totalAmount: number = subTotal + calculateGST(subTotal);

  const handleChange = (e: any, setter: any, errorSetter: any) => {
    setter(e.target.value);
    errorSetter("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let valid = true;
    let emailError = "";

    if (!validateEmail(email)) {
      valid = false;
      emailError = "Invalid email address";
      Swal.fire({
        icon: "error",
        title: "Email is not valid !!",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    if (valid) {
      Swal.fire({
        title: `Are you sure you want to proceed with the email ${email} with total amount ${totalAmount}`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#337CCF",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await pay();
        }
      });
    } else {
      setEmailError(emailError);
    }
  };

  const loadScript = (src: any) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const pay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const { data: paymentResponse } = await intitiatePayment(authData?.userId);
    let orderRes: any;
    if (paymentResponse) {
      const options: any = {
        key: "rzp_test_K7MzkROXUd43Ey",
        amount: paymentResponse.amount,
        currency: "INR",
        order_id: paymentResponse.id,
        name: "ECOM PROJECT",
        description: "Test Transaction",
        // image: "https://avatars.githubusercontent.com/u/76506184?v=4", // your project logo
        handler: async function (response: any) {
          const paymentResponse = response.razorpay_payment_id;
          const order_id = response.razorpay_order_id;
          const signature = response.razorpay_signature;
          const checkPaymentRes = await checkPayment(authData?.userId, {
            order_id: order_id,
            razorpay_payment_id: paymentResponse,
            razorpay_signature: signature,
          });
          if (checkPaymentRes.success) {
            orderRes = await orderPlace(authData?.userId, {
              order_id: order_id,
              razorpay_payment_id: paymentResponse,
              razorpay_signature: signature,
            });
          }
        },
        theme: {
          color: "#337CCF",
        },
      };
      const razorpay: any = new Razorpay(options);

      razorpay.on("payment.failed", async function (response: any) {
        setTimeout(() => {
          razorpay.close();
        }, 1000);
        await failedPayment(authData?.userId, {
          order_id: response.error.metadata.order_id,
          razorpay_payment_id: response.error.metadata.payment_id,
          razorpay_signature: "null",
          reason: response.error.reason,
        });
      });

      razorpay.open();
      setTimeout(() => {
        razorpay.close();
      }, 1000 * 60 * 3);
      if (orderRes) {
        Swal.fire({
          title: "Payment ...!",
          text: "Payment ...!",
          icon: "success",
          confirmButtonColor: "#337CCF",
        });
        navigate("/");
      }
    }
  };
  return (
    <>
      {isLoading ? (
        <div className={style.loader}>
          <l-trio size="70" speed="1.3" color="#337CCF"></l-trio>
        </div>
      ) : (
        <div className={style.main_container}>
          <div className={style.path_shower}>
            <p>Home</p>
            <img src={rightArrow} alt="right-arrow-img" />
            <p>Checkout</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={style.container}>
              <div className={style.container_left}>
                <div className={style.heading}>
                  <h2>Enter Delivery Details </h2>
                </div>

                <p>Email address</p>
                <input
                  type="text"
                  placeholder="eg. cyberguardkeyhub@gmail.com"
                  value={email}
                  onChange={(e) => handleChange(e, setEmail, setEmailError)}
                />
                {emailError && <p className={style.errorMsg}>{emailError}</p>}

                {/* 
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
              </div> */}
              </div>
              <div className={style.container_right}>
                <div className={style.right_div}>
                  <div className={style.check_product_list}>
                    {cart?.products.map((c: any, i: any) => {
                      subTotal = subTotal + c.marketPrice * c.quantity;
                      return (
                        <CheckoutProduct
                          key={i}
                          name={c.name}
                          quantity={c.quantity}
                          price={c.marketPrice}
                        />
                      );
                    })}
                  </div>
                  <div className={style.border_div}></div>
                  <div className={style.price_div}>
                    <h4>Subtotal</h4>
                    <p>₹{subTotal}</p>
                  </div>
                  <div className={style.price_div}>
                    <h4>
                      GST <span>(18%)</span>
                    </h4>
                    <p>₹{calculateGST(subTotal)}</p>
                  </div>
                  <div className={style.border_div}></div>
                  <div className={style.price_div}>
                    <h4>Total</h4>
                    <h2>₹{totalAmount}</h2>
                  </div>

                  <button type="submit" className={style.price_btn}>
                    Continue to Pay
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
