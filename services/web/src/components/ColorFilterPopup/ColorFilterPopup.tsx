import filter from "@assets/images/filter.svg";
import popupExit from "@assets/images/popup_exit.svg";
import ColorFilter from "@components/ColorFilter";
import { useState } from "react";
import styles from "./ColorFilterPopup.module.scss";

const ColorFilterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.buttonWrapper}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.openButton}>
        <img src={filter} alt="filter" />
      </button>

      {isOpen && (
        <div className={styles.popup}>
          <div className={styles.popupUpper}>
            <h1>Filter</h1>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.exitButton}
            >
              <img src={popupExit} alt="exit" className={styles.exitButton} />
            </button>
          </div>
          <ColorFilter />
        </div>
      )}
    </div>
  );
};

export default ColorFilterPopup;
