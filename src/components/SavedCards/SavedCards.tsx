import style from "./saved-cards.module.scss";

export default function SavedCards() {
  return (
    <>
      <div className={style.container_div}>
        <div className={style.heading_div}>
          <h3>Saved cards</h3>
        </div>
        <div className={style.main_div}>
            <h3>Debit cards</h3>
            <div className={style.cards}>
              
            </div>
        </div>
      </div>
    </>
  );
}
