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

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">
        Loading properties...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        {error}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold text-gray-800">
        Properties
      </h1>

      <div className="bg-white p-4 rounded-lg shadow flex flex-wrap gap-3 items-center">

        <input
          className="border rounded-lg px-3 py-2"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button
          onClick={handleLocationSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />

        <button
          onClick={handlePriceSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Price
        </button>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Select Type</option>
          <option value="ROOM">Room</option>
          <option value="FLAT">Flat</option>
          <option value="HOUSE">House</option>
        </select>

        <button
          onClick={handleTypeSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Type
        </button>

        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Reset
        </button>

      </div>

      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No properties found.</p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-6">

          <button
            onClick={handlePreviousPage}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-gray-600">
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
};

export default PropertyListPage;