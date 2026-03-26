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
      const errorMsg =
        err.response?.data?.message ||
        "Unable to load properties. Try again later.";
      setError(errorMsg);
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
      const errorMsg =
        err.response?.data?.message || "Search failed. Try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <main className="flex flex-col min-h-screen">
      <section className="relative w-full h-[520px] flex items-center justify-center px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900" />

        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80')",
          }}
        />

        <div className="relative z-10 max-w-3xl w-full space-y-6 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            No Brokers. No Nonsense.
            <br />
            <span className="text-blue-400">Just Real Properties.</span>
          </h1>

          <p className="text-lg md:text-xl opacity-90">
            Connect directly with owners. Save time, save money, avoid middlemen.
          </p>

          <div className="bg-white rounded-full shadow-xl flex items-center w-full max-w-2xl mx-auto overflow-hidden">
            <input
              type="text"
              placeholder="Search by location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 px-5 py-4 text-gray-800 outline-none"
            />

            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 font-semibold"
            >
              {loading ? "..." : "Search"}
            </button>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 border-b">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-600">120+</p>
            <p className="text-gray-500 text-sm">Properties Listed</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-blue-600">50+</p>
            <p className="text-gray-500 text-sm">Active Users</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-blue-600">200+</p>
            <p className="text-gray-500 text-sm">Messages Sent</p>
          </div>

          <div>
            <p className="text-3xl font-bold text-blue-600">100%</p>
            <p className="text-gray-500 text-sm">Direct Deals</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 max-w-7xl mx-auto px-6 py-16 w-full flex-grow">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Featured Properties
            </h2>
            <p className="text-gray-500 text-sm">Handpicked listings for you</p>
          </div>

          <button
            onClick={() => navigate("/properties")}
            className="hidden sm:block text-blue-600 font-medium hover:underline"
          >
            View all →
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-200 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No properties found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10 sm:hidden">
          <button
            onClick={() => navigate("/properties")}
            className="w-full bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-medium"
          >
            View All Properties
          </button>
        </div>
      </section>
    </main>
  );
};

export default HomePage;