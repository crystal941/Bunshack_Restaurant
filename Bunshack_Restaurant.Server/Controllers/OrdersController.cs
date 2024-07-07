using Bunshack_Restaurant.Server.Models;
using Bunshack_Restaurant.Server.Repositories.Abstract;
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

        public OrdersController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet("admin"), Authorize]
        public ActionResult<List<Order>> GetAllOrders()
        {
            try
            {
                var isAdmin = User.Claims.FirstOrDefault(c => c.Type == "isAdmin")?.Value == "true";
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var orders = new List<Order>();
                if (userId != null && !isAdmin)
                {

                    orders = _orderRepository.GetOrdersByUserId(userId).ToList();
                    return Ok(orders);
                }

                orders = _orderRepository.GetAllOrders().ToList();
                return Ok(orders);
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
    }
}
