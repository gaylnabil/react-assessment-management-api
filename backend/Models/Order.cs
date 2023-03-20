using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace react_assessment_management_api.Models
{
    public class Order
    {
        [Key]
        [DisplayName("Id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(100)]
        public string ClientName { get; set; }

        [Required]
        [DisplayName("Quantity")]
        [Range(0, 9999999)]
        public int Quantity { get; set; }

        [Range(0, 100)]
        public int Discount { get; set; } = 0;

        [Range(0, 9999999)]
        public float TotalPrice { get; set; } = 0;

        [ForeignKey(name: "BeerId")]
        public int BeerId { get; set; }

        public Beer? Beer { get; set; }

        [ForeignKey(name: "WholesalerId")]
        public int WholesalerId { get; set; }

        public Wholesaler? Wholesaler { get; set; }
    }
}
