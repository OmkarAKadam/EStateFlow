import { useEffect, useState } from "react";
import { getMyProperties, deleteProperty } from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const MyPropertiesPage = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getMyProperties();
      setProperties(response.data || []);
    } catch (err) {
      setError("Failed to load properties.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this property?");
    if (!confirmDelete) return;

    try {
      await deleteProperty(id);

      setProperties((prev) => prev.filter((p) => p.id !== id));

    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
        <p className="text-red-500 mb-3">{error}</p>
        <button
          onClick={fetchMyProperties}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          My Properties
        </h1>

        <button
          onClick={() => navigate("/create-property")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Property
        </button>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <p className="text-gray-500">
            You haven’t added any properties yet.
          </p>
          <button
            onClick={() => navigate("/create-property")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Create your first property
          </button>
        </div>
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