import { useState } from "react";
import { createProperty } from "../services/propertyService";
import { uploadPropertyImage } from "../services/imageService";
import { useNavigate } from "react-router-dom";
import PropertyForm from "../components/PropertyForm";

const CreatePropertyPage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await createProperty(data);

      if (image) {
        await uploadPropertyImage(res.data.id, image);
      }

      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Create Property</h1>

      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <PropertyForm onSubmit={handleSubmit} isSubmitting={loading} />
    </div>
  );
};

export default CreatePropertyPage;