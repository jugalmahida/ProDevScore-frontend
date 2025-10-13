// components/ContactSection.jsx

"use client";
import React, { useState } from "react";

const ContactSection = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    // Replace with actual API call or EmailJS integration
    setTimeout(() => {
      setLoading(false);
      setSuccess("Message sent! Thank you for contacting us.");
    }, 1000);
  };

  return (
    <section className="w-full max-w-md mx-auto px-4 py-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-900">
        Contact Us
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="p-3 rounded border border-gray-300 outline-none focus:border-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          className="p-3 rounded border border-gray-300 outline-none focus:border-blue-500"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          rows={5}
          className="p-3 rounded border border-gray-300 outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white font-semibold py-3 rounded transition hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
        {success && (
          <span className="text-green-600 text-center">{success}</span>
        )}
      </form>
    </section>
  );
};

export default ContactSection;
