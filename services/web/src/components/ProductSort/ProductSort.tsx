import { SortOrder } from "@cart-app/types";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import styles from "./ProductSort.module.scss";

interface ProductSortProps {
  sortOrder: SortOrder;
  onSortOrderChange: (order: SortOrder) => void;
}

const ProductSort = ({ sortOrder, onSortOrderChange }: ProductSortProps) => {
  const handleToggle = () => {
    onSortOrderChange(
      sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC,
    );
  };

  return (
    <button className={styles.directionBtn} onClick={handleToggle}>
      {sortOrder === SortOrder.ASC ? <FaArrowUp /> : <FaArrowDown />}
    </button>
  );
};

export default ProductSort;
