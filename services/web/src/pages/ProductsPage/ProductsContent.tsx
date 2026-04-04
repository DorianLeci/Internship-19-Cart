import { SortOrder } from "@cart-app/types";
import CategoryCard from "@components/CategoryCard";
import ColorFilterPopup from "@components/ColorFilterPopup";
import EmptyState from "@components/EmptyState";
import FetchError from "@components/FetchError";
import LoadingState from "@components/LoadingState";
import ProductCard from "@components/ProductCard";
import ProductSort from "@components/ProductSort";
import SearchBar from "@components/SearchBar/SearchBar";
import useFilterContext from "@hooks/useColorFilter";
import useProductsPage from "@hooks/useProductsPage";
import { useMemo } from "react";
import styles from "./ProductsPage.module.scss";

const ProductsContent = () => {
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

  const { selectedColors } = useFilterContext();

  const filteredProducts = useMemo(() => {
    if (selectedColors.length === 0) return products;

    return products.filter((product) =>
      product.images.some((img) =>
        img.color ? selectedColors.includes(img.color) : false,
      ),
    );
  }, [products, selectedColors]);

  if (isError)
    return <FetchError message="Error loading products" onRetry={refetch} />;

  const isEmpty = !isLoading && filteredProducts.length === 0;

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
        {filteredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <ColorFilterPopup />

      <div ref={ref} style={{ height: 1 }} />
    </div>
  );
};

export default ProductsContent;
