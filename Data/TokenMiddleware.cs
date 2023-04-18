namespace CampingMap.API.Data
{
    public class TokenMiddleware
    {
        private readonly RequestDelegate _next;

        public TokenMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            if (context.Request.Cookies.TryGetValue("refreshTokenKey", out var refreshToken))
            {
                context.Request.Headers.Add("Authorization", $"Bearer {refreshToken}");
            }

            await _next(context);
        }
    }
}
