import favorite from "@assets/images/favorite.svg";
import home from "@assets/images/home.svg";
import appLogo from "@assets/images/Logo.svg";
import notification from "@assets/images/notification.svg";
import search from "@assets/images/search.svg";
import { appLayoutRoute } from "@routes/appLayout";
import favoritesRoute from "@routes/favoritesRoute";
import productRoute from "@routes/productRoute";
import { Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import styles from "./AppLayout.module.scss";

const AppLayout = () => {
  const matchRoute = useMatchRoute();

  const isHomeActive = !!matchRoute({ to: appLayoutRoute.id });
  const isProductActive = !!matchRoute({ to: productRoute.id });
  const isFavoriteActive = !!matchRoute({ to: favoritesRoute.id });

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <img src={appLogo} alt="logo" className={styles.logo} />
        <img src={notification} alt="notifications" />
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <nav className={styles.navbar}>
          <Link to={appLayoutRoute.id} search={{}}>
            <img
              src={home}
              alt="home"
              className={`${styles.navImage} ${isHomeActive ? styles.active : ""}`}
            />
          </Link>
          <Link to={productRoute.id} search={{}}>
            <img
              src={search}
              alt="search"
              className={`${styles.navImage} ${isProductActive ? styles.active : ""}`}
            />
          </Link>
          <Link to={favoritesRoute.id} search={{}}>
            <img
              src={favorite}
              alt="favorites"
              className={`${styles.navImage} ${isFavoriteActive ? styles.active : ""}`}
            />
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default AppLayout;
