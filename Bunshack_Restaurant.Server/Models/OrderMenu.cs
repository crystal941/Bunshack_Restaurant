namespace Bunshack_Restaurant.Server.Models
{
    public class OrderMenu
    {
        public Guid OrderId { get; set; }
       // public Order? Order { get; set; }
        public Guid MenuId { get; set; }
        //public Menu? Menu { get; set; }
        public int Quantity { get; set; }
    }
}
