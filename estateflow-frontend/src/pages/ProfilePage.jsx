import { useEffect, useState } from "react";
import axios from "../api/axios";
import Loader from "../components/Loader";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get("/users/me");
      setUser(res.data);
      setForm({
        fullName: res.data.fullName || "",
        password: "",
      });
    } catch (err) {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    setSaving(true);
    setMessage("");
    setError("");

    try {
      await axios.put("/users/me", form);

      setMessage("Profile updated successfully");
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      setError(
        err.response?.data?.message || "Update failed. Try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10 min-h-screen">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Profile
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your account information
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white border rounded-2xl shadow-sm p-8 space-y-6">

        {message && (
          <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm text-center border border-green-100">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL (READ ONLY) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              value={user?.email || ""}
              disabled
              className="w-full border border-gray-200 rounded-xl p-3 bg-gray-100 text-gray-500"
            />
          </div>

          {/* FULL NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
              className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-70"
          >
            {saving ? "Updating..." : "Update Profile"}
          </button>

        </form>
      </div>
    </main>
  );
};

export default ProfilePage;