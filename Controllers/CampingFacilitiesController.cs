using CampingMap.API.Models;
using CampingMap.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;

namespace CampingMap.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampingFacilitiesController : ControllerBase
    {
        private readonly ICampingFacilitiesRepository _campingFacilitiesRepository;

        public CampingFacilitiesController(ICampingFacilitiesRepository campingFacilitiesRepository)
        {
            _campingFacilitiesRepository = campingFacilitiesRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CampingFacilities>>> GetCampingsFacilities()
        {
            var campingsFacilities = await _campingFacilitiesRepository.GetAllCampingFacilities();
            return Ok(campingsFacilities);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CampingFacilities>>> GetCampingFacilities(Guid id)
        {
            var campingsFacilities = await _campingFacilitiesRepository.GetCampingFacilities(id);
            return Ok(campingsFacilities);
        }

        [HttpGet]
        public async Task<ActionResult<CampingFacilities>> GetCampingFacilityById(Guid id)
        {
            var campingFacility = await _campingFacilitiesRepository.GetCampingFacilitiesById(id);

            if (campingFacility == null)
            {
                return NotFound();
            }

            return campingFacility;
        }

        [HttpPost]
        public async Task<ActionResult<CampingFacilities>> PostCampingFacilities(CampingFacilities campingFacilities)
        {
            try
            {

                await _campingFacilitiesRepository.AddCampingFacilities(campingFacilities);
                if (campingFacilities == null)
                {
                    return NotFound();
                }

                return Ok(campingFacilities);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CampingFacilities>> PostCampingFacilities(Guid id, CampingFacilities campingFacility)
        {
            var updatedCampingFacility = await _campingFacilitiesRepository.UpdateCampingFacility(id, campingFacility);

            return Ok(updatedCampingFacility);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCampingFacility(Guid id)
        {
            try
            {

                var campingFacility = await _campingFacilitiesRepository.DeleteCampingFacility(id);
                if (campingFacility == null)
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
