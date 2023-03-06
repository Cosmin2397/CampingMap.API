using CampingMap.API.Models;

namespace CampingMap.API.Repositories
{
    public interface IFacilityRepository
    {
        Task<IEnumerable<Facility>> GetFacilities();

        Task<Facility> AddFacility(Facility facility);

        Task<Facility> DeleteFacility(Guid id);
    }
}
