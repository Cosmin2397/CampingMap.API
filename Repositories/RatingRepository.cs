using CampingMap.API.Data;
using CampingMap.API.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace CampingMap.API.Repositories
{
    public class RatingRepository : IRatingRepository
    {
        private readonly AppDbContext _context;
        private readonly IReviewRepository _reviewRepository;

        public RatingRepository(AppDbContext context, IReviewRepository reviewRepository)
        {
            _context = context;
            _reviewRepository = reviewRepository;
        }

        public async Task<Rating> AddRating(Guid id)
        {
            var score = await GetCampingRating(id);
            var rating = new Rating
            {
                Id = Guid.NewGuid(),
                Score = score,
                CampingId = id
            };

            await _context.Ratings.AddAsync(rating);
            await _context.SaveChangesAsync();  
            return rating;
        }

        public async Task<double> GetCampingRating(Guid id)
        {
            var reviews = await _reviewRepository.GetCampingReviews(id);
            var score = reviews.Average(p => p.Rating);
            return score;
        }

        public async  Task<double> UpdateRating(Guid id)
        {
            if(RatingExists(id))
            {
                var score = await GetCampingRating(id);
                var rating = await _context.Ratings.FirstOrDefaultAsync(p => p.CampingId == id);
                rating.Score = score;
                await _context.SaveChangesAsync();
                return score;

            }
            else
            {
                var newRating = await AddRating(id);
                return newRating.Score;
            }
        }

        private bool RatingExists(Guid id)
        {
            return _context.Ratings.Any(e => e.CampingId == id);
        }
    }
}
