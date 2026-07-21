import React, { useState, useEffect } from 'react';
import AddReview from '../components/reviews/AddReview';
import ReviewList from '../components/reviews/ReviewList';

// TODO: replace with your actual backend endpoint
const API_BASE_URL = '/api/reviews';

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
    rating: 5,
    message:
      'Reliable, punctual, and compassionate staff. My father looks forward to every visit from his caregiver.'
  }
];

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE_URL);
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setReviews(data.length ? data : defaultReviews);
    } catch (err) {
      console.error('Failed to fetch reviews, using defaults:', err);
      setReviews(defaultReviews);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (newReview) => {
    setReviews((prev) => [newReview, ...prev]);

    try {
      await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
    } catch (err) {
      console.error('Failed to save review to server:', err);
    }
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
        {loading ? (
          <p className="text-center text-muted-text text-sm">Loading reviews...</p>
        ) : (
          <ReviewList reviews={reviews} autoPlay interval={5000} />
        )}

        <AddReview onAddReview={handleAddReview} />
      </div>
    </section>
  );
};

export default ReviewPage;