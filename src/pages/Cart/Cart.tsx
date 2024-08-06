import style from "./cart.module.scss";
import rightArrow from "../../assets/right-arrow-icon.svg";
import CartProduct from "../../components/CartProduct/CartProduct";
import MayLike from "../../components/MayLike/MayLike";
import { localStorageProvider } from "../../utils/methods";
import { GenericPaths } from "../../services/genericPaths";
import { cartProvider } from "../../services/Cart/cartProvider";
import { useQuery, useQueryClient } from "react-query";
import { useAppSelector } from "../../hooks/hooks";
import { calculateGST } from "../../utils/common";
import { useNavigate } from "react-router-dom";
import { trio } from "ldrs";
trio.register();

const authFromLocalStorage = localStorageProvider.get(
  GenericPaths.AUTH_DATA_LOCAL_STORAGE
);

async function getCart({ queryKey }: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, userId] = queryKey;
  return await cartProvider.getCart(userId);
}

const addToCart = async (userId: string, productId: string) => {
  return await cartProvider.addToCart(userId, productId);
};

const removeFromCart = async (
  userId: string,
  productId: string,
  prod?: string
) => {
  return await cartProvider.removeFromCart(userId, productId, prod);
};

export default function Cart() {
  const queryClient = useQueryClient();
  const authFromRedux = useAppSelector((state) => state.auth.user);
  const authData = authFromLocalStorage || authFromRedux;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/cart-checkout`);
  };

  const { data: cart, isLoading }: any = useQuery(
    ["cart", authData?.userId],
    getCart,
    {
      enabled: !!authData, // only run this query if authData is available
    }
  );

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(authData.userId, productId);
      await queryClient.invalidateQueries(["cart", authData?.userId]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromCart = async (productId: string, prod?: string) => {
    try {
      await removeFromCart(authData.userId, productId, prod);
      await queryClient.invalidateQueries(["cart", authData?.userId]);
    } catch (error) {
      console.error(error);
    }
  };

  let subTotal = 0;

  return (
    <>
      {isLoading ? (
        <div className={style.loader}>
          <l-trio size="70" speed="1.3" color="#337CCF"></l-trio>
        </div>
      ) : (
        <div className={style.cart_container}>
          <div className={style.path_shower}>
            <p>Cart</p>
            <img src={rightArrow} alt="right-arrow-img" />
          </div>

          <h2 className={style.cart_heading}>Cart</h2>

          {cart?.products?.length == 0 ? (
            <div>
              <h2 className={style.e_cart_heading}>
                No products available in the cart ...!{" "}
              </h2>
            </div>
          ) : (
            <div className={style.cart_div}>
              <div className={style.cart_div_left}>
                <div className={style.left_heading}>
                  <h3 className={style.heading_Product}>Product</h3>
                  <h3 className={style.heading_Price}>Price</h3>
                  <h3 className={style.heading_Quantity}>Quantity</h3>
                  <h3 className={style.heading_Subtotal}>Subtotal</h3>
                </div>
                <div className={style.border_div}></div>
                <div className={style.cart_products}>
                  {cart?.products.map((c: any, i: any) => {
                    subTotal = subTotal + c.marketPrice * c.quantity;
                    return (
                      <CartProduct
                        productId={c.productId}
                        handleAddToCart={handleAddToCart}
                        handleRemoveFromCart={handleRemoveFromCart}
                        key={i}
                        name={c.name}
                        pord_quantity={c.quantity}
                        price={c.marketPrice}
                      />
                    );
                  })}
                </div>
              </div>
              <div className={style.cart_div_right}>
                <h3>
                  Price Details <span>({cart?.products?.length} items)</span>
                </h3>
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
                  <h2>₹{subTotal + calculateGST(subTotal)}</h2>
                </div>

                <button className={style.price_btn} onClick={handleClick}>
                  Proceed to checkout
                </button>
              </div>
            </div>
          )}

          {cart.products.length == 0 ? "" : <MayLike />}
        </div>
      )}
    </>
  );
}
