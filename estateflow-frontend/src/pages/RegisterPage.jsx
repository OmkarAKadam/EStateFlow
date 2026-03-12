import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "TENANT"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await registerUser(form);

      alert("Registration successful");

      navigate("/login");

    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div>

      <h1>Register</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <select name="role" onChange={handleChange}>
          <option value="TENANT">Tenant</option>
          <option value="OWNER">Owner</option>
        </select>

        <button type="submit">Register</button>

      </form>

    </div>
  );
};

export default RegisterPage;