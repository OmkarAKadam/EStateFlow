import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">

      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          About EstateFlow
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          A modern platform built to simplify property discovery, communication,
          and ownership management in one seamless experience.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What is EstateFlow?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              EstateFlow is a full-stack property platform that allows users to
              explore listings, connect with owners, and manage properties with
              ease. It combines search, communication, and personalization into
              one unified system.
            </p>
          </div>

          <div className="bg-gray-100 rounded-xl p-6 text-gray-700">
            <ul className="space-y-2 text-sm">
              <li>✔ Property discovery</li>
              <li>✔ Real-time messaging</li>
              <li>✔ Favorites system</li>
              <li>✔ Secure access control</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Key Features
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Advanced Property Search",
              "Real-time Messaging System",
              "Favorites & Personalization",
              "Role-based Access (Owner/User)",
              "Property Management Dashboard",
              "Modern UI/UX Experience",
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 border rounded-xl hover:shadow-md transition"
              >
                <p className="font-semibold text-gray-800">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-10 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            To create a seamless and efficient digital marketplace where users
            can discover, connect, and manage properties without friction —
            combining technology, simplicity, and user-centric design.
          </p>
        </div>

      </section>
    </div>
  );
};

export default AboutPage;