import React, { useState} from 'react';
import AddReview from '../components/reviews/AddReview';
import ReviewList from '../components/reviews/ReviewList';

const defaultReviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Patient',
    rating: 5,
    message:
      'Hoku Health Care team is genuinely caring and professional. They made home healthcare stress-free for my family.'
  },
  {
    id: 2,
    name: 'Michael Lee',
    role: 'Family Member',
    rating: 3,
    message:
      'Reliable, punctual, and compassionate staff. My father looks forward to every visit from his caregiver.'
  }
];

const ReviewPage = () => {
  const [reviews, setReviews] = useState(defaultReviews);

  const handleAddReview =  (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  return (
    <section className="bg-dashboard-bg py-16 px-5">
      <div className="text-center mb-10">
        <span className="text-primary-green font-semibold tracking-widest text-xs uppercase">
          HOKU
        </span>
        <h2 className="text-heading text-3xl font-bold mt-1">Client Reviews</h2>
      </div>

      <div className="max-w-xl mx-auto flex flex-col gap-9">
        <ReviewList reviews={reviews} autoplay interval={5000} />

        <AddReview onAddReview={handleAddReview} />
      </div>
    </section>
  );
};

export default ReviewPage;