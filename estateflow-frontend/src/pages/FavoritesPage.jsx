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
  const errorMsg =
    error.response?.data?.message || "Failed to load favorites";
  console.error(errorMsg);
}
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">You have no saved properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav) => {
            const property = {
              id: fav.propertyId,
              title: fav.title,
              location: fav.location,
              price: fav.price,
              propertyType: fav.propertyType,
              ownerEmail: fav.ownerEmail,
            };

            return (
              <div key={fav.favoriteId} className="relative">
                <PropertyCard
                  property={property}
                  isFavoriteInitial={true}
                  favoriteId={fav.favoriteId}
                  onUnfavorite={() =>
                    setFavorites((prev) =>
                      prev.filter((f) => f.favoriteId !== fav.favoriteId),
                    )
                  }
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
