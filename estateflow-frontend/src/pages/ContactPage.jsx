import React, { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white">

      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Contact Us
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Have questions, feedback, or need help? We’re here to assist you.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Get in touch
          </h2>

          <p className="text-gray-600">
            Whether you're a property owner or a user looking for a place,
            our team is ready to help you with any queries.
          </p>

          <div className="space-y-4 text-gray-700">
            <p><strong>Email:</strong> support@estateflow.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Location:</strong> India</p>
          </div>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-8">
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold text-green-600">
                Message Sent!
              </h3>
              <p className="text-gray-600">
                We’ll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />

              <textarea
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Send Message
              </button>

            </form>
          )}
        </div>

      </section>
    </div>
  );
};

export default ContactPage;