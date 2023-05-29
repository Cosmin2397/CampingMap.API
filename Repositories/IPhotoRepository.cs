using CampingMap.API.Models;

namespace CampingMap.API.Repositories
{
    public interface IPhotoRepository
    {
        Task<Photo> GetCampingPhoto(Guid id);

        Task<Photo> GetPhotoById(Guid id);

        Task<Photo> AddPhoto(Guid campingId, IFormFile imageFile);

        Task<Photo> DeletePhoto(Guid id);
    }
}
