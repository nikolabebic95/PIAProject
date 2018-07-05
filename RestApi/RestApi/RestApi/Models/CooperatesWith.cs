namespace RestApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("CooperatesWith")]
    public partial class CooperatesWith
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        public int UserTableId { get; set; }

        public int CompanyId { get; set; }

        public virtual Company Company { get; set; }

        public virtual UserTable UserTable { get; set; }
    }
}
