namespace RestApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DonorContract")]
    public partial class DonorContract
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ContractId { get; set; }

        public int EstimatedValue { get; set; }

        [Required]
        [StringLength(4000)]
        public string Description { get; set; }

        public int? Amount { get; set; }

        [Column(TypeName = "date")]
        public DateTime DeliveryDate { get; set; }

        public virtual Contract Contract { get; set; }
    }
}
