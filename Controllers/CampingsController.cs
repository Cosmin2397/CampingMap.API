using CampingMap.API.Models;
using CampingMap.API.Models.Auth;
using CampingMap.API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;
using System.Security.Claims;

namespace CampingMap.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampingsController : ControllerBase
    {
        private readonly ICampingRepository _campingRepository;
        private readonly IAuthRepository _authRepository;

        public CampingsController(ICampingRepository campingRepository, IAuthRepository authRepository)
        {
            _campingRepository = campingRepository;
            _authRepository = authRepository;
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
            var token = Request.Cookies["refreshTokenKey"];

            var user = await _authRepository.GetCurrentAsync(token);
            var campings = await _campingRepository.GetUserCampings(user.UserId);
            if (user.ISAuthenticated)
            {
                return Ok(campings);
            }

            return Unauthorized();
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

            return Ok(camping);
        }

        [HttpPost]
        public async Task<ActionResult<Camping>> PostCamping(Camping camping)
        {
            try
            {
                var token = Request.Cookies["refreshTokenKey"];

                var user = await _authRepository.GetCurrentAsync(token);

                if (user.ISAuthenticated)
                {
                    camping.UserId = user.UserId;
                }
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
            var token = Request.Cookies["refreshTokenKey"];

            var user = await _authRepository.GetCurrentAsync(token);

            if (user.ISAuthenticated)
            {
                if (camping.UserId == user.UserId)
                {
                    var updatedCamping = await _campingRepository.UpdateCamping(id, camping);

                    return Ok(updatedCamping);
                }
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
                var token = Request.Cookies["refreshTokenKey"];

                var user = await _authRepository.GetCurrentAsync(token);

                if (user.ISAuthenticated)
                {
                    if (camping.UserId == user.UserId)
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
