namespace RestApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Contract")]
    public partial class Contract
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        public int CompanyId { get; set; }

        public int PackageId { get; set; }

        [Column(TypeName = "date")]
        public DateTime StartDate { get; set; }

        [Column(TypeName = "date")]
        public DateTime EndDate { get; set; }

        public int StatusId { get; set; }

        [StringLength(1000)]
        public string Comment { get; set; }

        public bool? IsActive { get; set; }

        public virtual Company Company { get; set; }

        public virtual ContractStatu ContractStatu { get; set; }

        public virtual Package Package { get; set; }

        public virtual DonorContract DonorContract { get; set; }

        public virtual MoneyContract MoneyContract { get; set; }
    }
}
