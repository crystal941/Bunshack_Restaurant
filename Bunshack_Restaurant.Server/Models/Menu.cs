namespace Bunshack_Restaurant.Server.Models
{
    public class Menu
    {
        public Guid Id { get; set; }
        public string? FoodName { get; set; }
        public decimal Price { get; set; }
        public ICollection<OrderMenu> OrderMenus { get; set; } = new List<OrderMenu>();
    }
}
