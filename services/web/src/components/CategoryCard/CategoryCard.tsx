import styles from "./CategoryCard.module.scss";

interface CategoryCardProps {
  name: string;
  id: string;
  isActive?: boolean;
  onSelect: (id: string) => void;
}

const CategoryCard = ({ name, id, isActive, onSelect }: CategoryCardProps) => {
  return (
    <div className={styles.card} onClick={() => onSelect(id)}>
      {name}
    </div>
  );
};

export default CategoryCard;
