﻿using CampingMap.API.Data;
using CampingMap.API.Models;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;

namespace CampingMap.API.Repositories
{
    public class CampingFacilitiesRepository : ICampingFacilitiesRepository
    {
        private readonly AppDbContext _context;

        public CampingFacilitiesRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<CampingFacilities> AddCampingFacilities(CampingFacilities campingFacility)
        {
            if (campingFacility == null)
            {
                return null;
            }
            else
            {
                campingFacility.Id = Guid.NewGuid();
                await _context.CampingFacilities.AddAsync(campingFacility);
                await _context.SaveChangesAsync();
                return campingFacility;
            }
        }

        public async Task<CampingFacilities> DeleteCampingFacility(Guid id)
        {
            var campingFacilities = await _context.CampingFacilities.FindAsync(id);
            if (campingFacilities == null)
            {
                return null;
            }

            _context.CampingFacilities.Remove(campingFacilities);
            await _context.SaveChangesAsync();

            return campingFacilities; 
        }

        public async Task<IEnumerable<CampingFacilities>> GetCampingFacilities(Guid id)
        {
            var campingsFacilities = await _context.CampingFacilities.ToListAsync();
            var campingFacilitiesByID = campingsFacilities.Where(facility => facility.CampingId == id);

            if (campingFacilitiesByID == null)
            {
                return new List<CampingFacilities>();
            }

            return campingFacilitiesByID;
        }

        public async Task<IEnumerable<CampingFacilities>> GetAllCampingFacilities()
        {
            var campingFacilities = await _context.CampingFacilities.ToListAsync();
            if (campingFacilities == null)
            {
                return new List<CampingFacilities>();
            }
            return campingFacilities;
        }

        public async Task<CampingFacilities> GetCampingFacilitiesById(Guid id)
        {
            var campingFacility = await _context.CampingFacilities.FindAsync(id);

            if (campingFacility == null)
            {
                return null;
            }

            return campingFacility;
        }

        public async Task<CampingFacilities> UpdateCampingFacility(Guid id, CampingFacilities campingFacility)
        {
            _context.Entry(campingFacility).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CampingFacilityExists(id))
                {
                    throw;
                }
            }

            return campingFacility;
        }

        private bool CampingFacilityExists(Guid id)
        {
            return _context.CampingFacilities.Any(e => e.Id == id);
        }
    }
}
