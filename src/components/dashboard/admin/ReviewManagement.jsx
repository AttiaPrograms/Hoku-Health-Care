import React, { useMemo, useState } from "react";
import { Star, Search, Trash2, Eye, EyeOff, Check, X } from "lucide-react";

// Initial dummy reviews data with status field for moderation
const initialReviews = [
  { id: 1, patient: "Ayesha Khan", doctor: "Dr. Sana Malik", rating: 5, comment: "Extremely attentive and explained everything clearly.", date: "2026-07-10", visible: true, status: "Pending" },
  { id: 2, patient: "Hamza Tariq", doctor: "Dr. Imran Shah", rating: 4, comment: "Good experience overall, wait time was a bit long.", date: "2026-07-08", visible: true, status: "Approved" },
  { id: 3, patient: "Fatima Noor", doctor: "Dr. Bilal Ahmed", rating: 3, comment: "Average service, expected more detailed follow-up.", date: "2026-07-06", visible: true, status: "Pending" },
  { id: 4, patient: "Usman Ali", doctor: "Dr. Bilal Ahmed", rating: 2, comment: "Appointment got delayed by over an hour.", date: "2026-07-04", visible: false, status: "Rejected" },
  { id: 5, patient: "Ayesha Khan", doctor: "Dr. Hina Raza", rating: 5, comment: "Wonderful care, highly recommend this clinic.", date: "2026-07-02", visible: true, status: "Approved" },
];

// Reusable component to render star ratings
function Stars({ value }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= value? "text-amber-400" : "text-slate-200"}
          fill={i <= value? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

// Status badge colors
const statusStyles = {
  Pending: "bg-amber-50 text-amber-600",
  Approved: "bg-emerald-50 text-emerald-600", 
  Rejected: "bg-rose-50 text-rose-600"
};

export default function ReviewManagement() {
  // State to store all reviews
  const [reviews, setReviews] = useState(initialReviews);
  // State for search input
  const [query, setQuery] = useState("");
  // State to filter by minimum rating
  const [minRating, setMinRating] = useState(0);
  // State to filter by status
  const [filterStatus, setFilterStatus] = useState("All");

  // Calculate average rating of all reviews
  const avgRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0
  ).toFixed(1);

  // Calculate how many reviews exist for each star rating
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  // Memoized filtered list based on search query, min rating and status
  const filtered = useMemo(
    () =>
      reviews.filter(
        (r) =>
          // Search in patient name or doctor name
          (r.patient.toLowerCase().includes(query.toLowerCase()) ||
            r.doctor.toLowerCase().includes(query.toLowerCase())) &&
          // Apply minimum rating filter
          r.rating >= minRating &&
          // Apply status filter
          (filterStatus === "All" || r.status === filterStatus)
      ),
    [reviews, query, minRating, filterStatus]
  );

  // Toggle visibility of a review - hide/show from patients
  const toggleVisibility = (id) =>
    setReviews((prev) => prev.map((r) => (r.id === id? {...r, visible:!r.visible } : r)));

  // Update review status: Approve or Reject
  const updateStatus = (id, newStatus) =>
    setReviews((prev) => prev.map((r) => (r.id === id? {...r, status: newStatus } : r)));

  // Delete a review permanently
  const removeReview = (id) => setReviews((prev) => prev.filter((r) => r.id!== id));

  return (
    <div className="p-4 md:p-8">
      {/* Page Header Section */}
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Feedback</span>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Review Management</h1>
        <p className="text-sm text-slate-500">Moderate patient feedback across all doctors</p>
      </div>

      {/* Summary Cards: Average Rating + Distribution Chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* Average Rating Card */}
        <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200 flex flex-col items-center justify-center text-center">
          <p className="text-4xl font-bold text-slate-900">{avgRating}</p>
          <Stars value={Math.round(avgRating)} />
          <p className="text-xs text-slate-500 mt-2">{reviews.length} total reviews</p>
        </div>
        {/* Rating Distribution Card */}
        <div className="md:col-span-2 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <p className="text-sm font-semibold text-slate-700 mb-3">Rating distribution</p>
          <div className="space-y-2">
            {distribution.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-xs text-slate-500 w-10">{star} star</span>
                {/* Progress bar for each rating */}
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-amber-400"
                    style={{ width: `${(count / reviews.length) * 100 || 0}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400 w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
        {/* Search input field */}
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patient or doctor..."
            className="w-full rounded-xl border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Rating filter buttons */}
        <div className="flex gap-2 flex-wrap">
          {[0, 3, 4, 5].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                minRating === r
                 ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
              }`}
            >
              {r === 0? "All" : `${r}+ Stars`}
            </button>
          ))}
        </div>
        {/* Status filter buttons */}
        <div className="flex gap-2 flex-wrap">
          {["All", "Pending", "Approved", "Rejected"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                filterStatus === s
                 ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List Section */}
      <div className="space-y-3">
        {filtered.map((r) => (
          <div
            key={r.id}
            className={`rounded-2xl bg-white p-5 ring-1 ring-slate-200 flex items-start justify-between gap-4 ${
             !r.visible? "opacity-60" : "" // Dim if review is hidden
            }`}
          >
            {/* Review Content */}
            <div className="flex items-start gap-3">
              {/* Patient avatar with initials */}
              <div className="h-9 w-9 shrink-0 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">
                {r.patient.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium text-slate-800">{r.patient}</p>
                  <span className="text-xs text-slate-400">→ {r.doctor}</span>
                  {/* Status Badge */}
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${statusStyles[r.status]}`}>
                    {r.status}
                  </span>
                </div>
                <Stars value={r.rating} />
                <p className="text-sm text-slate-600 mt-1.5 max-w-xl">{r.comment}</p>
                <p className="text-xs text-slate-400 mt-1">{r.date}</p>
              </div>
            </div>
            {/* Action Buttons: Approve/Reject, Hide/Show and Delete */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Show Approve/Reject only for Pending reviews */}
              {r.status === "Pending" && (
                <>
                  <button
                    onClick={() => updateStatus(r.id, "Approved")}
                    title="Approve review"
                    className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => updateStatus(r.id, "Rejected")}
                    title="Reject review"
                    className="p-2 rounded-lg text-rose-600 hover:bg-rose-50"
                  >
                    <X size={16} />
                  </button>
                </>
              )}
              {/* Toggle visibility button */}
              <button
                onClick={() => toggleVisibility(r.id)}
                title={r.visible? "Hide review" : "Show review"}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                {r.visible? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              {/* Delete button */}
              <button
                onClick={() => removeReview(r.id)}
                title="Delete review"
                className="p-2 rounded-lg text-rose-500 hover:bg-rose-50"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {/* Show message if no reviews match filters */}
        {filtered.length === 0 && (
          <div className="rounded-2xl bg-white p-10 text-center text-slate-400 ring-1 ring-slate-200">
            No reviews match your filters.
          </div>
        )}
      </div>
    </div>
  );
}