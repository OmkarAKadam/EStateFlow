import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPropertyById, updateProperty } from "../services/propertyService";
import {
  uploadPropertyImage,
  getPropertyImages,
  deletePropertyImage,
} from "../services/imageService";
import PropertyForm from "../components/PropertyForm";

const EditPropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProperty();
    loadImages();
  }, []);

  const loadProperty = async () => {
    const res = await getPropertyById(id);
    setProperty(res.data);
  };

  const loadImages = async () => {
    const res = await getPropertyImages(id);
    setImages(res.data);
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await updateProperty(id, data);

      for (let file of newImages) {
        const formData = new FormData();
        formData.append("file", file);
        await uploadPropertyImage(id, formData);
      }

      navigate(`/properties/${id}`);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Update failed";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (imgId) => {
    await deletePropertyImage(imgId);
    loadImages();
  };
  
  const BASE = import.meta.env.VITE_API_URL.replace("/api", "");

  if (!property) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Property</h1>

      <div className="grid grid-cols-2 gap-4">
        {images.map((img) => {
          const imageUrl = img.imageUrl.startsWith("http")
            ? img.imageUrl
            : `${BASE}${img.imageUrl}`;

          return (
            <div key={img.id} className="relative">
              <img
                src={imageUrl}
                className="w-full h-32 object-cover rounded"
                onError={(e) => {
                  e.target.src = "/fallback.jpg";
                }}
              />
              <button
                onClick={() => handleDeleteImage(img.id)}
                className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 text-xs rounded"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>

      <input
        type="file"
        multiple
        onChange={(e) => setNewImages([...e.target.files])}
      />

      <PropertyForm
        initialData={property}
        onSubmit={handleSubmit}
        isSubmitting={loading}
      />
    </div>
  );
};

export default EditPropertyPage;
