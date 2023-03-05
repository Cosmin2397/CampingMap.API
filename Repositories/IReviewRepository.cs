using CampingMap.API.Models;

namespace CampingMap.API.Repositories
{
    public interface IReviewRepository
    {
        Task<IEnumerable<Review>> GetReviews();

        Task<IEnumerable<Review>> GetUserReviews(string id);

        Task<IEnumerable<Review>> GetCampingReviews(Guid id);

        Task<Review> GetReviewById(Guid id);

        Task<Review> AddReview(Review review);

        Task<Review> UpdateReview(Guid id, Review review);

        Task<Review> DeleteReview(Guid id);
    }
}
