using CampingMap.API.Models;

namespace CampingMap.API.Repositories
{
    public interface ICampingRepository
    {
        Task<IEnumerable<Camping>> GetCampings();

        Task<IEnumerable<Camping>> GetCampingsByRegion(string region);

        Task<IEnumerable<Camping>> GetCountyCampings(string county);

        Task<IEnumerable<Camping>> GetCityCampings(string city);

        Task<Camping> GetCampingById(Guid id);

        Task<Camping> AddCamping(Camping camping);

        Task<Camping> UpdateCamping(Guid id, Camping camping);

        Task<Camping> DeleteCamping(Guid id);
    }
}
