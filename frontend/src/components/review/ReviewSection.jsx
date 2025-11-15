import React, { useState } from 'react';
import RatingStars from './RatingStars';
import Button from '../ui/Button';

const ReviewSection = ({ productId, reviews = [], onAddReview }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  // Rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, percentage };
  });

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortBy === 'highest') {
      return b.rating - a.rating;
    } else if (sortBy === 'lowest') {
      return a.rating - b.rating;
    }
    return 0;
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (rating === 0 || !reviewText.trim()) return;

    const newReview = {
      product_id: productId,
      rating,
      review_text: reviewText,
      created_at: new Date().toISOString(),
    };

    onAddReview && onAddReview(newReview);
    setRating(0);
    setReviewText('');
    setShowReviewForm(false);
  };

  return (
    <div className="space-y-6" data-testid="review-section">
      {/* Review Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Customer Reviews</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 dark:text-white" data-testid="average-rating">
              {averageRating.toFixed(1)}
            </div>
            <RatingStars rating={averageRating} size="lg" className="justify-center my-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Based on {reviews.length} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingCounts.map(({ star, count, percentage }) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{star} ★</span>
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review Button */}
        {!showReviewForm && (
          <Button
            variant="outline"
            className="mt-6 w-full md:w-auto"
            onClick={() => setShowReviewForm(true)}
            data-testid="write-review-button"
          >
            Write a Review
          </Button>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" data-testid="review-form">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Write Your Review</h4>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Rating
              </label>
              <RatingStars
                rating={rating}
                onRatingChange={setRating}
                editable
                size="lg"
                data-testid="review-rating-input"
              />
            </div>

            <div>
              <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Review
              </label>
              <textarea
                id="review-text"
                rows="4"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with this product..."
                className="input"
                data-testid="review-text-input"
              ></textarea>
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                variant="primary"
                disabled={rating === 0 || !reviewText.trim()}
                data-testid="submit-review-button"
              >
                Submit Review
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setShowReviewForm(false);
                  setRating(0);
                  setReviewText('');
                }}
                data-testid="cancel-review-button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">All Reviews</h4>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input text-sm w-auto"
              data-testid="sort-reviews-select"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>

          <div className="space-y-4">
            {sortedReviews.map((review, index) => (
              <div
                key={review.id || index}
                className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
                data-testid={`review-item-${index}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {review.user_name || 'Anonymous'}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <RatingStars rating={review.rating} size="sm" className="mt-1" />
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{review.review_text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
