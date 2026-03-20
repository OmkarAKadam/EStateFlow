import { useState, useEffect } from "react";

const PropertyForm = ({ initialData = {}, onSubmit, isSubmitting }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    propertyType: "FLAT",
    bedrooms: "",
    bathrooms: "",
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price || "",
        location: initialData.location || "",
        propertyType: initialData.propertyType || "FLAT",
        bedrooms: initialData.bedrooms || "",
        bathrooms: initialData.bathrooms || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" required />

      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full border p-2 rounded" required />

      <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="w-full border p-2 rounded" required />

      <select name="propertyType" value={form.propertyType} onChange={handleChange} className="w-full border p-2 rounded">
        <option value="ROOM">Room</option>
        <option value="FLAT">Flat</option>
        <option value="HOUSE">House</option>
      </select>

      <div className="grid grid-cols-2 gap-4">
        <input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} placeholder="Bedrooms" className="border p-2 rounded" />
        <input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} placeholder="Bathrooms" className="border p-2 rounded" />
      </div>

      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" />

      <button disabled={isSubmitting} className="w-full bg-blue-600 text-white py-2 rounded">
        {isSubmitting ? "Saving..." : "Submit"}
      </button>

    </form>
  );
};

export default PropertyForm;