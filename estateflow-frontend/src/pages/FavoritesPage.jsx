import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../services/favoriteService";
import PropertyCard from "../components/PropertyCard";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const response = await getFavorites();
      setFavorites(response.data);
    } catch (error) {
      console.error("Failed to load favorites", error);
    }
  };

  const handleRemove = async (favoriteId) => {
    try {
      await removeFavorite(favoriteId);
      setFavorites((prev) => prev.filter((fav) => fav.favoriteId !== favoriteId));
    } catch (error) {
      console.error("Remove failed", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">You have no saved properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div key={fav.favoriteId} className="relative">
              <PropertyCard property={fav} />

              <button
                onClick={() => handleRemove(fav.favoriteId)}
                className="absolute top-3 right-3 bg-white text-red-500 px-3 py-1 rounded-lg shadow hover:bg-red-500 hover:text-white transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;