import error from "@assets/images/error.svg";
import useGoHome from "@hooks/useGoHome";
import { FaTimes } from "react-icons/fa";
import styles from "./FetchError.module.scss";

interface FetchErrorProps {
  message: string;
  onRetry?: () => void;
}

const FetchError = ({ message, onRetry }: FetchErrorProps) => {
  const goHome = useGoHome();

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={goHome}>
        <FaTimes size={32} />
      </button>
      <div className={styles.innerContainer}>
        <img src={error} alt="Error Icon" className={styles.errorIcon}></img>
        <p className={styles.message}>{message}</p>
        {onRetry && (
          <button className={styles.retryButton} onClick={onRetry}>
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default FetchError;
