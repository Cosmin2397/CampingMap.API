using CampingMap.API.Models;

namespace CampingMap.API.Repositories
{
    public interface IRatingRepository
    {

        Task<double> GetCampingRating(Guid id);

        Task<Rating> AddRating(Guid id);

        Task<double> UpdateRating(Guid id);
    }
}
