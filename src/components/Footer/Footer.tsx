import style from "./footer.module.scss";
import footerLogo from "../../assets/footer-logo.svg"
import { Link } from "react-router-dom";
import phoneIcon from "../../assets/phone-icon.svg"
import mailIcon from "../../assets/mail-icon.svg"
import visaImg from "../../assets/visa-img.png"
import masterCardImg from "../../assets/mastercard-img.png"
import paypalImg from "../../assets/paypal-img.png"
import gpayImg from "../../assets/gpay-img.png"

export default function Footer() {
    return (
        <>
            <footer className={style.footer}>
                <div className={style.footer_container}>
                    <div className={style.left_container}>
                        <img src={footerLogo} alt="Footer Logo" loading="lazy" />
                        <p>little description about the website little description about the website little description about the website little description about the website little description about the website </p>
                    </div>
                    <div className={style.center_container}>
                        <div className={style.center_div}>
                            <h4>Policy</h4>
                            <p><Link className={style.link} to={""}>Privacy Policy</Link></p>
                            <p><Link className={style.link} to={""}>Terms of use</Link></p>
                            <p><Link className={style.link} to={""}>Return & shipping</Link></p>
                            <p><Link className={style.link} to={""}>Cancellation Policy</Link></p>
                        </div>
                        <div className={style.center_div}>
                            <h4>Support</h4>
                            <p><Link className={style.link} to={""}>FAQs</Link></p>
                            <p><Link className={style.link} to={""}>About Us</Link></p>
                            <p><Link className={style.link} to={""}>Other</Link></p>

                        </div>
                        <div className={style.center_div}>
                            <h4>Contact Us</h4>
                            <div className={style.contact_info_div}>
                                <img src={phoneIcon} alt="Phone-Icon" />
                                <div>+91-1223344586</div>
                            </div>
                            <div className={style.contact_info_div}>
                                <img src={mailIcon} alt="Mail-Icon" />
                                <div className={style.mail_text}>support@cyberguardkeyhub.in</div>
                            </div>
                        </div>
                    </div>
                    <div className={style.right_container}>
                        <p>Payment methods</p>
                        <div className={style.payment_methods_imgs}>
                            <img src={visaImg} alt="" />
                            <img src={masterCardImg} alt="" />
                            <img src={paypalImg} alt="" />
                            <img src={gpayImg} alt="" />
                        </div>
                    </div>
                </div>
                <div className={style.footer_last_line}>
                    <p>Copyright @ 2023 CyberGuard KeyHub. All rights reserved</p>
                </div>
            </footer>
        </>
    )
}
