using CampingMap.API.Models.Auth;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CampingMap.API.Data
{
    public class DefaultDbContext : IdentityDbContext<AppUser>
    {
        public DefaultDbContext(DbContextOptions<DefaultDbContext> option) : base(option)
        {

        }
    }
}
