using System.Text.Json.Serialization;

namespace CampingMap.API.Models.Auth
{
    public class AuthModel
    {
        public string? Message { get; set; }

        public bool ISAuthenticated { get; set; }

        public string? UserName { get; set; }

        public string? UserId { get; set; }

        public string? Email { get; set; }

        public List<string>? Roles { get; set; }

        public string? Token { get; set; }

        public DateTime? TokenExpiresOn { get; set; }

        [JsonIgnore]
        public string? RefreshToken { get; set; }

        public DateTime RefreshTokenExpiration { get; set; }
    }
}
