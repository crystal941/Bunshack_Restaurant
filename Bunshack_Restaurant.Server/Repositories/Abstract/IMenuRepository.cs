using Bunshack_Restaurant.Server.Models;

namespace Bunshack_Restaurant.Server.Repositories.Abstract
{
    public interface IMenuRepository
    {
        Menu AddMenu(Menu menu);
        List<Menu> GetAllMenus();
        Menu GetMenuById(Guid menuId);
        Menu UpdateMenuById(Guid menuId, Menu menu);
        Menu DeleteMenuById(Guid menuId);
    }
}
