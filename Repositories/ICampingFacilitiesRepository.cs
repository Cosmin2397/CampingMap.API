using CampingMap.API.Models;

namespace CampingMap.API.Repositories
{
    public interface ICampingFacilitiesRepository
    {
        Task<IEnumerable<CampingFacilities>> GetAllCampingFacilities();

        Task<IEnumerable<CampingFacilities>> GetCampingFacilities(Guid campingId);

        Task<CampingFacilities> GetCampingFacilitiesById(Guid id);

        Task<CampingFacilities> AddCampingFacilities(CampingFacilities campingFacility);

        Task<CampingFacilities> UpdateCampingFacility(Guid id, CampingFacilities campingFacility);

        Task<CampingFacilities> DeleteCampingFacility(Guid id);
    }
}
