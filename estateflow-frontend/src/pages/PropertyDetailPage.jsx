import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPropertyById,
  deleteProperty,
  searchByLocation,
} from "../services/propertyService";
import { getPropertyImages } from "../services/imageService";
import { addFavorite } from "../services/favoriteService";
import PropertyCard from "../components/PropertyCard";
import { sendMessage } from "../services/messageService";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [similarProperties, setSimilarProperties] = useState([]);

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

      const prop = propRes.data;

      setProperty(prop);
      setImages(imgRes.data || []);

      const similarRes = await searchByLocation(prop.location);

      const filtered = similarRes.data
        .filter((p) => p.id !== prop.id)
        .slice(0, 3);

      setSimilarProperties(filtered);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load property";
      toast.error(errorMsg);
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
      toast.success("Added to favorites");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed";
      toast.error(errorMsg);
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

      toast.success("Message sent");

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
      const errorMsg = err.response?.data?.message || "Failed to send";
      toast.error(errorMsg);
    } finally {
      setIsSending(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this property?")) return;

    try {
      await deleteProperty(property.id);
      toast.success("Property deleted");
      navigate("/my-properties");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Delete failed";
      toast.error(errorMsg);
    }
  };

  const BASE = import.meta.env.VITE_API_URL.replace("/api", "");

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded" />
        <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-lg" />
          ))}
        </div>
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
        <h1 className="text-3xl font-bold text-gray-900">
          {property.title}
        </h1>
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
                className="w-full h-80 object-cover rounded-xl shadow-md"
              />
            );
          })
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
            <p className="text-gray-400">
              Posted on{" "}
              {new Date(property.createdAt).toLocaleDateString()}
            </p>
            <span>{property.propertyType}</span>
            <span>{property.bedrooms} Beds</span>
            <span>{property.bathrooms} Baths</span>
          </div>

          <p className="text-3xl font-bold text-blue-600">
            ₹{property.price}
          </p>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-gray-600">
              {property.description || "No description"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border rounded-xl p-4 bg-gray-50">
            <h3 className="font-semibold text-gray-800">Owner Info</h3>
            <p className="text-sm text-gray-600 mt-1">
              {property.ownerEmail}
            </p>
          </div>

          <button
            onClick={handleFavorite}
            disabled={!isLoggedIn}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            Add to Favorites
          </button>

          {!isLoggedIn ? (
            <div className="border rounded-lg p-4 text-center space-y-3">
              <p className="text-gray-500 text-sm">
                Please login to interact
              </p>

              <button
                onClick={() => navigate("/login")}
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                Login
              </button>
            </div>
          ) : isOwner ? (
            <div className="flex gap-3">
              <button
                onClick={() =>
                  navigate(`/edit-property/${property.id}`)
                }
                className="flex-1 bg-yellow-500 text-white py-2 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg"
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

      {similarProperties.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-4">
            Similar Properties
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default PropertyDetailPage;