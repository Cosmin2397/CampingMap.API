using CampingMap.API.Models;
using CampingMap.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult<IEnumerable<Camping>>> GetCampings()
        {
            var campings = await _campingRepository.GetCampings();
            return Ok(campings);
        }

        [HttpGet("{id}")]
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
        public async Task<ActionResult<Camping>> PutCamping(Guid id, Camping camping)
        {
            var updatedCamping = await _campingRepository.UpdateCamping(id, camping);

            return Ok(updatedCamping);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCamping(Guid id)
        {
            try
            {

                var camping = await _campingRepository.DeleteCamping(id);
                if (camping== null)
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

        [HttpGet("city/{id}")]
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
