using Microsoft.EntityFrameworkCore;

namespace ECom.Application.Interfaces
{
    public interface IRepository<T, TPrimaryKey> where T : class
    {
        IQueryable<T> GetAll();
        Task<T> UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task<T> CreateAsync(T entity);
        void Delete(T entity);
        void Update(T entity);
        Task<T> UpdateAsync(T entity, byte[] rowVersion);
        Task SaveChangeAsync();
        Task DeleteRangeAsync(List<T> entities);
        Task UpdateRangeAsync(List<T> entities);
    }
}
