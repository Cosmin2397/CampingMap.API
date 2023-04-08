using System.ComponentModel.DataAnnotations;

namespace CampingMap.API.Models.Auth
{
    public class AddRoles
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
