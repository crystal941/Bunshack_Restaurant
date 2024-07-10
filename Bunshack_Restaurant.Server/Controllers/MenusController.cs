using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Bunshack_Restaurant.Server.Models;
using Bunshack_Restaurant.Server.Repositories.Abstract;
using Bunshack_Restaurant.Server.Data.Context;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Bunshack_Restaurant.Server.Controllers
{
    [Route("api/MenusController")]
    [ApiController]
    public class MenusController : ControllerBase
    {
        private readonly IMenuRepository _menuRepository;
        private readonly ApplicationDbContext _context;

        public MenusController(IMenuRepository menuRepository, ApplicationDbContext context)
        {
            _menuRepository = menuRepository;
            _context = context;
        }

        [HttpGet, Authorize]
        public ActionResult<List<Menu>> GetAllMenus()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Assuming you have the user's ID
                var user = _context.Users.FirstOrDefault(u => u.Id == userId);
                if (user != null)
                {
                    bool isAdmin = user.IsAdmin;
                    if (!isAdmin)
                    {
                        return Unauthorized(new { message = "You have no permission to view this page." });
                    }
                    var menus = _menuRepository.GetAllMenus().ToList();
                    return Ok(menus);
                }
                return Unauthorized(new { message = "User is not logged in." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to retrieve menus.", error = ex.Message });
            }
        }

        [HttpGet("{id}"), Authorize]
        public ActionResult<Menu> GetMenuById(Guid id)
        {
            try
            {
                var menu = _menuRepository.GetMenuById(id);
                return Ok(menu);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}"), Authorize]
        public ActionResult<Menu> UpdateMenu(Guid id, Menu menu)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = _context.Users.FirstOrDefault(u => u.Id == userId);
                if (user != null)
                {
                    bool isAdmin = user.IsAdmin;
                    if (!isAdmin)
                    {
                        return Unauthorized(new { message = "You have no permission to update this menu." });
                    }
                    var menuUpdate = _menuRepository.UpdateMenuById(id, menu);
                    return Ok(menuUpdate);
                }
                return Unauthorized(new { message = "User is not logged in." });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Authorize]
        public ActionResult<Menu> AddMenu(Menu menu)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = _context.Users.FirstOrDefault(u => u.Id == userId);
                if (user != null)
                {
                    bool isAdmin = user.IsAdmin;
                    if (!isAdmin)
                    {
                        return Unauthorized(new { message = "You have no permission to add this menu." });
                    }
                    return Ok(_menuRepository.AddMenu(menu));
                }
                return Unauthorized(new { message = "User is not logged in." });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}"), Authorize]
        public ActionResult<Menu> DeleteMenu(Guid id)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = _context.Users.FirstOrDefault(u => u.Id == userId);
                if (user != null)
                {
                    bool isAdmin = user.IsAdmin;
                    if (!isAdmin)
                    {
                        return Unauthorized(new { message = "You have no permission to delete this menu." });
                    }
                    var menu = _menuRepository.DeleteMenuById(id);
                    return Ok(menu);
                }
                return Unauthorized(new { message = "User is not logged in." });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
