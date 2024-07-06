using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bunshack_Restaurant.Server.Models
{
    public class User : IdentityUser
    {
        [MaxLength(50)]
        public string? Name { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        [Column(TypeName = "datetime")]
        public DateTime ModifiedDate { get; set; } = DateTime.Now;
        [Column(TypeName = "datetime")]
        public DateTime LastLogin { get; set; } = DateTime.Now;
        public bool IsAdmin { get; set; } = false;
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
