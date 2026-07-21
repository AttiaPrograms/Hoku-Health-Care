import React, { useState, useEffect, useCallback } from 'react';

const ReviewList = ({ reviews = [], autoPlay = true, interval = 5000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = reviews.length;

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToSlide = (index) => setActiveIndex(index);

  useEffect(() => {
    if (activeIndex >= total && total > 0) setActiveIndex(0);
  }, [total, activeIndex]);

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, goToNext, total]);

  if (total === 0) {
    return (
      <p className="text-center text-muted-text text-sm">
        No reviews yet. Be the first to share your experience!
      </p>
    );
  }

  const current = reviews[activeIndex];

  return (
    <div className="relative">
      {/* Card */}
      <div className="relative bg-card rounded-2xl shadow-md p-8 md:p-10 overflow-hidden">
        {/* Big background quote mark */}
        <span className="absolute -top-2 left-8 text-gray-100 text-[110px] font-serif leading-none select-none pointer-events-none">
          &ldquo;
        </span>
        <span className="absolute -bottom-14 right-8 text-gray-100 text-[110px] font-serif leading-none select-none pointer-events-none">
          &rdquo;
        </span>

        <div
          key={current.id}
          className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10"
        >
          {/* Avatar */}
          <div className="shrink-0">
            <div className="w-28 h-28 rounded-full border-4 border-secondary-blue overflow-hidden bg-gray-100 flex items-center justify-center">
              {current.avatar ? (
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-semibold text-secondary-blue">
                  {current.name?.charAt(0)}
                </span>
              )}
            </div>
          </div>

          {/* Text */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600 leading-relaxed">
              {current.message}
            </p>

            <div className="mt-4 flex items-center justify-center md:justify-start gap-3">
              <div>
                <h4 className="text-heading font-semibold">{current.name}</h4>
                <span className="text-muted-text text-xs">{current.role}</span>
              </div>
            </div>

            <div className="mt-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-base ${
                    i < current.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dots pagination */}
      {total > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to review ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex
                  ? 'w-2.5 bg-secondary-blue'
                  : 'w-2.5 bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;