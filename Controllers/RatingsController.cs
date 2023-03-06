using CampingMap.API.Models;
using CampingMap.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CampingMap.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingsController : ControllerBase
    {
        private readonly IRatingRepository _ratingRepository;

        public RatingsController(IRatingRepository ratingRepository)
        {
            _ratingRepository = ratingRepository;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<double>> GetRating(Guid id)
        {
            var rating = await _ratingRepository.UpdateRating(id);

            if (rating == null)
            {
                return NotFound();
            }

            return rating;
        }
    }
}
