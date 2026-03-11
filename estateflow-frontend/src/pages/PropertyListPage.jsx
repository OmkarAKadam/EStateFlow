import { useEffect, useState } from "react";
import { getAllProperties } from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";

const PropertyListPage = () => {

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const response = await getAllProperties();
      setProperties(response.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Properties</h1>

      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}

    </div>
  );
};

export default PropertyListPage;