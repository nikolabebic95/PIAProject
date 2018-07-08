using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RestApi.Data
{
    public class DataModel
    {
        public string Type { get; set; }

        public int Id { get; set; }

        public byte[] Data { get; set; }
    }
}
