using CampingMap.API.Models.Auth;

namespace CampingMap.API.Repositories
{
    public interface IAuthRepository
    {
        Task<AuthModel> SignUpAsync(SignUp model);

        Task<AuthModel> LoginAsync(Login model);

        Task<string> AddRoleAsync(AddRoles model);

        Task<AuthModel> RefreshTokenCheckAsync(string token);

        Task<bool> RevokeTokenAsync(string token);

        Task<AuthModel> GetCurrentAsync(string token);

        Task<string> Logout(string token);
    }
}
