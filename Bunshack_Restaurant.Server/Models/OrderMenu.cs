namespace Bunshack_Restaurant.Server.Models
{
    public class OrderMenu
    {
        public Guid OrderId { get; set; }
        public Guid MenuId { get; set; }
        public int Quantity { get; set; }
    }
}
