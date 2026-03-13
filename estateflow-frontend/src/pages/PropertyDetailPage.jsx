import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../services/propertyService";
import { getImagesByProperty } from "../services/imageService";
import { addFavorite } from "../services/favoriteService";
import { sendMessage } from "../services/messageService";

const PropertyDetailPage = () => {
  const { id } = useParams();

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
    try {
      await sendMessage({
        propertyId: property.id,
        receiverId: property.ownerId,
        content: message,
      });

      alert("Message sent");
      setMessage("");
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

  if (!property) return <p>Loading...</p>;

  return (
    <div>
      <h1>{property.title}</h1>

      <p>{property.location}</p>
      <p>₹{property.price}</p>

      <h3>Images</h3>

      {images.length === 0 && <p>No images</p>}

      {images.map((img) => (
        <img
          key={img.id}
          src={`http://localhost:8080${img.imageUrl}`}
          width="200"
        />
      ))}

      <p>{property.description}</p>
      <button onClick={handleFavorite}>❤️ Add to Favorites</button>
      <h3>Contact Owner</h3>

      <textarea
        placeholder="Write message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default PropertyDetailPage;
