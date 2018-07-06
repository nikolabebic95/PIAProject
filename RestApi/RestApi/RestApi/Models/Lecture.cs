using Newtonsoft.Json;

namespace RestApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Lecture")]
    public partial class Lecture
    {
        public int Id { get; set; }

        [JsonIgnore]
        public int CompanyId { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [StringLength(100)]
        public string TitleEnglish { get; set; }

        [Required]
        [StringLength(1000)]
        public string Description { get; set; }

        [StringLength(1000)]
        public string DescriptionEnglish { get; set; }

        public DateTime DateTime { get; set; }

        [Required]
        [StringLength(100)]
        public string Room { get; set; }

        [Required]
        [StringLength(100)]
        public string LecturerName { get; set; }

        [StringLength(1000)]
        public string LecturerBio { get; set; }

        public byte[] Attachment { get; set; }

        [Column(TypeName = "image")]
        public byte[] Image { get; set; }

        public virtual Company Company { get; set; }
    }
}
