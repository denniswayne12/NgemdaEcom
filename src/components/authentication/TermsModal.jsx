import React from "react";

export default function TermsModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              Terms & Conditions
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4 text-gray-700">
            <p>
              Welcome to our e-commerce platform. By accessing or using our
              services, you agree to be bound by these terms:
            </p>

            <div>
              <h4 className="font-semibold text-gray-900">
                1. Account Registration
              </h4>
              <p>
                You must provide accurate information when creating an account
                and keep it updated.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">
                2. Product Information
              </h4>
              <p>
                We strive to display accurate product information, but we do not
                warrant that product descriptions are accurate, complete,
                reliable, current, or error-free.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">
                3. Pricing and Payment
              </h4>
              <p>
                All prices are in USD and subject to change without notice. We
                reserve the right to refuse any order.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">
                4. Shipping and Delivery
              </h4>
              <p>
                Delivery times are estimates only and not guaranteed. We are not
                responsible for delays caused by shipping carriers.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">
                5. Returns and Refunds
              </h4>
              <p>
                Items may be returned within 30 days of delivery for a full
                refund, provided they are in original condition.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">
                6. Limitation of Liability
              </h4>
              <p>
                We shall not be liable for any indirect, incidental, special,
                consequential or punitive damages.
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
