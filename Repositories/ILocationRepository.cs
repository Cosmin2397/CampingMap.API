using CampingMap.API.Models;

namespace CampingMap.API.Repositories
{
    public interface ILocationRepository
    {
        Task<IEnumerable<Location>> GetLocations();

        Task<IEnumerable<Location>> GetRegionCampings(string region);

        Task<IEnumerable<Location>> GetCountyCampings(string county);

        Task<IEnumerable<Location>> GetCityCampings(string city);

        Task<Location> GetLocationById(Guid id);

        Task<Location> GetLocationByCampingId(Guid id);

        Task<Location> AddLocation(Location location);

        Task<Location> UpdateLocation(Guid id, Location location);

        Task<Location> DeleteLocation(Guid id);
    }
}
