using CampingMap.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CampingMap.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
        {
        }

        public DbSet<Camping> Campings { get; set; }

        public DbSet<CampingFacilities> CampingFacilities { get; set; }

        public DbSet<Facility> Facilities { get; set; }

        public DbSet<Location> Locations { get; set; }

        public DbSet<Photo> Photos{ get; set; }

        public DbSet<Rating> Ratings{ get; set; }

        public DbSet<Review> Reviews { get; set; }

    }
}
