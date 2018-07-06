using Newtonsoft.Json;

namespace RestApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Announcement")]
    public partial class Announcement
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [JsonIgnore]
        public int CompanyId { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        [StringLength(1000)]
        public string Description { get; set; }

        public bool IsInternship { get; set; }

        public bool IsJob { get; set; }

        public DateTime InputDateTime { get; set; }

        public byte[] Attachment { get; set; }

        [Column(TypeName = "date")]
        public DateTime Deadline { get; set; }

        public virtual Company Company { get; set; }
    }
}
