import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PropertyListPage from "../pages/PropertyListPage";
import PropertyDetailPage from "../pages/PropertyDetailPage";
import CreatePropertyPage from "../pages/CreatePropertyPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MyPropertiesPage from "../pages/MyPropertiesPage";
import ProtectedRoute from "../components/ProtectedRoute";
import FavoritesPage from "../pages/FavoritesPage";
import MessagesPage from "../pages/MessagesPage";
import EditPropertyPage from "../pages/EditPropertyPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import TermsPage from "../pages/TermsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/properties" element={<PropertyListPage />} />
      <Route path="/properties/:id" element={<PropertyDetailPage />} />
      <Route
        path="/create-property"
        element={
          <ProtectedRoute requiredRole="OWNER">
            <CreatePropertyPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/my-properties"
        element={
          <ProtectedRoute requiredRole="OWNER">
            <MyPropertiesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <MessagesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-property/:id"
        element={
          <ProtectedRoute requiredRole="OWNER">
            <EditPropertyPage />
          </ProtectedRoute>
        }
      />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />
    </Routes>
  );
};

export default AppRoutes;
