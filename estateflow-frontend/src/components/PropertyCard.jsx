import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getImagesByProperty } from "../services/imageService";

const PropertyCard = ({ property }) => {
  const [images, setImages] = useState([]);

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
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

      {imageUrl ? (
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-500">
          No Image
        </div>
      )}

      <div className="p-4 space-y-2">

        <h3 className="text-lg font-semibold text-gray-800">
          {property.title}
        </h3>

        <p className="text-sm text-gray-500">
          {property.location}
        </p>

        <div className="text-sm text-gray-600 flex gap-4">
          <span>{property.propertyType}</span>
          <span>{property.bedrooms} Beds</span>
          <span>{property.bathrooms} Baths</span>
        </div>

        <p className="text-emerald-600 font-bold text-lg">
          ₹{property.price}
        </p>

        <Link
          to={`/properties/${property.id}`}
          className="block text-center mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default PropertyCard;