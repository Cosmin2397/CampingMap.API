using CampingMap.API.Data;
using CampingMap.API.Models;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;

namespace CampingMap.API.Repositories
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly AppDbContext _context;

        public PhotoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Photo> AddPhoto(Photo photo)
        {
            if (photo == null)
            {
                return null;
            }
            else
            {
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

        public async Task<IEnumerable<Photo>> GetCampingPhotos(Guid id)
        {
            var photos = await _context.Photos.ToListAsync();
            var campingPhotos= photos.Where(photo => photo.CampingId == id);

            if (campingPhotos == null)
            {
                return new List<Photo>();
            }

            return campingPhotos;
        }

        public async Task<Photo> GetPhotoById(Guid id)
        {
            var photo = await _context.Photos.FindAsync(id);

            if (photo == null)
            {
                return null;
            }

            return photo;
        }

        public async Task<IEnumerable<Photo>> GetPhotos()
        {
            var photos = await _context.Photos.ToListAsync();
            return photos;
        }

        public async Task<Photo> UpdatePhoto(Guid id, Photo photo)
        {
            _context.Entry(photo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhotoExists(id))
                {
                    return await AddPhoto(photo);
                }
                else
                {
                    throw;
                }
            }

            return photo;
        }

        private bool PhotoExists(Guid id)
        {
            return _context.Photos.Any(e => e.Id == id);
        }
    }
}
