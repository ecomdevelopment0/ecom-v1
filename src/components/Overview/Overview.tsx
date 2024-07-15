import style from "./overview.module.scss";
import orderIcon from "../../assets/orders-icon.svg";
// import wishlistIcon from "../../assets/like-icon-grey.svg";
import accIcon from "../../assets/acc-icon-grey.svg";
import savedCardsIcon from "../../assets/saved-cards-icon-grey.svg";
import contactUsIcon from "../../assets/contact-us-icon-grey.svg";

interface OverviewInterface {
  setActiveState:(a:string) => void
}

export default function Overview({setActiveState}:OverviewInterface) {
  return (
    <>
    <div className={style.overview_container}>
      <div onClick={()=>setActiveState('MyOrders')} className={style.cont}>
        <img src={orderIcon} alt="" />
        <h4>Orders</h4>
        <p>View your order history</p>
      </div>
      {/* <div className={style.cont}>  
        <img src={wishlistIcon} alt="" />
        <h4>Wishlist</h4>
        <p>Products handpicked by you</p>
      </div> */}
      <div onClick={()=>setActiveState('Profile')} className={style.cont}>
        <img src={accIcon} alt="" />
        <h4>Profile details</h4>
        <p>Change your profile details</p>
      </div>
      <div onClick={()=>setActiveState('Inbox')} className={style.cont}>
        <img src={savedCardsIcon} alt="" />
        <h4>Inbox</h4>
        <p>Save your keys here</p>
      </div>
      <div onClick={()=>setActiveState('ContactUs')} className={style.cont}>
        <img src={contactUsIcon} alt="" />
        <h4>Contact us</h4>
        <p>Connect with our customer service</p>
      </div>
    </div>
    </>
  )
}
