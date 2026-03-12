import { useEffect, useState } from "react";
import {
  getAllProperties,
  searchByLocation,
  searchByPrice,
  searchByType,
} from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";

const PropertyListPage = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    fetchProperties();
  }, [page]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllProperties(page);

      setProperties(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch properties:", err);
      setError("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = async () => {
    try {
      const response = await searchByLocation(location);
      setProperties(response.data);
      setTotalPages(1);
      setPage(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePriceSearch = async () => {
    try {
      const response = await searchByPrice(minPrice, maxPrice);
      setProperties(response.data);
      setTotalPages(1);
      setPage(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTypeSearch = async () => {
    try {
      const response = await searchByType(type);
      setProperties(response.data);
      setTotalPages(1);
      setPage(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = () => {
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setType("");
    fetchProperties();
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Properties</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button onClick={handleLocationSearch}>Search Location</button>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <button onClick={handlePriceSearch}>Search Price</button>

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="ROOM">Room</option>
          <option value="FLAT">Flat</option>
          <option value="HOUSE">House</option>
        </select>

        <button onClick={handleTypeSearch}>Search Type</button>

        <button onClick={handleReset}>Reset</button>
      </div>

      {properties.length > 0 ? (
        properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))
      ) : (
        <p>No properties found.</p>
      )}

      {totalPages > 1 && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={handlePreviousPage} disabled={page === 0}>
            Previous
          </button>

          <span style={{ margin: "0 10px" }}>
            Page {page + 1} of {totalPages}
          </span>

          <button onClick={handleNextPage} disabled={page >= totalPages - 1}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyListPage;
