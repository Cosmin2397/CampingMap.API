using CampingMap.API.Models;
using CampingMap.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CampingMap.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampingsController : ControllerBase
    {
        private readonly ICampingRepository _campingRepository;

        public CampingsController(ICampingRepository campingRepository)
        {
            _campingRepository = campingRepository;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Camping>))]
        [ProducesResponseType(400)]
        public async Task<ActionResult<IEnumerable<Camping>>> GetCampings()
        {
            var campings = await _campingRepository.GetCampings();
            return Ok(campings);
        }

        [HttpGet("userCampings")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Camping>))]
        [ProducesResponseType(400)]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Camping>>> GetUserCampings()
        {
            var userId = User.FindFirstValue("userId");
            var campings = await _campingRepository.GetUserCampings(userId);
            return Ok(campings);
        }


        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Camping))]
        [ProducesResponseType(400)]
        public async Task<ActionResult<Camping>> GetCampingById(Guid id)
        {
            var camping = await _campingRepository.GetCampingById(id);

            if (camping == null)
            {
                return NotFound();
            }

            return camping;
        }

        [HttpPost]
        public async Task<ActionResult<Camping>> PostCamping(Camping camping)
        {
            try
            {
                camping.UserId = User.FindFirstValue("userId");
                await _campingRepository.AddCamping(camping);
                if (camping == null)
                {
                    return NotFound();
                }

                return Ok(camping);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Camping>> PutCamping(Guid id, Camping camping)
        {
            if (camping.UserId == User.FindFirstValue("userId"))
            {
                var updatedCamping = await _campingRepository.UpdateCamping(id, camping);

                return Ok(updatedCamping);
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteCamping(Guid id)
        {
            var camping = await _campingRepository.GetCampingById(id);
            try
            {
                if (camping.UserId == User.FindFirstValue("userId"))
                {
                    await _campingRepository.DeleteCamping(id);
                }
                else if (camping == null)
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest();
                }
                

                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("city/{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Camping>))]
        [ProducesResponseType(400)]
        public async Task<ActionResult<IEnumerable<Camping>>> GetCampignsByCity(string id)
        {
            var campings = await _campingRepository.GetCityCampings(id);

            if (campings == null)
            {
                return NotFound();
            }

            return Ok(campings);
        }

        [HttpGet("county/{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Camping>))]
        [ProducesResponseType(400)]
        public async Task<ActionResult<IEnumerable<Camping>>> GetCampignsByCounty(string id)
        {
            var campings = await _campingRepository.GetCountyCampings(id);

            if (campings == null)
            {
                return NotFound();
            }

            return Ok(campings);
        }

        [HttpGet("region/{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Camping>))]
        [ProducesResponseType(400)]
        public async Task<ActionResult<IEnumerable<Camping>>> GetCampignsByRegion(string id)
        {
            var campings = await _campingRepository.GetCampingsByRegion(id);

            if (campings == null)
            {
                return NotFound();
            }

            return Ok(campings);
        }

    }
}
