using Bunshack_Restaurant.Server.Data.Context;
using Bunshack_Restaurant.Server.Models;
using Bunshack_Restaurant.Server.Repositories.Abstract;
using Microsoft.EntityFrameworkCore;

namespace Bunshack_Restaurant.Server.Repositories.Concrete
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _context;
        public OrderRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public Order PlaceOrder(Order order)
        {
            try
            {
                var existingOrder = _context.Orders.FirstOrDefault(o => o.Id == order.Id);
                if (existingOrder != null)
                {
                    throw new Exception("Order already exists!");
                }

                var user = _context.Users.FirstOrDefault(u => u.Id == order.UserId);
                if (user == null)
                {
                    throw new Exception("User does not exist!");
                }

                foreach (var orderMenu in order.OrderMenus)
                {
                    var menu = _context.Menus.FirstOrDefault(m => m.Id == orderMenu.MenuId);
                    if (menu == null)
                    {
                        throw new Exception($"Menu item with ID {orderMenu.MenuId} does not exist!");
                    }
                    orderMenu.Order = order;
                }
                _context.Orders.Add(order);
                _context.SaveChanges();
                return order;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while placing the order: {ex.Message}");
            }
        }
        public List<Order> GetAllOrders()
        {
            var orders = _context.Orders.Include(o => o.OrderMenus).ToList();
            return orders;
        }

        public Order GetOrderById(Guid orderId)
        {
            try
            {
                var order = _context.Orders.Include(o => o.OrderMenus).FirstOrDefault(o => o.Id == orderId);
                if (order == null)
                {
                    throw new Exception("Order not found!");
                }
                return order;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred: {ex.Message}");
            }
        }

        public Order ModifyOrder(Order order)
        {
            try
            {
                var orderToUpdate = _context.Orders.Include(o => o.OrderMenus).FirstOrDefault(o => o.Id == order.Id);

                if (orderToUpdate == null)
                {
                    throw new Exception("Order not found!");
                }

                orderToUpdate.CustomerName = order.CustomerName;
                orderToUpdate.OrderDate = order.OrderDate;
                orderToUpdate.UserId = order.UserId;
                orderToUpdate.OrderMenus = order.OrderMenus;

                _context.SaveChanges();

                return orderToUpdate;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred: {ex.Message}");
            }
        }

        public Order CancelOrder(Guid orderId)
        {
            try
            {
                var order = _context.Orders.FirstOrDefault(o => o.Id == orderId);

                if (order == null)
                {
                    throw new Exception("Order not found!");
                }

                _context.Orders.Remove(order);
                _context.SaveChanges();

                return order;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred: {ex.Message}");
            }
        }

        public List<Order> GetOrdersByUserId(string userId)
        {
            try
            {
                var orders = _context.Orders
                                     .Where(o => o.UserId == userId)
                                     .Include(o => o.OrderMenus)
                                     .ThenInclude(om => om.Menu)
                                     .ToList();
                return orders;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred: {ex.Message}");
            }
        }

    }
}
