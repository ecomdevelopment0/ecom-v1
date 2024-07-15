import style from "./accordion.module.scss";
import downArrowIcon from "../../assets/down-arrow-icon.svg";

interface AccordionProps {
  title: React.ReactNode;
  content: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

export const Accordion = ({
  title,
  content,
  isOpen,
  onClick,
}: AccordionProps) => {
  const toggleAccordion = () => {
    onClick();
  };

  return (
    <div className={style.accordion}>
      <div className={style.accordionHeader} onClick={toggleAccordion}>
        <div className={style.accordionTitle}>{title}</div>
        {isOpen ? (
          <img
            className={style.accordionArrowDown}
            src={downArrowIcon}
            alt=""
          />
        ) : (
          <img className={style.accordionArrowUp} src={downArrowIcon} alt="" />
        )}
      </div>
      {isOpen && <div className={style.accordionContent}>{content}</div>}
    </div>
  );
};
