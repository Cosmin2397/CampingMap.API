using CampingMap.API.Models;
using System.Drawing;

namespace CampingMap.API.Repositories
{
    public interface IPhotoRepository
    {
        Task<List<Image>> GetCampingPhotos(Guid id);

        Task<Photo> AddPhoto(Guid campingId, IFormFile imageFile);

        Task<Photo> DeletePhoto(Guid id);
    }
}
