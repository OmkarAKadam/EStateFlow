import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPropertyById, deleteProperty } from "../services/propertyService";
import { getPropertyImages } from "../services/imageService";
import { addFavorite } from "../services/favoriteService";
import { sendMessage } from "../services/messageService";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const { user } = useContext(AuthContext);

  const isLoggedIn = !!user;

  const isOwner =
    property &&
    (Number(user?.id) === Number(property.ownerId) ||
      user?.sub === property.ownerEmail);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [propRes, imgRes] = await Promise.all([
        getPropertyById(id),
        getPropertyImages(id),
      ]);
      setProperty(propRes.data);
      setImages(imgRes.data || []);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load property";
      console.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      await addFavorite(property.id);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to add favorite";
      console.error(errorMsg);
    }
  };

  const handleSendMessage = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (!message.trim()) return;

    setIsSending(true);

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
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to send message";
      console.error(errorMsg);
    } finally {
      setIsSending(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this property?")) return;

    try {
      await deleteProperty(property.id);
      navigate("/my-properties");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Delete failed";
      console.error(errorMsg);
    }
  };

  const BASE = import.meta.env.VITE_API_URL.replace("/api", "");

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Property not found
        </h2>
        <button
          onClick={() => navigate("/properties")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Browse properties
        </button>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
        <p className="text-gray-500 mt-1">{property.location}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.length === 0 ? (
          <div className="h-80 bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg">
            No Images
          </div>
        ) : (
          images.map((img) => {
            const imageUrl = img.imageUrl.startsWith("http")
              ? img.imageUrl
              : `${BASE}${img.imageUrl}`;

            return (
              <img
                key={img.id}
                src={imageUrl}
                alt="property"
                className="w-full h-80 object-cover rounded-lg"
              />
            );
          })
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-4 text-gray-600">
            <span>{property.propertyType}</span>
            <span>{property.bedrooms} Beds</span>
            <span>{property.bathrooms} Baths</span>
          </div>

          <p className="text-2xl font-bold text-blue-600">₹{property.price}</p>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-gray-600">
              {property.description || "No description"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleFavorite}
            disabled={!isLoggedIn}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Add to Favorites
          </button>

          {!isLoggedIn ? (
            <div className="border rounded-lg p-4 text-center space-y-3">
              <p className="text-gray-500 text-sm">
                Please login to interact with this property
              </p>

              <button
                onClick={() => navigate("/login")}
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                Login to Continue
              </button>
            </div>
          ) : isOwner ? (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => navigate(`/edit-property/${property.id}`)}
                className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Edit Property
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          ) : (
            <div className="border rounded-lg p-4 space-y-3">
              <textarea
                placeholder="Write a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border rounded-lg p-2"
              />

              <button
                onClick={handleSendMessage}
                disabled={!message.trim() || isSending}
                className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default PropertyDetailPage;
