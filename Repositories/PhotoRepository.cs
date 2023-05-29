using CampingMap.API.Data;
using CampingMap.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using System.Drawing;

namespace CampingMap.API.Repositories
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly AppDbContext _context;

        public PhotoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Photo> AddPhoto(Guid campingID, IFormFile imageFile)
        {
            var camping = await _context.Campings.FindAsync(campingID);
            Photo photo = new Photo();
            if (imageFile == null)
            {
                return null;
            }
            else
            {
                using (var stream = new MemoryStream())
                {
                    await imageFile.CopyToAsync(stream);
                    photo.Id = new Guid();
                    photo.Name = camping.Name;
                    photo.CampingId = campingID;
                    photo.Image = stream.ToArray();
                }

                await _context.Photos.AddAsync(photo);
                await _context.SaveChangesAsync();
                return photo;
            }
        }
       
        public async Task<Photo> DeletePhoto(Guid id)
        {
            var photo = await _context.Photos.FindAsync(id);
            if (photo == null)
            {
                return null;
            }

            _context.Photos.Remove(photo);
            await _context.SaveChangesAsync();

            return photo;
        }

        public async Task<List<Image>> GetCampingPhotos(Guid id)
        {
            var photos = await _context.Photos.ToListAsync();
            var campingPhotos = photos.Where(photo => photo.CampingId == id);
            var images = new List<Image>();
            if (campingPhotos == null)
            {
                return null;
            }
            else
            {
                foreach (var photo in campingPhotos)
                {
                    using (MemoryStream memstr = new MemoryStream(photo.Image))
                    {
                        images.Add( Image.FromStream(memstr));
                    }
                }
                return images;
            }
        }
    }
}
