import { useState } from "react";
import { createProperty } from "../services/propertyService";
import { uploadPropertyImage } from "../services/imageService";
import { useNavigate } from "react-router-dom";

const CreatePropertyPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    propertyType: "FLAT",
    bedrooms: "",
    bathrooms: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
    };

    try {
      const response = await createProperty(payload);

      const propertyId = response.data.id;

      if (image) {
        await uploadPropertyImage(propertyId, image);
      }

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Create Property
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >

        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="propertyType"
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        >
          <option value="ROOM">ROOM</option>
          <option value="FLAT">FLAT</option>
          <option value="HOUSE">HOUSE</option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="bedrooms"
            placeholder="Bedrooms"
            onChange={handleChange}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            name="bathrooms"
            placeholder="Bathrooms"
            onChange={handleChange}
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border rounded-lg p-2"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Property
        </button>

      </form>
    </div>
  );
};

export default CreatePropertyPage;