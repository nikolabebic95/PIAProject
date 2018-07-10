using Newtonsoft.Json;

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

        public virtual ContractStatus ContractStatus { get; set; }

        public virtual Package Package { get; set; }

        [JsonIgnore]
        public virtual DonorContract DonorContract { get; set; }

        [JsonIgnore]
        public virtual MoneyContract MoneyContract { get; set; }
    }
}
