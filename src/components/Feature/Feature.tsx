import style from "./feature.module.scss";
import instantIcon from "../../assets/instant-icon.svg"
import safeIcon from "../../assets/safe-icon.svg"
import supportIcon from "../../assets/support-icon.svg"
import paymentIcon from "../../assets/payment-icon.svg"

export default function Feature() {
    return (
        <>
            <div className={style.features_div}>
                <div className={style.feature}>
                    <img src={instantIcon} alt="" />
                    <h4>Instant Delivery</h4>
                </div>
                <div className={style.feature}>
                    <img src={safeIcon} alt="" />
                    <h4>100% Safe</h4>
                </div>
                <div className={style.feature}>
                    <img src={supportIcon} alt="" />
                    <h4>24/7 Support</h4>
                </div>
                <div className={style.feature}>
                    <img src={paymentIcon} alt="" />
                    <h4>Online Payment</h4>
                </div>
            </div>
        </>
    )
}
