import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-extrabold mb-2">
          Privacy Policy
        </h1>
        <p className="opacity-90 text-sm">
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
            EstateFlow is committed to protecting your privacy. This Privacy
            Policy explains how we collect, use, and safeguard your personal
            information when you use our platform.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Information We Collect
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Name and email address during registration</li>
            <li>Property-related data you create or interact with</li>
            <li>Usage data such as activity within the platform</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To manage your account and authentication</li>
            <li>To improve platform features and performance</li>
            <li>To enable communication between users</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Data Protection
          </h2>
          <p>
            We implement industry-standard security measures to protect your
            data. However, no digital system is completely secure, and we cannot
            guarantee absolute protection.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Third-Party Services
          </h2>
          <p>
            EstateFlow may use third-party services for authentication,
            analytics, or hosting. These services may have access to limited
            user data necessary for their operation.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be reflected on this page with an updated date.
          </p>
        </div>

      </section>
    </div>
  );
};

export default PrivacyPolicyPage;