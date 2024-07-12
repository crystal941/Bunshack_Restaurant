using Bunshack_Restaurant.Server.Data.Context;
using Bunshack_Restaurant.Server.Models;
using Bunshack_Restaurant.Server.Repositories.Abstract;
using Bunshack_Restaurant.Server.Repositories.Concrete;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Bunshack_Restaurant.Server.Controllers
{
    [Route("api/OrdersController")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMenuRepository _menuRepository;
        private readonly ApplicationDbContext _context;

        public OrdersController(IOrderRepository orderRepository, IMenuRepository menuRepository, ApplicationDbContext context)
        {
            _orderRepository = orderRepository;
            _menuRepository = menuRepository;
            _context = context;
        }

        [HttpGet("admin"), Authorize]
        public ActionResult<List<Order>> GetAllOrders()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Assuming you have the user's ID
                var user = _context.Users.FirstOrDefault(u => u.Id == userId);
                if (user != null)
                {
                    bool isAdmin = user.IsAdmin;
                    if (!isAdmin)
                    {
                        return Unauthorized(new { message = "You have no permission to view this page." });
                    }
                    var orders = _orderRepository.GetAllOrders().ToList();
                    return Ok(orders);
                }
                return Unauthorized(new { message = "User is not logged in." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to retrieve orders.", error = ex.Message });
            }
        }

        [HttpGet("user"), Authorize]
        public ActionResult<List<Order>> GetUserOrders()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null)
                {
                    return Unauthorized(new { message = "User is not logged in." });
                }
                var orders = _orderRepository.GetOrdersByUserId(userId).ToList();
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to retrieve orders.", error = ex.Message });
            }
        }

        [HttpGet("{id}"), Authorize]
        public ActionResult<Order> GetOrderById(Guid id)
        {
            try
            {
                var order = _orderRepository.GetOrderById(id);
                if (order == null)
                {
                    return NotFound(new { message = $"Order with ID {id} not found." });
                }
                return Ok(order);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to retrieve order.", error = ex.Message });
            }
        }

        [HttpPut("{id}"), Authorize]
        public ActionResult<Order> ModifyOrder(Guid id, Order order)
        {
            try
            {
                order.Id = id;
                var updatedOrder = _orderRepository.ModifyOrder(order);
                if (updatedOrder == null)
                {
                    return NotFound(new { message = $"Order with ID {id} not found." });
                }
                return Ok(updatedOrder);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to update order.", error = ex.Message });
            }
        }

        [HttpPost, Authorize]
        public ActionResult<Order> PlaceOrder(Order order)
        {
            try
            {
                if (order.OrderMenus == null || !order.OrderMenus.Any())
                {
                    return BadRequest(new { message = "Order must contain at least one menu item." });
                }

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = _context.Users.FirstOrDefault(u => u.Id == userId);
                if (user == null)
                {
                    return Unauthorized(new { message = "User is not logged in." });
                }

                order.Id = Guid.NewGuid();
                order.UserId = userId;
                order.User = user;
                order.CustomerName = user.Name;
                order.OrderDate = DateTime.UtcNow;
                
                decimal totalPrice = 0;
                foreach (var orderMenu in order.OrderMenus)
                {
                    var menu = _menuRepository.GetMenuById(orderMenu.MenuId);
                    if (menu == null)
                    {
                        return BadRequest(new { message = $"Menu item with ID {orderMenu.MenuId} not found." });
                    }
                    totalPrice += orderMenu.Quantity * menu.Price;
                    orderMenu.OrderId = order.Id;
                    orderMenu.MenuId = menu.Id;
                }
                order.TotalPrice = totalPrice;
               
                var newOrder = _orderRepository.PlaceOrder(order);
                return CreatedAtAction(nameof(GetOrderById), new { id = newOrder.Id }, newOrder);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to place order.", error = ex.Message });
            }
        }

        [HttpDelete("{id}"), Authorize]
        public ActionResult<Order> CancelOrder(Guid id)
        {
            try
            {
                var order = _orderRepository.CancelOrder(id);
                if (order == null)
                {
                    return NotFound(new { message = $"Order with ID {id} not found." });
                }
                return Ok(order);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to cancel order.", error = ex.Message });
            }
        }

        [HttpGet("{orderId}/menus"), Authorize]
        public ActionResult<List<OrderMenu>> GetOrderMenusByOrderId(Guid orderId)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = _context.Users.FirstOrDefault(u => u.Id == userId);
                if (user != null)
                {
                    var orderMenus = _orderRepository.GetOrderMenusByOrderId(orderId);
                    return Ok(orderMenus);
                }
                return Unauthorized(new { message = "User is not logged in." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to retrieve menus.", error = ex.Message });
            }
        }

    }
}
