import React from "react";

export default function Contact() {
  return (
    <div className="mt-12 mb-16 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
        Contact Us
      </h1>
      <p className="text-gray-500 mt-3">
        Have a question about orders, delivery, or products? Send us a message
        and our team will get back to you soon.
      </p>

      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-md bg-white">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium text-gray-800">
              support@grocerypoint.in
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-md bg-white">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-lg font-medium text-gray-800">+91 98765 43210</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-md bg-white">
            <p className="text-sm text-gray-500">Address</p>
            <p className="text-lg font-medium text-gray-800">
              GroceryPoint, Mumbai, India
            </p>
          </div>
        </div>

        <form className="p-5 border border-gray-200 rounded-md bg-white space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#4fbf8b]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#4fbf8b]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Message</label>
            <textarea
              rows={4}
              placeholder="How can we help?"
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-[#4fbf8b] resize-none"
            />
          </div>
          <button
            type="button"
            className="w-full bg-[#4fbf8b] hover:bg-[#44ae7c] text-white py-2.5 rounded-md transition cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
