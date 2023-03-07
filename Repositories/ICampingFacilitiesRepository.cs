using CampingMap.API.Models;

namespace CampingMap.API.Repositories
{
    public interface ICampingFacilitiesRepository
    {
        Task<IEnumerable<CampingFacilities>> GetCampingFacilities();

        Task<IEnumerable<CampingFacilities>> GetCampingFacilities(Guid campingId);

        Task<CampingFacilities> GetCampingFacilitiesById(Guid id);

        Task<CampingFacilities> AddCampingFacilities(CampingFacilities location);

        Task<CampingFacilities> UpdateCampingFacility(Guid id, CampingFacilities location);

        Task<CampingFacilities> DeleteCampingFacility(Guid id);
    }
}
