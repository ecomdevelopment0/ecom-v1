import { useState } from "react";
import style from "./add-review.module.scss";
import yellowStarIcon from "../../assets/yellow-star-icon.svg";
import greyStarIcon from "../../assets/grey-star-icon.svg";

const AddReview = ({ name, email, onSubmit }: any) => {
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [error, setError] = useState("");

  const handleStarClick = (starCount: number) => {
    setStars(starCount);
    setError("");
  };

  const handleSubmit = () => {
    if (!review.trim()) {
      setError("Please add your review text.");
      return;
    }
    if (stars < 1) {
      setError("Please select at least one star.");
      return;
    }
    onSubmit({ name, email, review, stars });
    setReview("");
    setStars(0);
  };

  const renderStars = () => {
    const totalStars = 5;
    const starElements = [];

    for (let i = 1; i <= totalStars; i++) {
      starElements.push(
        <div key={i} onClick={() => handleStarClick(i)} className={style.star}>
          <img src={i <= stars ? yellowStarIcon : greyStarIcon} alt="star" />
        </div>
      );
    }

    return starElements;
  };

  return (
    <div className={style.addReviewContainer}>
      <div className={style.reviewText}>
        <textarea
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
            setError("");
          }}
          placeholder="Write your review here..."
        />
      </div>
      <div className={style.stars_div}>{renderStars()}</div>
      {error && <p className={style.error}>{error}</p>}
      <button onClick={handleSubmit} className={style.submitButton}>
        Submit Review
      </button>
    </div>
  );
};

export default AddReview;
