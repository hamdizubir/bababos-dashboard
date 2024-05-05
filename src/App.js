import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login";
import ProductsPage from "./pages/Products";
import DashboardHeader from "./components/header";
import ProductDetailPage from "./pages/ProductDetail";
import ProfilePage from "./pages/Profile";
function App() {
  function IsUnauthorized({ children }) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
      return <Navigate to="/dashboard/products" replace />;
    }

    return children;
  }

  function RequireAuth({ children }) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      localStorage.removeItem("isLoggedIn");
      return <Navigate to="/auth/login" replace />;
    }

    return children;
  }
  return (
    <Router>
      <Routes>
        <Route
          exact={false}
          path="/auth/*"
          element={
            <Routes>
              <Route
                path="/login"
                element={
                  <IsUnauthorized>
                    <LoginPage />
                  </IsUnauthorized>
                }
              />
              <Route exact path="/" element={<Navigate to="/auth/login" />} />
            </Routes>
          }
        />
        <Route
          exact={false}
          path="/dashboard/*"
          element={
            <RequireAuth>
              <DashboardHeader>
                <Routes>
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/product-detail" element={<ProductDetailPage />} />
                </Routes>
              </DashboardHeader>
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
