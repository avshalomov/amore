﻿using amore_dal.Models;
using amore_dal.DTOs;

namespace amore_dal.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto> GetUserByIdAsync(int userId);
        Task<UserDto> CreateUserAsync(UserDto userDto);
        Task<User> UpdateUserAsync(int id, UserDto userDto);
        Task<bool> DeleteUserAsync(int userId);
    }
}