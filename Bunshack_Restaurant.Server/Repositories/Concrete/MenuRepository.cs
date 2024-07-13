using Bunshack_Restaurant.Server.Data.Context;
using Bunshack_Restaurant.Server.Models;
using Bunshack_Restaurant.Server.Repositories.Abstract;

namespace Bunshack_Restaurant.Server.Repositories.Concrete
{
    public class MenuRepository : IMenuRepository
    {
        private readonly ApplicationDbContext _context;
        public MenuRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Menu AddMenu(Menu menu)
        {
            _context.Menus.Add(menu);
            _context.SaveChanges();
            return menu;
        }

        public List<Menu> GetAllMenus()
        {
            var menus = _context.Menus.OrderBy(i => i.Id).ToList();
            return menus;
        }

        public Menu GetMenuById(Guid menuId)
        {
            try
            {
                var menu = _context.Menus.FirstOrDefault(i => i.Id == menuId);
                if (menu == null)
                {
                    throw new Exception("Menu not found!");
                }
                return menu;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred: {ex.Message}");
            }
        }
        public Menu DeleteMenuById(Guid menuId)
        {
            try
            {
                var menu = _context.Menus.FirstOrDefault(x => x.Id == menuId);
                if (menu == null)
                {
                    throw new Exception("Menu not found!");
                }
                _context.Menus.Remove(menu);
                _context.SaveChanges();
                return menu;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred: {ex.Message}");
            }
        }

        public Menu UpdateMenuById(Guid menuId, Menu menu)
        {
            try
            {
                var menuToUpdate = _context.Menus.FirstOrDefault(i => i.Id == menuId);
                if (menuToUpdate == null)
                {
                    throw new Exception("Menu not found!");
                }
                menuToUpdate.FoodName = menu.FoodName;
                menuToUpdate.Price = menu.Price;
                _context.SaveChanges();
                return menuToUpdate;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred: {ex.Message}");
            }
        }
    }
}