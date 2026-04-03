import EmptyState from "@components/EmptyState";
import FetchError from "@components/FetchError";
import LoadingState from "@components/LoadingState";
import ProductCard from "@components/ProductCard";
import useFavorites from "@hooks/useFavorites";
import styles from "./FavoritesPage.module.scss";

const FavoritesPage = () => {
  const { favorites: products, isLoading, isError, refetch } = useFavorites();

  if (isError)
    return <FetchError message="Error loading favorites" onRetry={refetch} />;

  const isEmpty = !isLoading && products?.length === 0;

  return (
    <div className={styles.container}>
      {isLoading && <LoadingState />}

      {isEmpty && <EmptyState message="No favorites yet" />}

      <div className={styles.cardContainer}>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
