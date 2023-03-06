using CampingMap.API.Models;
using CampingMap.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CampingMap.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacilitiesController : ControllerBase
    {
        private readonly IFacilityRepository _facilityRepository;

        public FacilitiesController(IFacilityRepository facilityRepository)
        {
                _facilityRepository = facilityRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Facility>>> GetFacilities()
        {
            var facilities = await _facilityRepository.GetFacilities();
            return Ok(facilities);
        }

        [HttpPost]
        public async Task<ActionResult<Facility>> PostFacility(Facility facility)
        {
            try
            {

                await _facilityRepository.AddFacility(facility);
                if (facility == null)
                {
                    return NotFound();
                }

                return Ok(facility);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFacility(Guid id)
        {
            try
            {

                var facility = await _facilityRepository.DeleteFacility(id);
                if (facility == null)
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
