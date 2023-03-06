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
    public class PhotosController : ControllerBase
    {
        private readonly IPhotoRepository _photoRepository;

        public PhotosController(IPhotoRepository photoRepository)
        {
            _photoRepository = photoRepository;
        }

        // GET: api/Photos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Photo>>> GetPhotos()
        {
            var photos = await _photoRepository.GetPhotos();
            if (photos == null)
            {
                return NotFound();
            }

            return Ok(photos);
        }

        // GET: api/Photos/5
        [HttpGet("camping/{id}")]
        public async Task<ActionResult<IEnumerable<Photo>>> GetCampingPhotos(Guid id)
        {
            var photos = await _photoRepository.GetCampingPhotos(id);
            return Ok(photos);
        }

        // GET: api/Photos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Photo>> GetPhoto(Guid id)
        {
            var photo = await _photoRepository.GetPhotoById(id);

            if (photo == null)
            {
                return NotFound();
            }

            return photo;
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<Photo>> PutPhoto(Guid id, Photo photo)
        {
            var updatedPhoto = await _photoRepository.UpdatePhoto(id, photo);

            return Ok(updatedPhoto);
        }

        [HttpPost]
        public async Task<ActionResult<Photo>> PostPhoto(Photo photo)
        {
            try
            {

                await _photoRepository.AddPhoto(photo);
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
