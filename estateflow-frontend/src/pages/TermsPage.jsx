import React from "react";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-extrabold mb-2">
          Terms & Conditions
        </h1>
        <p className="text-sm opacity-90">
          Last updated: March 2026
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 py-12 space-y-10 text-gray-700 leading-relaxed">

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Introduction
          </h2>
          <p>
            By accessing or using EstateFlow, you agree to be bound by these
            Terms and Conditions. If you do not agree, you must not use the platform.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            User Responsibilities
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide accurate and truthful information</li>
            <li>Maintain the security of your account</li>
            <li>Use the platform in a lawful and ethical manner</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Property Listings
          </h2>
          <p>
            Property owners are solely responsible for the accuracy and
            authenticity of their listings. EstateFlow does not verify or
            guarantee the validity of any property information.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Prohibited Activities
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Posting false or misleading property information</li>
            <li>Attempting unauthorized access to the system</li>
            <li>Using the platform for illegal activities</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Limitation of Liability
          </h2>
          <p>
            EstateFlow shall not be held liable for any direct, indirect, or
            incidental damages resulting from the use of the platform.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these Terms at any time. Continued
            use of the platform after changes indicates acceptance of the
            updated Terms.
          </p>
        </div>

      </section>
    </div>
  );
};

export default TermsPage;