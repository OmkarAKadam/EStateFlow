import { useEffect, useState } from "react";
import {
  getAllProperties,
  searchByLocation,
} from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadFeaturedProperties();
  }, []);

  const loadFeaturedProperties = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getAllProperties(0);
      setProperties(res.data.content.slice(0, 6));
    } catch (err) {
      console.error(err);
      setError("Failed to load properties.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      loadFeaturedProperties();
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await searchByLocation(search);
      setProperties(res.data);
    } catch (err) {
      console.error(err);
      setError("Search failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="space-y-12">
      {/* 🔥 HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Find Your Perfect Property
        </h1>

        <p className="text-lg mb-8 opacity-90">
          Buy, sell, or rent properties easily with EstateFlow
        </p>

        {/* SEARCH */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-xl mx-auto">
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Search by location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full px-4 py-3 rounded-lg text-black focus:outline-none"
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 disabled:opacity-60"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {/* 🏘 PROPERTIES */}
      <div className="max-w-7xl mx-auto px-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Featured Properties
        </h2>

        {/* ERROR */}
        {error && <p className="text-red-500">{error}</p>}

        {/* LOADING */}
        {loading ? (
          <p className="text-gray-500">Loading properties...</p>
        ) : properties.length === 0 ? (
          <p className="text-gray-500">
            No properties found. Try a different location.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

        {/* VIEW ALL */}
        <div className="text-center pt-4">
          <button
            onClick={() => navigate("/properties")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            View All Properties
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
