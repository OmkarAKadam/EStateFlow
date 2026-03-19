import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getImagesByProperty } from "../services/imageService";

const PropertyCard = ({ property, isOwner = false, onDelete }) => {
  const [images, setImages] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadImages();
  }, [property.id]);

  const loadImages = async () => {
    try {
      const response = await getImagesByProperty(property.id);
      setImages(response.data);
    } catch (error) {
      console.error("Failed to load images");
    }
  };

  const imageUrl =
    images.length > 0
      ? `http://localhost:8080${images[0].imageUrl}`
      : null;

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden border border-secondary-100 hover:-translate-y-1">
      
      {/* Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary-100">
        <Link to={`/properties/${property.id}`} className="block w-full h-full">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-secondary-400 font-medium">
               No Image Available
            </div>
          )}
        </Link>
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/70 hover:bg-white backdrop-blur-md shadow-sm transition-all flex items-center justify-center text-lg z-10"
          aria-label="Toggle Favorite"
        >
          {isFavorite ? (
            <span className="text-red-500 drop-shadow-sm leading-none">❤️</span>
          ) : (
            <span className="text-secondary-400 hover:text-red-500 drop-shadow-sm transition-colors opacity-80 leading-none">🤍</span>
          )}
        </button>

        {/* Property Type Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-primary-700 shadow-sm tracking-wide">
          {property.propertyType}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <Link to={`/properties/${property.id}`} className="block truncate">
            <h3 className="text-lg font-bold text-secondary-900 truncate hover:text-primary-600 transition-colors">
              {property.title}
            </h3>
          </Link>
        </div>

        <p className="text-sm text-secondary-500 truncate mb-4 flex items-center gap-1.5">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          {property.location}
        </p>

        <div className="text-sm text-secondary-600 flex items-center gap-3 mb-5 font-medium">
          <div className="flex items-center gap-1.5 bg-secondary-50 px-2 py-1 rounded-md">
             <span className="text-secondary-900 font-semibold">{property.bedrooms}</span> <span className="text-xs">Beds</span>
          </div>
          <div className="flex items-center gap-1.5 bg-secondary-50 px-2 py-1 rounded-md">
            <span className="text-secondary-900 font-semibold">{property.bathrooms}</span> <span className="text-xs">Baths</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-secondary-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-secondary-500 block mb-0.5">Price</span>
            <p className="text-primary-600 font-bold text-xl tracking-tight leading-none">
              ₹{property.price?.toLocaleString() || property.price}
            </p>
          </div>
          
          {isOwner ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                onDelete(property.id);
              }}
              className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors font-medium border border-red-100 shadow-sm"
            >
              Delete
            </button>
          ) : (
            <Link
              to={`/properties/${property.id}`}
              className="text-sm bg-primary-50 text-primary-700 px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors font-medium border border-primary-100 shadow-sm"
            >
              Details
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};

export default PropertyCard;