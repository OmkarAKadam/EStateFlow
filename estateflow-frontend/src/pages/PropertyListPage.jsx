import { useEffect, useState } from "react";
import {
  getAllProperties,
  searchByLocation,
  searchByPrice,
  searchByType,
} from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";
import Loader from "../components/Loader";

const PropertyListPage = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      setError("");
      const res = await getAllProperties(page);
      setProperties(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      setError("Failed to load properties.");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = async () => {
    if (!location.trim()) return;

    setLoading(true);
    try {
      const res = await searchByLocation(location);
      setProperties(res.data);
      setTotalPages(1);
      setPage(0);
    } catch {
      setError("Location search failed.");
    } finally {
      setLoading(false);
    }
  };

  const handlePriceSearch = async () => {
    if (!minPrice && !maxPrice) return;

    setLoading(true);
    try {
      const res = await searchByPrice(minPrice, maxPrice);
      setProperties(res.data);
      setTotalPages(1);
      setPage(0);
    } catch {
      setError("Price search failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleTypeSearch = async () => {
    if (!type) return;

    setLoading(true);
    try {
      const res = await searchByType(type);
      setProperties(res.data);
      setTotalPages(1);
      setPage(0);
    } catch {
      setError("Type filter failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setType("");
    setPage(0);
    fetchProperties();
  };

  const handlePreviousPage = () => setPage((p) => Math.max(p - 1, 0));
  const handleNextPage = () => setPage((p) => Math.min(p + 1, totalPages - 1));

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Explore Properties
        </h1>
        <p className="text-gray-500 mt-2">
          Find the right place based on your needs
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-wrap gap-4 mb-10">

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full sm:w-auto"
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
          className="border px-4 py-2 rounded-lg w-full sm:w-auto"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full sm:w-auto"
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
          className="border px-4 py-2 rounded-lg"
        >
          <option value="">Type</option>
          <option value="ROOM">Room</option>
          <option value="FLAT">Flat</option>
          <option value="HOUSE">House</option>
        </select>

        <button
          onClick={handleTypeSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Filter
        </button>

        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : properties.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          No properties found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={handlePreviousPage}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-gray-600">
            Page {page + 1} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

    </main>
  );
};

export default PropertyListPage;