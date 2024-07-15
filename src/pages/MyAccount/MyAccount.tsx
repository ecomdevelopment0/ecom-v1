import { useEffect, useState } from "react";
import ContactUs from "../../components/ContactUs/ContactUs";
import HelpCentre from "../../components/HelpCentre/HelpCentre";
import MyOrders from "../../components/MyOrders/MyOrders";
import Overview from "../../components/Overview/Overview";
import Profile from "../../components/Profile/Profile";
// import SavedCards from "../../components/SavedCards/SavedCards";
// import SavedUPIs from "../../components/SavedUPIs/SavedUPIs";
import style from "./my-account.module.scss";
import Inbox from "../../components/Inbox/Inbox";
import TermsAndCondition from "../../components/TermsAndCondition/TermsAndCondition";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";
import RefundPolicy from "../../components/RefundPolicy/RefundPolicy";
import InstallGuide from "../../components/InstallGuide/InstallGuide";
import { GenericPaths } from "../../services/genericPaths";
import { localStorageProvider } from "../../utils/methods";
import { useAppSelector } from "../../hooks/hooks";

const authFromLocalStorage = localStorageProvider.get(
  GenericPaths.AUTH_DATA_LOCAL_STORAGE
);

export default function MyAccount() {
  const [load, setLoad] = useState<boolean>();
  const [profileData, setProfileData] = useState({
    accessToken: "",
    city: "",
    email: "",
    isAuthenticated: true,
    name: "",
    phoneNo: "",
    refreshToken: "",
    state: "",
    userId: "",
  });
  const authFromRedux = useAppSelector((state) => state.auth.user);
  const authData = authFromLocalStorage || authFromRedux;

  const [activeComponent, setActiveComponent] = useState("Overview");
  function setActiveState(state: string) {
    setActiveComponent(state);
  }

  useEffect(() => {
    if (authData) {
      setProfileData(
        localStorageProvider.get(GenericPaths.AUTH_DATA_LOCAL_STORAGE)
      );
    }
  }, [authData, load]);
  return (
    <>
      <div className={style.my_account_container}>
        <div className={style.heading_div}>
          <h2>My account</h2>
          <h6>{profileData?.name}</h6>
        </div>

        <div className={style.main_container}>
          <div className={style.container_left}>
            <h6
              className={activeComponent === "Overview" ? style.active : ""}
              onClick={() => setActiveComponent("Overview")}
            >
              Overview
            </h6>
            <div className={style.border_div}></div>
            <h5>ORDERS</h5>
            <h6
              className={activeComponent === "MyOrders" ? style.active : ""}
              onClick={() => setActiveComponent("MyOrders")}
            >
              My orders
            </h6>
            <div className={style.border_div}></div>
            <h5>MY ACCOUNT</h5>
            <h6
              className={activeComponent === "Profile" ? style.active : ""}
              onClick={() => setActiveComponent("Profile")}
            >
              Profile
            </h6>
            <div className={style.border_div}></div>
            <h5>INBOX</h5>
            <h6
              className={activeComponent === "Inbox" ? style.active : ""}
              onClick={() => setActiveComponent("Inbox")}
            >
              Inbox
            </h6>
            <div className={style.border_div}></div>
            <h5>LEGAL</h5>
            <h6
              className={
                activeComponent === "TermsAndConditions" ? style.active : ""
              }
              onClick={() => setActiveComponent("TermsAndConditions")}
            >
              Terms & conditions
            </h6>
            <h6
              className={
                activeComponent === "PrivacyPolicy" ? style.active : ""
              }
              onClick={() => setActiveComponent("PrivacyPolicy")}
            >
              Privacy Policy
            </h6>
            <h6
              className={activeComponent === "RefundPolicy" ? style.active : ""}
              onClick={() => setActiveComponent("RefundPolicy")}
            >
              Refund Policy
            </h6>
            <div className={style.border_div}></div>
            <h5>SUPPORT</h5>
            <h6
              className={activeComponent === "HelpCentre" ? style.active : ""}
              onClick={() => setActiveComponent("HelpCentre")}
            >
              Help centre
            </h6>
            <h6
              className={activeComponent === "ContactUs" ? style.active : ""}
              onClick={() => setActiveComponent("ContactUs")}
            >
              Contact us
            </h6>
            <h6
              className={activeComponent === "InstallGuide" ? style.active : ""}
              onClick={() => setActiveComponent("InstallGuide")}
            >
              How to install guide
            </h6>
          </div>
          <div className={style.container_right}>
            {activeComponent === "Overview" && (
              <Overview setActiveState={setActiveState} />
            )}
            {activeComponent === "MyOrders" && <MyOrders />}
            {activeComponent === "Profile" && (
              <Profile load={load} setLoad={setLoad} />
            )}
            {activeComponent === "Inbox" && <Inbox />}
            {activeComponent === "TermsAndConditions" && <TermsAndCondition />}
            {activeComponent === "PrivacyPolicy" && <PrivacyPolicy />}
            {activeComponent === "RefundPolicy" && <RefundPolicy />}
            {activeComponent === "HelpCentre" && <HelpCentre />}
            {activeComponent === "ContactUs" && <ContactUs />}
            {activeComponent === "InstallGuide" && <InstallGuide />}
          </div>
        </div>
      </div>
    </>
  );
}
