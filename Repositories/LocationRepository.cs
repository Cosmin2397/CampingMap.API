using CampingMap.API.Data;
using CampingMap.API.Models;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using Location = CampingMap.API.Models.Location;

namespace CampingMap.API.Repositories
{
    public class LocationRepository : ILocationRepository
    {
        private readonly AppDbContext _context;

        public LocationRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Location> AddLocation(Location location)
        {
            if (location == null)
            {
                return null;
            }
            else
            {
                location.Id = Guid.NewGuid();
                await _context.Locations.AddAsync(location);
                await _context.SaveChangesAsync();
                return location;
            }
        }

        public async Task<Location> DeleteLocation(Guid id)
        {
            var location = await _context.Locations.FindAsync(id);
            if (location == null)
            {
                return null;
            }

            _context.Locations.Remove(location);
            await _context.SaveChangesAsync();

            return location;
        }

        public async Task<IEnumerable<Location>> GetCityCampings(string city)
        {
            var locations = await _context.Locations.ToListAsync();
            var cityCampings = locations.Where(location => location.City.ToLower() == city.ToLower());

            if (cityCampings == null)
            {
                return new List<Location>();
            }

            return cityCampings;
        }

        public async Task<IEnumerable<Location>> GetCountyCampings(string county)
        {
            var locations = await _context.Locations.ToListAsync();
            var countyCampings = locations.Where(location => location.County.ToLower() == county.ToLower());

            if (countyCampings == null)
            {
                return new List<Location>();
            }

            return countyCampings;
        }

        public async Task<Location> GetLocationByCampingId(Guid id)
        {
            var campingLocation = await _context.Locations.FirstOrDefaultAsync(p => p.CampingId == id);
            if (campingLocation == null)
            {
                return null;
            }
            return campingLocation;
        }

        public async Task<Location> GetLocationById(Guid id)
        {
            var location = await _context.Locations.FindAsync(id);

            if (location == null)
            {
                return null;
            }

            return location;
        }

        public async Task<IEnumerable<Location>> GetLocations()
        {
            var locations = await _context.Locations.ToListAsync();
            if (locations == null)
            {
                return new List<Location>();
            }
            return locations;
        }

        public async Task<IEnumerable<Location>> GetRegionCampings(string region)
        {
            var locations = await _context.Locations.ToListAsync();
            var regionCampings = locations.Where(location => location.Region.ToLower() == region.ToLower());

            if (regionCampings == null)
            {
                return new List<Location>();
            }

            return regionCampings;
        }

        public async Task<Location> UpdateLocation(Guid id, Location location)
        {
            _context.Entry(location).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocationExists(id))
                {
                    throw;
                }
            }

            return location;
        }

        private bool LocationExists(Guid id)
        {
            return _context.Locations.Any(e => e.Id == id);
        }
    }
}
