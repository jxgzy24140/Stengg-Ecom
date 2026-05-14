using ECom.Infras.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ECom.Infras
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("Default")));

            return services;
        }
    }
}
