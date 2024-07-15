import { useNavigate } from "react-router-dom";
import { getRandomColor } from "../../utils/generator";
import style from "./category-tab.module.scss";

interface categoryTabInterface {
  text: string;
  categoryId: string;
}

export default function CategoryTab({
  text,
  categoryId,
}: categoryTabInterface) {
  const navigate = useNavigate();
  const randomColor = getRandomColor();
  const handleClick = () => {
    navigate(`/result/${categoryId}?filterType=category`);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={style.categoryTabContainer}
        style={{ backgroundColor: randomColor }}
      >
        <h6>{text}</h6>
      </div>
    </>
  );
}
