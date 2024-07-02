using Bunshack_Restaurant.Server.Models;
using Bunshack_Restaurant.Server.Repositories.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bunshack_Restaurant.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        public OrdersController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        // GET: api/Orders
        [HttpGet]
        public ActionResult<List<Order>> GetAllOrders()
        {
            return Ok(_orderRepository.GetAllOrders());
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public ActionResult<Order> GetOrderById(Guid id)
        {
            try
            {
                var order = _orderRepository.GetOrderById(id);
                return Ok(order);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public ActionResult<Order> ModifyOrder(Guid id, Order order)
        {
            try
            {
                order.Id = id;
                var orderUpdate = _orderRepository.ModifyOrder(order);
                return Ok(orderUpdate);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/Menus
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public ActionResult<Order> PlaceOrder(Order order)
        {
            return Ok(_orderRepository.PlaceOrder(order));
        }

        // DELETE: api/Menus/5
        [HttpDelete("{id}")]
        public ActionResult<Order> CancelOrder(Guid id)
        {
            try
            {
                var order = _orderRepository.CancelOrder(id);
                return Ok(order);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
