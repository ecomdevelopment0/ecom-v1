import style from "./single-product.module.scss";
// import emptyLikeIcon from "../../assets/empty-like-icon.svg";
import { truncateName } from "../../utils/generator";
import coming_soon_img from "../../assets/img-coming-soon.png";
import { useNavigate } from "react-router-dom";
import { cartProvider } from "../../services/Cart/cartProvider";
import { localStorageProvider } from "../../utils/methods";
import { GenericPaths } from "../../services/genericPaths";
import { useAppSelector } from "../../hooks/hooks";
import { useQuery, useQueryClient } from "react-query";
import { trio } from "ldrs";
trio.register();

interface SingleProduct {
  onSale: boolean;
  productImg: string;
  name: string;
  cutPrice: number;
  price: number;
  productId: string;
}

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

export default function SingleProduct({
  onSale,
  productImg,
  name,
  cutPrice,
  price,
  productId,
}: SingleProduct) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${productId}`);
  };
  const authFromRedux = useAppSelector((state) => state.auth.user);
  const authData = authFromLocalStorage || authFromRedux;
  let inCart = false;
  const { data: cart, isLoading }: any = useQuery(
    ["cart", authData?.userId],
    getCart,
    {
      enabled: !!authData, // only run this query if authData is available
    }
  );

  cart?.products.map((p: any) => {
    if (p.productId === productId) {
      inCart = true;
    }
  });

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

  return (
    <>
      {isLoading ? (
        <div className={style.loader}>
          <l-trio size="70" speed="1.3" color="#337CCF"></l-trio>
        </div>
      ) : (
        <div className={style.product_container}>
          <div className={style.upper_icons}>
            <div className={style.sale_upper_div}>
              {onSale ? (
                <div className={style.sale_div}>
                  <p>Sale</p>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className={style.like_icon}>
              {/* <img src={emptyLikeIcon} alt="" /> */}
            </div>
          </div>
          <div onClick={handleClick} className={style.img_div}>
            <img src={productImg || coming_soon_img} alt="" />
          </div>
          <div className={style.name_div}>
            <h6 onClick={handleClick}>{truncateName(name, 40)}</h6>
          </div>
          <div className={style.price_div}>
            <h6 onClick={handleClick}>
              ₹{price} <span>₹{cutPrice}</span>
            </h6>
            <button
              onClick={() =>
                !inCart
                  ? handleAddToCart(productId)
                  : handleRemoveFromCart(productId, "remove")
              }
              className={style.btn}
            >
              {!inCart ? "Add to cart" : "Remove"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
