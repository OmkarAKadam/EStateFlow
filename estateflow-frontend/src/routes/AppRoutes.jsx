import { Routes, Route } from "react-router-dom";
import PropertyListPage from "../pages/PropertyListPage";
import PropertyDetailPage from "../pages/PropertyDetailPage";
import CreatePropertyPage from "../pages/CreatePropertyPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MyPropertiesPage from "../pages/MyPropertiesPage";
import ProtectedRoute from "../components/ProtectedRoute";
import FavoritesPage from "../pages/FavoritesPage";
import InboxPage from "../pages/InboxPage";
import SentMessagesPage from "../pages/SentMessagesPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PropertyListPage />} />
      <Route path="/properties/:id" element={<PropertyDetailPage />} />
      <Route path="/create-property" element={<CreatePropertyPage />} />
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
      <Route path="/messages" element={<InboxPage />} />

      <Route path="/messages/sent" element={<SentMessagesPage />} />
    </Routes>
  );
};

export default AppRoutes;
