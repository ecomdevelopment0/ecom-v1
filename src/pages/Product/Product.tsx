import style from "./product.module.scss";
import rightArrow from "../../assets/right-arrow-icon.svg";
import productImgComingSoon from "../../assets/img-coming-soon.png";
import minusIcon from "../../assets/minus-icon.svg";
import plusIcon from "../../assets/plus-icon.svg";
// import emptyLike from "../../assets/empty-like-icon.svg";
import blueCartIcon from "../../assets/blue-cart-icon.svg";
import instantIcon from "../../assets/instant-icon.svg";
import zsafeIcon from "../../assets/safe-icon.svg";
import supportIcon from "../../assets/support-icon.svg";
import paymentIcon from "../../assets/payment-icon.svg";
import yellowStarIcon from "../../assets/yellow-star-icon.svg";
import greyStarIcon from "../../assets/grey-star-icon.svg";
import { Tab } from "../../components/Tab/Tab";
import Review from "../../components/Reviews/Review";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import { Accordion } from "../../components/Accordion/Accordion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productProvider } from "../../services/Product/productProvider";
import { calculatePercentageOff } from "../../utils/common";
import { trio } from "ldrs";
import { localStorageProvider } from "../../utils/methods";
import { GenericPaths } from "../../services/genericPaths";
import { cartProvider } from "../../services/Cart/cartProvider";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAppSelector } from "../../hooks/hooks";
import { reviewProvider } from "../../services/Review/reviewProvider";
import AddReview from "../../components/AddReview/AddReview";
import Pagination from "../../components/Pagination/Pagination";
import Swal from "sweetalert2";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

trio.register();

const authFromLocalStorage = localStorageProvider.get(
  GenericPaths.AUTH_DATA_LOCAL_STORAGE
);

async function getCart({ queryKey }: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, userId] = queryKey;
  return await cartProvider.getCart(userId);
}

async function getAllReviews({ queryKey }: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, { page, limit, productId }] = queryKey;
  return await reviewProvider.getAllReviews(page, limit, productId);
}

const addToCart = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  return await cartProvider.addToCart(userId, productId, quantity);
};

const removeFromCart = async (
  userId: string,
  productId: string,
  prod?: string
) => {
  return await cartProvider.removeFromCart(userId, productId, prod);
};

async function fetchProductDetails(productId: string) {
  const res = await productProvider.getProductDetails(productId || "");
  return res;
}

async function addReview(productId: string, data: any) {
  const res = await reviewProvider.addNewReview(productId, data);
  return res;
}

export default function Product() {
  const desc = [
    "Assured full protection : Prevent risky file downloads, halt malware spread, safeguard iOS devices, control kids' browsing, back up data, and ensure privacy. This protection CD includes Folder Encryption for securing private files and data.",
    "Advanced scan engine : McAfee Antivirus employs a potent engine to locate and eliminate hard-to-find spyware, malware, Trojans, and various threats. This ensures your device's battery life and speed remain unaffected. The CD's color-coded feature helps you assess the safety of every webpage.",
  ];
  const howToInstall = [
    "Go to http://www.mcafee.com/activate",
    "Enter product key which you have purchase From https://www.cyberguardkeyhub And Click on submit",
    "Click on Register",
    "Follow the steps",
    "Click log in",
    "Download Mcafee Antivirus",
    "Read and agree the license agreement",
    "Make a note of serial number shown you might be prompted for it later.",
  ];
  const support = [
    "Toll free no : 1234 567 9845 (Only within India)",
    "Tel : +91 12 32456722 ",
    "Mobile : +91 1234 56789 (Working hours 10 AM to 6 PM. Only on Weekdays)",
    "Email : support@cyberguardkeyhub.com",
  ];
  const tabs = [
    {
      header: "Description",
      content: (
        <ul>
          {desc.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      ),
    },
    {
      header: "How to install",
      content: (
        <ul>
          {howToInstall.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      ),
    },
    {
      header: "Support",
      content: (
        <ul>
          {support.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      ),
    },
  ];

  const queryClient = useQueryClient();
  const authFromRedux = useAppSelector((state) => state.auth.user);
  const authData = authFromLocalStorage || authFromRedux;
  const { productId }: any = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [inCart, setInCart] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);
  const [reviewResponse, setReviewResponse] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [topScroll, setTopScroll] = useState(true);
  const [cartError, setCartError] = useState<boolean>(false);
  const [stockZeroError, setStockZeroError] = useState<boolean>(false);

  const onPageChange = (page: number) => {
    setTopScroll(false);
    setCurrentPage(page);
  };

  const { data: cart, isLoading: isLoadingCart }: any = useQuery(
    ["cart", authData?.userId],
    getCart,
    {
      enabled: !!authData, // only run this query if authData is available
    }
  );

  const { data: reviews, isLoading: isLoadingReview }: any = useQuery(
    ["reviews", { page: currentPage, limit: 5, productId }],
    getAllReviews
  );

  const handleAddToCart = async (quantity: number) => {
    try {
      await addToCart(authData.userId, productId, quantity);
      await queryClient.invalidateQueries(["cart", authData?.userId]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromCart = async (prod?: string) => {
    try {
      await removeFromCart(authData.userId, productId, prod);
      await queryClient.invalidateQueries(["cart", authData?.userId]);
      setInCart(false);
    } catch (error) {
      console.error(error);
    }
  };

  const incrementQuan = () => {
    if (inCart) {
      handleAddToCart(1);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };
  const decrementQuan = () => {
    if (inCart) {
      handleRemoveFromCart("");
    } else {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  useEffect(() => {
    if (topScroll) {
      window.scrollTo(0, 0);
    }
    const fetchProduct = async () => {
      setTopScroll(true);
      if (cart) {
        cart?.products?.forEach((c: any) => {
          if (c.productId === productId) {
            setInCart(true);
            setQuantity(c.quantity);
          }
        });
      }
      setReviewResponse(reviews);

      if (productId) {
        try {
          const fetchedProduct = await fetchProductDetails(productId);
          setProduct(fetchedProduct);
          if (fetchedProduct?.inStock === 0) {
            setStockZeroError(true);
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      } else {
        navigate("404-not-found");
      }
    };

    fetchProduct();
  }, [productId, cart, navigate, inCart]);

  const handleAccordionClick = (index: number) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  const mutation = useMutation(
    ({ productId, reviewData }: any) => addReview(productId, reviewData),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([
          "reviews",
          { page: currentPage, limit: 5, productId },
        ]);
        Swal.fire({
          icon: "success",
          title: "Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      onError: (error: any) => {
        Swal.fire({
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      },
    }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleReviewSubmit = async (reviewData: any) => {
    mutation.mutate({ productId, reviewData });
    handleCloseModal();
  };

  // console.log(product);

  return (
    <>
      {product && isLoadingCart ? (
        <div className={style.loader}>
          <l-trio size="70" speed="1.3" color="#337CCF"></l-trio>
        </div>
      ) : (
        <div className={style.product_wrapper}>
          <div className={style.product_container}>
            <div className={style.path_shower}>
              <p>Home</p>
              <img src={rightArrow} alt="right-arrow-img" />
              <p>Categories</p>
              <img src={rightArrow} alt="right-arrow-img" />
              <p>{product?.categoryName}</p>
              <img src={rightArrow} alt="right-arrow-img" />
              <p>{product?.brandName}</p>
            </div>

            <div className={style.product_div}>
              <div
                className={`${stockZeroError ? style.fade : ""} ${
                  style.img_div
                }`}
              >
                {stockZeroError ? (
                  <h2 className={style.outOfStock}>Out of Stock</h2>
                ) : (
                  ""
                )}

                <img src={product?.imageURL || productImgComingSoon} alt="" />
                <div className={style.like_div}>
                  {/* <img src={emptyLike} alt="" /> */}
                </div>
              </div>
              <div className={style.info_div}>
                <h2>{product?.name}</h2>
                <p>{product?.description}</p>
                {reviews?.count ? (
                  <div className={style.rating_div}>
                    <p>{parseFloat(product?.ratings).toFixed(1)}</p>
                    <div className={style.stars_div}>
                      {[...Array(5)].map((_, index) => (
                        <div key={index}>
                          <img
                            src={
                              index < Math.round(product?.ratings)
                                ? yellowStarIcon
                                : greyStarIcon
                            }
                            alt="star"
                          />
                        </div>
                      ))}
                    </div>
                    <p>{reviews?.count} reviews</p>
                  </div>
                ) : (
                  ""
                )}
                <div className={style.price_div}>
                  <div>
                    <h2>₹{product?.marketPrice}</h2>
                  </div>
                  <div>
                    <p>₹{product?.actualPrice}</p>
                  </div>
                  <div>
                    <h6>
                      {calculatePercentageOff(
                        product?.actualPrice,
                        product?.marketPrice
                      )}
                      % OFF
                    </h6>
                  </div>
                </div>
                <div className={style.quantity_div}>
                  <img
                    onClick={() => {
                      decrementQuan();
                      setCartError(false);
                    }}
                    className={style.quan_icon}
                    src={minusIcon}
                    alt="minus-img"
                  />
                  <p>{quantity}</p>
                  <img
                    onClick={
                      quantity < product?.inStock
                        ? incrementQuan
                        : () => setCartError(true)
                    }
                    className={`${cartError ? style.fade : ""} ${
                      style.quan_icon
                    }`}
                    src={plusIcon}
                    alt="plus-img"
                  />
                </div>
                <div className={style.buy_div}>
                  <button
                    disabled={stockZeroError}
                    className={`${stockZeroError ? style.fade : ""} ${
                      style.buy_btn
                    }`}
                  >
                    Buy Now
                  </button>
                  <button
                    className={`${cartError ? style.fade : ""} ${
                      style.cart_btn
                    }`}
                    onClick={() =>
                      inCart
                        ? handleRemoveFromCart("remove")
                        : handleAddToCart(quantity)
                    }
                  >
                    <img src={blueCartIcon} alt="" />
                    {inCart ? "Remove" : "Add to cart"}
                  </button>
                </div>
                <div className={style.common_info}>
                  <p>
                    Activation Codes will be delivered Digitally via SMS, E-Mail
                    & Whatsapp
                  </p>
                  <ul>
                    <li>Instant Product Key Delivery</li>
                    <li>No Hassle Refunds</li>
                    <li>Secured Payment Gateway</li>
                    <li>Satisfaction Guaranteed</li>
                  </ul>
                </div>
                <div className={style.feature_div}>
                  <div>
                    <img src={instantIcon} alt="" />
                    <p>Instant Delivery</p>
                  </div>
                  <div>
                    <img src={zsafeIcon} alt="" />
                    <p>100% Safe</p>
                  </div>
                  <div>
                    <img src={supportIcon} alt="" />
                    <p>24/7 Support</p>
                  </div>
                  <div>
                    <img src={paymentIcon} alt="" />
                    <p>Online Payment</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.hori_line}></div>

            <div className={style.product_detials_div}>
              <Tab tabs={tabs} />

              {reviews?.rows?.length ? (
                <div className={style.review_container}>
                  <h2>Customer Reviews</h2>
                  {isLoadingReview ? (
                    <div className={style.loader}>
                      <l-trio size="70" speed="1.3" color="#337CCF"></l-trio>
                    </div>
                  ) : (
                    reviews?.rows?.map((r: any, i: number) => (
                      <Review
                        key={i}
                        review={r.review}
                        name={r.name}
                        stars={r.stars}
                        profileImage={r.profileImage}
                      />
                    ))
                  )}
                  <div className={style.pagination_div}>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={reviewResponse?.totalPages}
                      onPageChange={onPageChange}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}

              {/* {authData ? (
                <div>
                  <AddReview
                    productName={product?.name}
                    name={authData?.name}
                    email={authData?.email}
                    onSubmit={handleReviewSubmit}
                  />
                </div>
              ) : (
                ""
              )} */}
              <div>
                {authData ? (
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleOpenModal}
                    >
                      Add Review
                    </Button>
                    <Dialog open={isModalOpen} onClose={handleCloseModal}>
                      <DialogTitle>Add Review for {product?.name}</DialogTitle>
                      <DialogContent>
                        <AddReview
                          name={authData?.name}
                          email={authData?.email}
                          onSubmit={handleReviewSubmit}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseModal} color="primary">
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <RelatedProducts categoryId={product?.categoryId} />
            <div className={style.faqs_div}>
              <h2>FAQs</h2>
              <div>
                <Accordion
                  title={
                    <h4>
                      How do I activate McAfee Antivirus using the product key I
                      purchased?
                    </h4>
                  }
                  content={
                    <p>
                      To activate McAfee Antivirus using the product key you
                      purchased, follow these steps...
                    </p>
                  }
                  isOpen={activeAccordion === 0}
                  onClick={() => handleAccordionClick(0)}
                />
                <Accordion
                  title={
                    <h4>
                      Can I return or get a refund for a McAfee Antivirus
                      product key?
                    </h4>
                  }
                  content={
                    <p>
                      Unfortunately, McAfee generally does not offer refunds for
                      product keys...
                    </p>
                  }
                  isOpen={activeAccordion === 1}
                  onClick={() => handleAccordionClick(1)}
                />
                <Accordion
                  title={
                    <h4>
                      What if I haven't received my McAfee product key after
                      purchase?
                    </h4>
                  }
                  content={
                    <p>
                      If you haven't received your McAfee product key after
                      purchase, first check your email...
                    </p>
                  }
                  isOpen={activeAccordion === 2}
                  onClick={() => handleAccordionClick(2)}
                />
                <Accordion
                  title={
                    <h4>
                      Can I transfer a McAfee product key to another computer?
                    </h4>
                  }
                  content={
                    <p>
                      Yes, you can usually transfer a McAfee product key to
                      another computer...
                    </p>
                  }
                  isOpen={activeAccordion === 3}
                  onClick={() => handleAccordionClick(3)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
