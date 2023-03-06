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
    public class LocationsController : ControllerBase
    {
        private readonly ILocationRepository _locationRepository;

        public LocationsController(ILocationRepository locationRepository)
        {
            _locationRepository = locationRepository;
        }

        // GET: api/Locations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Location>>> GetLocations()
        {
            var locations = await _locationRepository.GetLocations();
            return Ok(locations);
        }

        // GET: api/Locations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Location>> GetLocation(Guid id)
        {
            var location = await _locationRepository.GetLocationById(id);

            if (location == null)
            {
                return NotFound();
            }

            return location;
        }

        [HttpGet("camping/{id}")]
        public async Task<ActionResult<Location>> GetCampingLocation(Guid id)
        {
            var location = await _locationRepository.GetLocationByCampingId(id);

            if (location == null)
            {
                return NotFound();
            }

            return location;
        }

        [HttpGet("city/{id}")]
        public async Task<ActionResult<IEnumerable<Location>>> GetCityCampigns(string id)
        {
            var locations = await _locationRepository.GetCityCampings(id);

            if (locations == null)
            {
                return NotFound();
            }

            return Ok(locations);
        }

        [HttpGet("county/{id}")]
        public async Task<ActionResult<IEnumerable<Location>>> GetCountyCampigns(string id)
        {
            var locations = await _locationRepository.GetCountyCampings(id);

            if (locations == null)
            {
                return NotFound();
            }

            return Ok(locations);
        }

        [HttpGet("region/{id}")]
        public async Task<ActionResult<IEnumerable<Location>>> GetRegionCampigns(string id)
        {
            var locations = await _locationRepository.GetRegionCampings(id);

            if (locations == null)
            {
                return NotFound();
            }

            return Ok(locations);
        }

        // PUT: api/Locations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLocation(Guid id, Location location)
        {
            var updatedLocation = await _locationRepository.UpdateLocation(id, location);

            return Ok(updatedLocation);
        }

        // POST: api/Locations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Location>> PostLocation(Location location)
        {
            try
            {

                await _locationRepository.AddLocation(location);
                if (location == null)
                {
                    return NotFound();
                }

                return Ok(location);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // DELETE: api/Locations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocation(Guid id)
        {
            try
            {

                var location = await _locationRepository.DeleteLocation(id);
                if (location == null)
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
