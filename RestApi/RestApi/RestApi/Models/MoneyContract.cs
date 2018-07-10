namespace RestApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("MoneyContract")]
    public partial class MoneyContract
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ContractId { get; set; }

        public int Value { get; set; }

        public bool IsBillSent { get; set; }

        [Column(TypeName = "date")]
        public DateTime? PaymentDate { get; set; }

        public virtual Contract Contract { get; set; }
    }
}
