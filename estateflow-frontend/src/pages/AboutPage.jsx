import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">About EstateFlow</h1>

      <p className="mb-4 text-gray-700">
        EstateFlow is a modern property listing platform designed to simplify
        the process of buying, selling, and renting properties. It allows users
        to explore listings, save favorites, and directly connect with property
        owners.
      </p>

      <p className="mb-4 text-gray-700">
        The platform provides a seamless experience with features such as
        advanced search, real-time messaging, and role-based access for property
        owners and tenants.
      </p>

      <p className="text-gray-700">
        Our goal is to create a user-friendly and efficient marketplace where
        property discovery and communication happen in one place.
      </p>
    </div>
  );
};

export default AboutPage;