import { useState, useContext } from "react";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const validate = () => {
    if (!form.email.includes("@")) return "Enter a valid email";
    if (!form.password) return "Password is required";
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
      const response = await loginUser(form);

      const token = response?.data?.token;

      if (!token) {
        throw new Error("Invalid server response");
      }

      login(token);
      navigate("/");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed. Try again."
      );
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
            Welcome back
          </h1>
          <p className="text-secondary-500 mt-2">
            Please enter your details to sign in.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-6 border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

        </form>

        <p className="text-center text-secondary-600 mt-6 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-primary-600">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;