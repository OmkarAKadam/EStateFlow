import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4 text-gray-700">
        EstateFlow values your privacy. This policy explains how we collect,
        use, and protect your personal information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Information We Collect
      </h2>
      <p className="text-gray-700">
        We collect user information such as name, email, and activity within
        the platform to provide and improve our services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        How We Use Information
      </h2>
      <p className="text-gray-700">
        Your data is used to manage your account, improve platform features,
        and enable communication between users.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Data Protection
      </h2>
      <p className="text-gray-700">
        We implement security measures to protect your data. However, no system
        is completely secure.
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;