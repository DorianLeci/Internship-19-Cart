import { AuthProvider } from "@context/AuthContext";
import { FavoritesProvider } from "@context/FavoritesContext";
import useAuth from "@hooks/useAuth";
import { router } from "@routes/router";
import { RouterProvider } from "@tanstack/react-router";
import { queryClient } from "main";
import { Toaster } from "react-hot-toast";

function InnerApp() {
  const auth = useAuth();
  const context = { auth, queryClient };
  return <RouterProvider router={router} context={context} />;
}

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <InnerApp />
        <Toaster
          position="top-right"
          toastOptions={{ duration: 2500 }}
        ></Toaster>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
