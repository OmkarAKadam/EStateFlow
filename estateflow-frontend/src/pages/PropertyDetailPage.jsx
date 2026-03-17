import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../services/propertyService";
import { getImagesByProperty } from "../services/imageService";
import { addFavorite } from "../services/favoriteService";
import { sendMessage } from "../services/messageService";
import { useNavigate } from "react-router-dom";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProperty();
    loadImages();
  }, [id]);

  const handleFavorite = async () => {
    try {
      await addFavorite(property.id);
      alert("Added to favorites");
    } catch (error) {
      console.error("Favorite failed", error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const res = await sendMessage({
        propertyId: property.id,
        receiverId: property.ownerId,
        content: message,
      });

      setMessage("");

      navigate("/messages", {
        state: {
          userId: property.ownerId,
          email: property.ownerEmail,
          propertyId: property.id,
          initialMessage: res.data,
        },
      });
    } catch (error) {
      console.error("Message failed", error);
    }
  };

  const loadProperty = async () => {
    const response = await getPropertyById(id);
    setProperty(response.data);
  };

  const loadImages = async () => {
    const response = await getImagesByProperty(id);
    setImages(response.data);
  };

  if (!property)
    return (
      <div className="p-10 text-center text-gray-500">Loading property...</div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {images.length === 0 && (
            <div className="w-full h-72 bg-gray-100 flex items-center justify-center text-gray-500 rounded-lg">
              No Images
            </div>
          )}

          {images.map((img) => (
            <img
              key={img.id}
              src={`http://localhost:8080${img.imageUrl}`}
              className="w-full h-72 object-cover rounded-lg"
            />
          ))}
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>

          <p className="text-gray-500">{property.location}</p>

          <div className="flex gap-6 text-gray-600">
            <span>{property.propertyType}</span>
            <span>{property.bedrooms} Beds</span>
            <span>{property.bathrooms} Baths</span>
          </div>

          <p className="text-3xl font-bold text-emerald-600">
            ₹{property.price}
          </p>

          <button
            onClick={handleFavorite}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ❤️ Add to Favorites
          </button>

          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-semibold mb-2 text-gray-800">Contact Owner</h3>

            <textarea
              className="w-full border rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          Description
        </h3>

        <p className="text-gray-600">{property.description}</p>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
