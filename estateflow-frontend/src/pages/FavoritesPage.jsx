import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../services/favoriteService";

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

      setFavorites(
        favorites.filter((fav) => fav.favoriteId !== favoriteId)
      );

    } catch (error) {

      console.error("Remove failed", error);

    }
  };

  return (
    <div>

      <h1>Favorites</h1>

      {favorites.length === 0 && (
        <p>You have no saved properties yet.</p>
      )}

      {favorites.map((fav) => (

        <div key={fav.favoriteId} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>

          <h3>{fav.title}</h3>

          <p>{fav.location}</p>

          <p>₹ {fav.price}</p>

          <p>{fav.propertyType}</p>

          <button onClick={() => handleRemove(fav.favoriteId)}>
            Remove
          </button>

        </div>

      ))}

    </div>
  );
};

export default FavoritesPage;