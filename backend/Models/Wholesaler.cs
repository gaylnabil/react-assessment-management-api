using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace react_assessment_management_api.Models
{
    public class Wholesaler
    {
        [Key]
        [DisplayName("Id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [DisplayName("Name")]
        [StringLength(100)]
        public string? Name { get; set; }

        public ICollection<Stock>? Stocks { get; set; }
        public ICollection<Order>? Orders { get; set; }

    }
}
