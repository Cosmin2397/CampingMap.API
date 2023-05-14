using CampingMap.API.Data;
using CampingMap.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CampingMap.API.Repositories
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly AppDbContext _context;

        public ReviewRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Review> AddReview(Review review)
        {
            if (review == null)
            {
                return null;
            }
            else
            {
                review.Id = Guid.NewGuid();                
                await _context.Reviews.AddAsync(review);
                await _context.SaveChangesAsync();
                return review;
            }
        }

        public async Task<Review> DeleteReview(Guid id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return null;
            }

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return review;
        }

        public async Task<IEnumerable<Review>> GetCampingReviews(Guid id)
        {
            var reviews = await _context.Reviews.ToListAsync();
            var campingReviews = reviews.Where(review => review.CampingId == id);

            if (campingReviews == null)
            {
                return new List<Review>();
            }

            return campingReviews;
        }

        public async Task<Review> GetReviewById(Guid id)
        {
            var review = await _context.Reviews.FindAsync(id);

            if (review == null)
            {
                return null;
            }

            return review;
        }

        public async  Task<IEnumerable<Review>> GetReviews()
        {
            var reviews = await _context.Reviews.ToListAsync();
            if(reviews == null)
            {
                return new List<Review>();
            }
            return reviews;
        }

        public async Task<IEnumerable<Review>> GetUserReviews(string id)
        {
            var reviews = await _context.Reviews.ToListAsync();
            var userReviews = reviews.Where(review => review.UserId == id);

            if (userReviews == null)
            {
                return new List<Review>();
            }

            return userReviews;
        }

        public async Task<Review> UpdateReview(Guid id, Review review)
        {
            _context.Entry(review).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewExists(id))
                {
                    return await AddReview(review);
                }
                else
                {
                    throw;
                }
            }

            return review;
        }

        private bool ReviewExists(Guid id)
        {
            return _context.Reviews.Any(e => e.Id == id);
        }
    }
}
