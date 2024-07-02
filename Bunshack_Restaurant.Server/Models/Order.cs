namespace Bunshack_Restaurant.Server.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public string? CustomerName { get; set; }
        public DateTime OrderDate { get; set; }
        public ICollection<OrderMenu> OrderMenus { get; set; } = new List<OrderMenu>();
        public string? UserId { get; set; }
        public User? User { get; set; }
    }
}
