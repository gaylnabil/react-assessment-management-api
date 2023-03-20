using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace react_assessment_management_api.Models
{
    public class Stock
    {
        [Key]
        [DisplayName("Id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [DisplayName("Quantity")]
        [Range(0, 9999999)]
        public int Quantity { get; set; }

        [ForeignKey(name: "BeerId")]
        public int BeerId { get; set; }
        public Beer? Beer { get; set; }

        [ForeignKey(name: "WholesalerId")]
        public int WholesalerId { get; set; }

        public Wholesaler? Wholesaler { get; set; }
    }
}
