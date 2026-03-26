import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPropertyImages } from "../services/imageService";
import { addFavorite, removeFavorite } from "../services/favoriteService";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const PropertyCard = ({
  property,
  isOwner = false,
  onDelete,
  isFavoriteInitial = false,
  favoriteId,
  onUnfavorite,
}) => {
  const [images, setImages] = useState([]);
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await getPropertyImages(property.id);
        setImages(response.data || []);
      } catch {}
    };

    if (property?.id) loadImages();
  }, [property?.id]);

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isFavorite) {
        await removeFavorite(favoriteId);
        setIsFavorite(false);
        toast.success("Removed from favorites");
        if (onUnfavorite) onUnfavorite();
      } else {
        await addFavorite(property.id);
        setIsFavorite(true);
        toast.success("Added to favorites");
      }
    } catch {
      toast.error("Action failed");
    }
  };

  const BASE = import.meta.env.VITE_API_URL.replace("/api", "");

  const imageUrl =
    images.length > 0
      ? images[0].imageUrl.startsWith("http")
        ? images[0].imageUrl
        : `${BASE}${images[0].imageUrl}`
      : null;

  return (
    <article className="group relative flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-2xl transition duration-300 overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <Link to={`/properties/${property.id}`} className="block w-full h-full">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={property.title}
              loading="lazy"
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}
        </Link>

        {isAuthenticated && (
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-lg"
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
        )}

        <div className="absolute top-3 left-3 px-3 py-1 bg-white rounded-full text-xs font-semibold text-blue-600 shadow">
          {property.propertyType}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/properties/${property.id}`}>
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-1 mb-1 group-hover:text-blue-600">
            {property.title}
          </h2>
        </Link>

        <p className="text-sm text-gray-500 line-clamp-1 mb-3">
          📍 {property.location}
        </p>

        <div className="flex gap-2 mb-4 text-xs">
          <span className="bg-gray-100 px-2 py-1 rounded">
            {property.bedrooms} Beds
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded">
            {property.bathrooms} Baths
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 border-t">
          <p className="text-blue-600 font-bold text-lg">
            ₹{property.price?.toLocaleString()}
          </p>

          {isOwner ? (
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = `/edit-property/${property.id}`;
                }}
                className="text-xs bg-yellow-500 text-white px-3 py-1.5 rounded"
              >
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(property.id);
                }}
                className="text-xs bg-red-100 text-red-600 px-3 py-1.5 rounded"
              >
                Delete
              </button>
            </div>
          ) : (
            <Link
              to={`/properties/${property.id}`}
              className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded"
            >
              View
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;