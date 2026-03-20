import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPropertyById, updateProperty } from "../services/propertyService";
import PropertyForm from "../components/PropertyForm";

const EditPropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProperty();
  }, []);

  const loadProperty = async () => {
    try {
      const res = await getPropertyById(id);
      setProperty(res.data);
    } catch {
      console.error("Failed to load property");
    }
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await updateProperty(id, data);
      navigate(`/properties/${id}`);
    } catch {
      console.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!property) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Edit Property</h1>

      <PropertyForm
        initialData={property}
        onSubmit={handleSubmit}
        isSubmitting={loading}
      />
    </div>
  );
};

export default EditPropertyPage;