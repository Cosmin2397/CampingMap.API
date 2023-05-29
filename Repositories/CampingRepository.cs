using CampingMap.API.Data;
using CampingMap.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing;

namespace CampingMap.API.Repositories
{
    public class CampingRepository : ICampingRepository
    {

        private readonly AppDbContext _context;
        private readonly ILocationRepository _locationRepository;
        private readonly IReviewRepository _reviewRepository;
        private readonly IRatingRepository _ratingRepository;
        private readonly IPhotoRepository _photoRepository;

        public CampingRepository(AppDbContext context, 
            ILocationRepository locationRepository,
            IReviewRepository reviewRepository,
            IRatingRepository ratingRepository,
            IPhotoRepository photoRepository)
        {
            _context = context;
            _locationRepository = locationRepository;
            _reviewRepository = reviewRepository;
            _ratingRepository = ratingRepository;
            _photoRepository = photoRepository;
        }

        public async Task<Camping> AddCamping(Camping camping)
        {
            if (camping == null)
            {
                return null;
            }
            else
            {
                camping.Id = Guid.NewGuid();
                await _context.Campings.AddAsync(camping);
                await _context.SaveChangesAsync();
                return camping;
            }
        }

        public async Task<Camping> DeleteCamping(Guid id)
        {
            var camping = await _context.Campings.FindAsync(id);
            if (camping== null)
            {
                return null;
            }

            _context.Campings.Remove(camping);
            await _context.SaveChangesAsync();

            return camping;
        }

        public async Task<Camping> GetCampingById(Guid id)
        {
            var campings = await GetCampings();
            var camping = campings.FirstOrDefault(c => c.Id == id);
            if(camping == null)
            {
                return null;
            }
            return camping;
        }

        public async Task<IEnumerable<Camping>> GetCampings()
        {
            var campings = await _context.Campings.ToListAsync();
            foreach(var camping in campings)
            {
                camping.Reviews = await _reviewRepository.GetCampingReviews(camping.Id);
                camping.Photos = await _photoRepository.GetCampingPhotos(camping.Id);
                camping.Rating = await _ratingRepository.GetCampingRating(camping.Id);
                camping.Location = await _locationRepository.GetLocationByCampingId(camping.Id);
            }
            if (campings == null)
            {
                return new List<Camping>();
            }
            return campings;
        }

        public async Task<IEnumerable<Camping>> GetUserCampings(string userId)
        {
            var userCampings = await _context.Campings.Where(c => c.UserId == userId).ToListAsync();
            foreach (var camping in userCampings)
            {
                camping.Reviews = await _reviewRepository.GetCampingReviews(camping.Id);
                camping.Photos = await _photoRepository.GetCampingPhotos(camping.Id);
                camping.Rating = await _ratingRepository.GetCampingRating(camping.Id);
                camping.Location = await _locationRepository.GetLocationByCampingId(camping.Id);
            }
            if (userCampings == null)
            {
                return new List<Camping>();
            }
            return userCampings;
        }

        public async Task<IEnumerable<Camping>> GetCampingsByRegion(string region)
        {
            var campings = await GetCampings();
            var regionCampings = campings.Where(r => r.Location.Region.ToLower() == region.ToLower()).ToList();
            if (regionCampings == null)
            {
                return new Camping[0];
            }

            return regionCampings;
        }

        public async Task<IEnumerable<Camping>> GetCityCampings(string city)
        {
            var campings = await GetCampings();
            var cityCampings = campings.Where(r => r.Location.City.ToLower() == city.ToLower()).ToList();
            if (cityCampings == null)
            {
                return new Camping[0];
            }

            return cityCampings;
        }

        public async Task<IEnumerable<Camping>> GetCountyCampings(string county)
        {
            var campings = await GetCampings();
            var countyCampings = campings.Where(r => r.Location.County.ToLower() == county.ToLower()).ToList();
            if (countyCampings == null)
            {
                return new Camping[0];
            }

            return countyCampings;
        }

        public async Task<Camping> UpdateCamping(Guid id, Camping camping)
        {
            _context.Entry(camping).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CampingExists(id))
                {
                    throw;
                }
            }

            return camping;

        }

        private bool CampingExists(Guid id)
        {
            return _context.Campings.Any(e => e.Id == id);
        }
    }
}
