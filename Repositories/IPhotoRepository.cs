using CampingMap.API.Models;

namespace CampingMap.API.Repositories
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotos();

        Task<IEnumerable<Photo>> GetCampingPhotos(Guid id);

        Task<Photo> GetPhotoById(Guid id);

        Task<Photo> AddPhoto(Photo photo);

        Task<Photo> UpdatePhoto(Guid id, Photo photo);

        Task<Photo> DeletePhoto(Guid id);
    }
}
