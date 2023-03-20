using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace react_assessment_management_api.Models
{
    public class Beer
    {
        [Key]
        [DisplayName("ID")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [DisplayName("Name")]
        [StringLength(100)]
        public string? Name { get; set; }

        [Range(0, 100)]
        public float Content { get; set; }

        [Range(0, 9999999)]
        public float Price { get; set; }


        [ForeignKey(name: "BreweryId")]
        public int BreweryId { get; set; }

        public Brewery? Brewery { get; set; }

        public ICollection<Stock>? Stocks { get; set; }
        public ICollection<Order>? Orders { get; set; }

    }
}
