using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Bunshack_Restaurant.Server.Models;
using Bunshack_Restaurant.Server.Repositories.Abstract;

namespace Bunshack_Restaurant.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenusController : ControllerBase
    {
        private readonly IMenuRepository _menuRepository;
        public MenusController(IMenuRepository menuRepository)
        {
            _menuRepository = menuRepository;
        }

        // GET: api/Menus
        [HttpGet]
        public ActionResult<List<Menu>> GetAllMenus()
        {
            return Ok(_menuRepository.GetAllMenus());
        }

        // GET: api/Menus/5
        [HttpGet("{id}")]
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

        // PUT: api/Menus/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public ActionResult<Menu> UpdateMenu(Guid id, Menu menu)
        {
            try
            {
                var menuUpdate = _menuRepository.UpdateMenuById(id, menu);
                return Ok(menuUpdate);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/Menus
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public ActionResult<Menu> AddMenu(Menu menu)
        {
            return Ok(_menuRepository.AddMenu(menu));
        }

        // DELETE: api/Menus/5
        [HttpDelete("{id}")]
        public ActionResult<Menu> DeleteMenu(Guid id)
        {
            try
            {
                var menu = _menuRepository.DeleteMenuById(id);
                return Ok(menu);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
