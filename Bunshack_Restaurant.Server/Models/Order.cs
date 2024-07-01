namespace Bunshack_Restaurant.Server.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public string? FoodName { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }
        public string? MenuId { get; set; }
    }
}
