using CampingMap.API.Data;
using CampingMap.API.Models;
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

        public Task<IEnumerable<Photo>> GetCampingPhotos(Guid id)
        {
            throw new NotImplementedException();
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

        public Task UpdatePhoto(Photo photo)
        {
            throw new NotImplementedException();
        }
    }
}
