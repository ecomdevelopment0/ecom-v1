import style from "./review.module.scss";
import yellowStarIcon from "../../assets/yellow-star-icon.svg";
import greyStarIcon from "../../assets/grey-star-icon.svg";

export default function Review({ review, name, stars, profileImage }: any) {
  const renderStars = () => {
    const totalStars = 5;
    const starElements = [];

    for (let i = 1; i <= totalStars; i++) {
      if (i <= stars) {
        starElements.push(
          <div key={i}>
            <img src={yellowStarIcon} alt="star" />
          </div>
        );
      } else {
        starElements.push(
          <div key={i}>
            <img src={greyStarIcon} alt="e-star" />
          </div>
        );
      }
    }

    return starElements;
  };
  return (
    <>
      <div className={style.review_container}>
        <div className={style.user}>
          <img className={style.user_img} src={profileImage} alt="" />
          <div>
            <h5>{name}</h5>
            <div className={style.stars_div}>{renderStars()}</div>
          </div>
        </div>
        <p>{review}</p>
      </div>
    </>
  );
}
