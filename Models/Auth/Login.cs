using System.ComponentModel.DataAnnotations;

namespace CampingMap.API.Models.Auth
{
    public class Login
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }



        [Required]
        public string Password { get; set; }
    }
}
