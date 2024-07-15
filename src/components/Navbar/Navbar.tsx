import style from "./navbar.module.scss";
import mainLogo from "../../assets/main-logo.svg";
import searchIcon from "../../assets/search-icon.svg";
import accIcon from "../../assets/acc-icon.svg";
// import likeIcon from "../../assets/like-icon.svg";
import cartIcon from "../../assets/cart-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { localStorageProvider } from "../../utils/methods";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { removeAuthData } from "../../redux/slices/authSlice";
import Swal from "sweetalert2";
import { authProvider } from "../../services/Auth/authProvider";
import { GenericPaths } from "../../services/genericPaths";

export default function Navbar() {
  const navigate = useNavigate();
  const authFromLocalStorage = localStorageProvider.get(
    GenericPaths.AUTH_DATA_LOCAL_STORAGE
  );
  const authFromRedux = useAppSelector((state) => state.auth.user);
  const authData = authFromLocalStorage || authFromRedux;
  const dispatch = useAppDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: any, setter: any) => {
    setter(e.target.value);
  };

  useEffect(() => {
    if (authData) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [authData]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#337CCF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        authProvider.logout();
        dispatch(removeAuthData());
        setIsLogin(false);
        Swal.fire({
          title: "Logout ...!",
          text: "You have been logout ...!",
          icon: "success",
          confirmButtonColor: "#337CCF",
        });
        navigate(`/login`)
      }
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    navigate(`/search?search=${searchQuery}`)

  };
  return (
    <>
      <nav className={style.navbar_container}>
        <div>
          <Link to={"login"}>
            <img src={mainLogo} alt="Logo" />
          </Link>
        </div>
        <div className={style.navbar_sub_container_right}>
          <div className={style.search_div}>
            <img src={searchIcon} alt="search-icon" />
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => handleChange(e, setSearchQuery)}
              />
            </form>
          </div>
          {isLogin ? (
            <div className={style.right_icons}>
              <div className={style.right_icon_div}>
                <Link className={style.right_icon_div} to={"my-account"}>
                  <img src={accIcon} alt="acc-icon" />
                  <p>My account</p>
                </Link>
              </div>
              {/* <div className={style.right_icon_div}>
                <img src={likeIcon} alt="like-icon" />
                <p>Wishlist</p>
              </div> */}
              <div className={style.right_icon_div}>
                <Link className={style.right_icon_div} to={"cart"}>
                  <img src={cartIcon} alt="cart-icon" />
                  <p>Cart</p>
                </Link>
              </div>
              <div className={style.right_icon_div}>
                <p onClick={handleLogout}>Logout</p>
              </div>
            </div>
          ) : (
            <div className={style.right_icons}>
              <div className={style.right_icon_div}>
                <Link to={"login"}>
                  <p>Login</p>
                </Link>
              </div>
              <div className={style.right_icon_div}>
                <Link to={"sign-up"}>
                  <p>SignUp</p>
                </Link>
              </div>
              <div className={style.right_icon_div}>
                <Link className={style.right_icon_div} to={"cart"}>
                  <img src={cartIcon} alt="cart-icon" />
                  <p>Cart</p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
