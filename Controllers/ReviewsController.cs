using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CampingMap.API.Data;
using CampingMap.API.Models;
using CampingMap.API.Repositories;

namespace CampingMap.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;

        public ReviewsController(IReviewRepository reviewRepository)
        {
            _reviewRepository = reviewRepository;
        }

        // GET: api/Reviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviews()
        {
            var reviews = await _reviewRepository.GetReviews();
            return Ok(reviews);
        }

        // GET: api/Reviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReview(Guid id)
        {
            var review = await _reviewRepository.GetReviewById(id);

            if (review == null)
            {
                return NotFound();
            }

            return review;
        }

        [HttpGet("userReviews/{id}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetUserReviews(string id)
        {
            var reviews = await _reviewRepository.GetUserReviews(id);

            if (reviews == null)
            {
                return NotFound();
            }

            return Ok(reviews);
        }

        [HttpGet("campingReviews/{id}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetCampingReviews(Guid id)
        {
            var reviews = await _reviewRepository.GetCampingReviews(id);

            if (reviews == null)
            {
                return NotFound();
            }

            return Ok(reviews);
        }

        // PUT: api/Reviews/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReview(Guid id, Review review)
        {
            var updatedReview = await _reviewRepository.UpdateReview(id,review);

            return Ok(updatedReview);
        }


        [HttpPost]
        public async Task<ActionResult<Review>> PostReview(Review review)
        {
            try
            {

                await _reviewRepository.AddReview(review);
                if (review == null)
                {
                    return NotFound();
                }

                return Ok(review);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // DELETE: api/Reviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(Guid id)
        {
            try
            {

                var review = await _reviewRepository.DeleteReview(id);
                if (review == null)
                {
                    return NotFound();
                }

                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}
