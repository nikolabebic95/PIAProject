namespace RestApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("PhoneNumber")]
    public partial class PhoneNumber
    {
        public int Id { get; set; }

        [Column("PhoneNumber")]
        [Required]
        [StringLength(100)]
        public string PhoneNumber1 { get; set; }

        public int CompanyId { get; set; }

        public virtual Company Company { get; set; }
    }
}
