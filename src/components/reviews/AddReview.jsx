import React, { useState } from "react";
const AddReview = ({ onAddReview }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    rating: 5, // Default rating is 5 stars
    message: "",
  });

  // State to store validation errors
  const [errors, setErrors] = useState({});

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update selected star rating
  const handleRating = (star) => {
    setFormData({
      ...formData,
      rating: star,
    });
  };

  // Validate required fields before submitting
  const validate = () => {
    const newErrors = {};

    // Name is required
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Review message is required
    if (!formData.message.trim()) {
      newErrors.message = "Review message is required";
    }

    // Save validation errors
    setErrors(newErrors);

    // Return true if no validation errors exist
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Stop submission if validation fails
    if (!validate()) return;

    const newReview = {
      id: Date.now(),
      name: formData.name,
      role: formData.role || "Patient",
      rating: formData.rating,
      message: formData.message,
     };

    onAddReview(newReview);
      alert("Review submitted successfully!");

    // Reset form after successful submission
    setFormData({
      name: "",
      role: "",
      rating: 5,
      message: "",
    });

    // Clear validation errors
    setErrors({});
  };

   return (
    // Review Form Container
    <div className="bg-card rounded-2xl shadow-md p-7">
      {/* Section Heading */}
      <h3 className="text-heading text-xl font-semibold mb-5">
        Share Your Experience
      </h3>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Name Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-heading">
            Your Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary-green"
          />

          {/* Name Validation Error */}
          {errors.name && (
            <span className="text-error text-xs">
              {errors.name}
            </span>
          )}
        </div>

        {/* Role Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-heading">
            Role / Designation
          </label>

          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g. Patient, Family Member"
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary-green"
          />
        </div>

        {/* Rating Section */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-heading">
            Rating
          </label>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRating(star)}
                className={`text-2xl cursor-pointer ${
                  star <= formData.rating
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Review Message Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-heading">
            Your Review
          </label>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your review here..."
            rows={4}
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary-green"
          />

          {/* Message Validation Error */}
          {errors.message && (
            <span className="text-error text-xs">
              {errors.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="self-start bg-primary-green text-white text-sm font-semibold px-7 py-3 rounded-lg hover:bg-[#1B5E20] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-green focus-visible:outline-offset-2"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};
export default AddReview;