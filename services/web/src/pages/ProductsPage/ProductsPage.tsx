import { SortOrder } from "@cart-app/types";
import CategoryCard from "@components/CategoryCard";
import EmptyState from "@components/EmptyState";
import FetchError from "@components/FetchError";
import LoadingState from "@components/LoadingState";
import ProductCard from "@components/ProductCard";
import ProductSort from "@components/ProductSort";
import SearchBar from "@components/SearchBar/SearchBar";
import useProductsPage from "@hooks/useProductsPage";
import styles from "./ProductsPage.module.scss";

const ProductsPage = () => {
  const {
    search,
    categories,
    products,
    ref,
    handleSearch,
    handleCategory,
    handleSortOrder,
    isLoading,
    isError,
    refetch,
  } = useProductsPage();

  if (isError)
    return <FetchError message="Error loading products" onRetry={refetch} />;

  const isEmpty = !isLoading && products.length === 0;

  return (
    <div className={styles.container}>
      {isLoading && <LoadingState />}

      <SearchBar
        value={search.search || ""}
        placeholder="Search for..."
        onSearchChange={handleSearch}
      />

      <div className={styles.categoriesContainer}>
        <CategoryCard
          key="all"
          name="All"
          id=""
          isActive={!search.categoryId}
          onSelect={handleCategory}
        />
        {categories?.map((cat) => (
          <CategoryCard
            key={cat.id}
            name={cat.name}
            id={cat.id}
            isActive={search.categoryId === cat.id}
            onSelect={handleCategory}
          />
        ))}
      </div>

      <div className={styles.sortWrapper}>
        <span className={styles.sortText}>Sort by name</span>
        <ProductSort
          onSortOrderChange={handleSortOrder}
          sortOrder={search.sortOrder || SortOrder.ASC}
        />
      </div>

      <p className={styles.activeCategory}>
        {search.categoryId
          ? categories?.find((cat) => cat.id === search.categoryId)?.name
          : "All"}
      </p>
      {isEmpty && <EmptyState message="No products found" />}

      <div className={styles.cardContainer}>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div ref={ref} style={{ height: 1 }} />
    </div>
  );
};

export default ProductsPage;
