import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPropertyImages } from "../services/imageService";
import { addFavorite, removeFavorite } from "../services/favoriteService";
import useAuth from "../hooks/useAuth";

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
      } catch {
        console.error("Failed to load images");
      }
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
        if (onUnfavorite) onUnfavorite();
      } else {
        await addFavorite(property.id);
        setIsFavorite(true);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setIsFavorite(true);
      }
    }
  };

  const imageUrl =
    images.length > 0
      ? images[0].imageUrl.startsWith("http")
        ? images[0].imageUrl
        : `${import.meta.env.VITE_API_URL}${images[0].imageUrl}`
      : null;

  return (
    <article className="group relative flex flex-col bg-white rounded-3xl border border-gray-200/70 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <Link to={`/properties/${property.id}`} className="block w-full h-full">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={property.title}
              loading="lazy"
              // onError={(e) => {
              //   e.target.src = "../assets/fallback.jpg"
              // }}
              className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-medium">
              No Image Available
            </div>
          )}
        </Link>

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

        {isAuthenticated && (
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-2.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-md shadow-md transition flex items-center justify-center text-lg z-10"
          >
            {isFavorite ? (
              <span className="text-red-500 scale-110">❤️</span>
            ) : (
              <span className="text-gray-400 hover:text-red-500 transition">
                🤍
              </span>
            )}
          </button>
        )}

        <div className="absolute top-3 left-3 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-blue-700 shadow-sm">
          {property.propertyType}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/properties/${property.id}`} className="block mb-2">
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition">
            {property.title}
          </h2>
        </Link>

        <p className="text-sm text-gray-500 line-clamp-1 mb-4 flex items-center gap-1">
          <span>📍</span>
          {property.location}
        </p>

        <div className="flex items-center gap-2 mb-5 text-xs font-medium">
          <span className="bg-gray-100 px-3 py-1.5 rounded-full text-gray-700">
            {property.bedrooms} Beds
          </span>
          <span className="bg-gray-100 px-3 py-1.5 rounded-full text-gray-700">
            {property.bathrooms} Baths
          </span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400">Price</span>
            <p className="text-blue-600 font-bold text-xl tracking-tight">
              ₹{property.price?.toLocaleString() || property.price}
            </p>
          </div>

          {isOwner ? (
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = `/edit-property/${property.id}`;
                }}
                className="text-sm bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition font-medium"
              >
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(property.id);
                }}
                className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition font-medium"
              >
                Delete
              </button>
            </div>
          ) : (
            <Link
              to={`/properties/${property.id}`}
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition font-medium shadow-sm"
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
