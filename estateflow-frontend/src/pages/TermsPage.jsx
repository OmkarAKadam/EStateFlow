import React from "react";

const TermsPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Terms & Conditions
      </h1>

      <p className="mb-4 text-gray-700">
        By using EstateFlow, you agree to the following terms and conditions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        User Responsibilities
      </h2>
      <p className="text-gray-700">
        Users are responsible for providing accurate information and using the
        platform ethically.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Property Listings
      </h2>
      <p className="text-gray-700">
        Property owners are responsible for the accuracy of their listings.
        EstateFlow does not guarantee listing validity.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Limitation of Liability
      </h2>
      <p className="text-gray-700">
        EstateFlow is not liable for any damages resulting from platform use.
      </p>
    </div>
  );
};

export default TermsPage;