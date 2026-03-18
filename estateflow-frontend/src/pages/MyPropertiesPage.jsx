import { useEffect, useState } from "react";
import { getMyProperties, deleteProperty } from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";

const MyPropertiesPage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const response = await getMyProperties();
      setProperties(response.data);
    } catch (error) {
      console.error("Failed to load properties", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await deleteProperty(id);

      setProperties((prev) => prev.filter((p) => p.id !== id));

    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        My Properties
      </h1>

      {properties.length === 0 ? (
        <p className="text-gray-500">
          No properties created yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isOwner={true}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPropertiesPage;