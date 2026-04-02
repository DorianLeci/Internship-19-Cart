import WelcomeScreen from "@components/WelcomeScreen";
import { createRoute } from "@tanstack/react-router";
import rootRoute from "./root";

const welcomeRoute = createRoute({
  path: "welcome",
  getParentRoute: () => rootRoute,
  component: () => <WelcomeScreen />,
});

export default welcomeRoute;
