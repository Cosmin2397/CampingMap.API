using CampingMap.API.Data;
using CampingMap.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CampingMap.API.Repositories
{
    public class FacilityRepository : IFacilityRepository
    {
        private readonly AppDbContext _context;

        public FacilityRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Facility> AddFacility(Facility facility)
        {
            if (facility == null)
            {
                return null;
            }
            else
            {
                facility.Id = Guid.NewGuid();
                await _context.Facilities.AddAsync(facility);
                await _context.SaveChangesAsync();
                return facility;
            }
        }

        public async Task<Facility> DeleteFacility(Guid id)
        {
            var facility = await _context.Facilities.FindAsync(id);
            if (facility == null)
            {
                return null;
            }

            _context.Facilities.Remove(facility);
            await _context.SaveChangesAsync();

            return facility;
        }

        public async Task<IEnumerable<Facility>> GetFacilities()
        {
            var facilities = await _context.Facilities.ToListAsync();
            if (facilities == null)
            {
                return new List<Facility>();
            }
            return facilities;
        }
    }
}
