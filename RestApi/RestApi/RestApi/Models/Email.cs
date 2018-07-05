namespace RestApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Email")]
    public partial class Email
    {
        public int Id { get; set; }

        [Column("Email")]
        [Required]
        [StringLength(100)]
        public string Email1 { get; set; }

        public int CompanyId { get; set; }

        public virtual Company Company { get; set; }
    }
}
