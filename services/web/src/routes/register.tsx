import RegisterPage from "@pages/Register";
import { createRoute } from "@tanstack/react-router";
import { AppPaths } from "./paths";
import rootRoute from "./root";

export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: AppPaths.REGISTER,
  component: () => <RegisterPage />,
});
