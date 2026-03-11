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
      bathrooms: form.bathrooms ? Number(form.bathrooms) : null
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
    <div>

      <h1>Create Property</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <select
          name="propertyType"
          onChange={handleChange}
        >
          <option value="ROOM">ROOM</option>
          <option value="FLAT">FLAT</option>
          <option value="HOUSE">HOUSE</option>
        </select>

        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          onChange={handleChange}
        />

        <input
          type="number"
          name="bathrooms"
          placeholder="Bathrooms"
          onChange={handleChange}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Create</button>

      </form>

    </div>
  );
};

export default CreatePropertyPage;