import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPropertyById, updateProperty } from "../services/propertyService";

const EditPropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    description: ""
  });

  useEffect(() => {
    loadProperty();
  }, []);

  const loadProperty = async () => {
    try {
      const res = await getPropertyById(id);
      setForm(res.data);
    } catch (err) {
      console.error("Failed to load property");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProperty(id, form);
      alert("Property updated");
      navigate(`/properties/${id}`);
    } catch (err) {
      console.error("Update failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Property</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" />

        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full border p-2 rounded" />

        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full border p-2 rounded" />

        <input name="propertyType" value={form.propertyType} onChange={handleChange} placeholder="Type" className="w-full border p-2 rounded" />

        <input name="bedrooms" value={form.bedrooms} onChange={handleChange} placeholder="Bedrooms" className="w-full border p-2 rounded" />

        <input name="bathrooms" value={form.bathrooms} onChange={handleChange} placeholder="Bathrooms" className="w-full border p-2 rounded" />

        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" />

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Update Property
        </button>

      </form>
    </div>
  );
};

export default EditPropertyPage;