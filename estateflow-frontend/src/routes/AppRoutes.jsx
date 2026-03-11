import { Routes, Route } from "react-router-dom";
import PropertyListPage from "../pages/PropertyListPage";
import PropertyDetailPage from "../pages/PropertyDetailPage";
import CreatePropertyPage from "../pages/CreatePropertyPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PropertyListPage />} />
      <Route path="/properties/:id" element={<PropertyDetailPage />} />
      <Route path="/create-property" element={<CreatePropertyPage />} />
    </Routes>
  );
};

export default AppRoutes;