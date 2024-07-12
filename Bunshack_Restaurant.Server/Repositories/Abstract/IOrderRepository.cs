using Bunshack_Restaurant.Server.Models;

namespace Bunshack_Restaurant.Server.Repositories.Abstract
{
    public interface IOrderRepository
    {
        Order PlaceOrder(Order order);
        List<Order> GetAllOrders();
        Order GetOrderById(Guid orderId);
        Order ModifyOrder(Order order);
        Order CancelOrder(Guid orderId);
        List<Order> GetOrdersByUserId(string userId);
        public List<OrderMenu> GetOrderMenusByOrderId(Guid orderId);
    }
}
