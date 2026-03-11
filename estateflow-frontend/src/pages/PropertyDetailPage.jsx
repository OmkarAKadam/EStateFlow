import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById } from "../services/propertyService";
import { getImagesByProperty } from "../services/imageService";

const PropertyDetailPage = () => {

  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadProperty();
    loadImages();
  }, [id]);

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

    </div>
  );
};

export default PropertyDetailPage;