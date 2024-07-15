import style from "./error-404.module.scss";
import errorImg from "../../../assets/404-img.svg"
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <>
      <Navbar />
      <div className={style.error_container}>
        <div className={style.error_left}>
          <h2>404</h2>
          <h1>Uh-Oh! Lost in the Digital Wilderness</h1>
          <p>Whoopsie-daisy! It seems like you've wandered into the digital unknown. The page you're searching for seems to be playing hide and seek with us.</p>
          <button><Link className={style.link} to={""}>Go back home</Link></button>
        </div>
        <div className={style.error_right}>
          <img src={errorImg} alt="404-img" />
        </div>
      </div>
      <Footer />
    </>
  )
}
