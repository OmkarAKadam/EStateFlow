import { useState } from "react";
import { createProperty } from "../services/propertyService";
import { uploadPropertyImage } from "../services/imageService";
import { useNavigate } from "react-router-dom";
import PropertyForm from "../components/PropertyForm";

const CreatePropertyPage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await createProperty(data);

      for (let file of images) {
        const formData = new FormData();
        formData.append("file", file);
        await uploadPropertyImage(res.data.id, formData);
      }

      navigate("/");
    } catch (err) {
  const errorMsg =
    err.response?.data?.message || "Failed to create property";
  alert(errorMsg);
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Create Property</h1>

      <input
        type="file"
        multiple
        onChange={(e) => setImages([...e.target.files])}
        className="w-full"
      />

      <PropertyForm onSubmit={handleSubmit} isSubmitting={loading} />
    </div>
  );
};

export default CreatePropertyPage;