import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AppPaths } from "./paths";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <nav>
        <Link to={AppPaths.HOME}>Home</Link>
        <Link to={AppPaths.REGISTER}>Register</Link>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

export default rootRoute;
