import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "TENANT"
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    if (error) setError("");
  };

  const validate = () => {
    if (!form.fullName.trim()) return "Full name is required";
    if (!form.email.includes("@")) return "Invalid email address";
    if (form.password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await registerUser(form);

      navigate("/login", {
        state: {
          message: "Account created successfully. Please log in."
        }
      });

    } catch (err) {
      const errorMsg =
  err.response?.data?.message || "Registration failed. Please try again.";

setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-secondary-50 px-4 py-12">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-card w-full max-w-md border border-secondary-100">

        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center w-12 h-12 bg-primary-600 rounded-xl mb-4">
            <span className="text-white text-2xl font-bold">E</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-secondary-900">
            Create an account
          </h1>
          <p className="text-secondary-500 mt-2">
            Join EstateFlow to find or list properties.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-6 border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full border border-secondary-200 rounded-xl p-3"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full border border-secondary-200 rounded-xl p-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full border border-secondary-200 rounded-xl p-3"
          />

          <select
            name="role"
            onChange={handleChange}
            value={form.role}
            className="w-full border border-secondary-200 rounded-xl p-3"
          >
            <option value="TENANT">I am looking for a property</option>
            <option value="OWNER">I want to list properties</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

        </form>

        <p className="text-center text-secondary-600 mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary-600">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;