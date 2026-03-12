import { useEffect, useState } from "react";
import { getMyProperties } from "../services/propertyService";
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

  return (
    <div>

      <h1>My Properties</h1>

      {properties.length === 0 && (
        <p>No properties created yet.</p>
      )}

      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
        />
      ))}

    </div>
  );
};

export default MyPropertiesPage;