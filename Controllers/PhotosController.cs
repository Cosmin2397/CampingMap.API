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
using NuGet.Protocol.Core.Types;

namespace CampingMap.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IPhotoRepository _photoRepository;

        public PhotosController(IPhotoRepository photoRepository)
        {
            _photoRepository = photoRepository;
        }

        [HttpGet("camping-photos/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<Photo>>> GetCampingPhotos(Guid id)
        {
            var campingPhotos = await _photoRepository.GetCampingPhotos(id);

            if (campingPhotos == null || !campingPhotos.Any())
            {
                return NotFound();
            }

            return campingPhotos;
        }

        [HttpPost("{campingId}")]
        public async Task<ActionResult<Photo>> PostPhoto(Guid campingId, IFormFile imageFile)
        {
            try
            {

                var photo = await _photoRepository.AddPhoto(campingId, imageFile);
                if (photo == null)
                {
                    return NotFound();
                }

                return Ok(photo);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(Guid id)
        {
            try
            {

                var photo = await _photoRepository.DeletePhoto(id);
                if (photo == null)
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
