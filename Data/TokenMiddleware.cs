namespace CampingMap.API.Data
{
    public class TokenMiddleware
    {
        private readonly RequestDelegate _next;

        public TokenMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var token = context.Request.Cookies["refreshTokenKey"];

            if (!string.IsNullOrEmpty(token))
            {
                context.Response.Headers.Add("Authorization", $"Bearer {token}");
            }

            await _next(context);
        }
    }
}
