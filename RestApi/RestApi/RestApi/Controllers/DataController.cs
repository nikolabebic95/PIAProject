using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Http.Cors;
using RestApi.Data;
using RestApi.Models;

namespace RestApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DataController : ApiController
    {
        private Model1 db = new Model1();

        private static void SaveToFile(byte[] data, string path)
        {
            path = HostingEnvironment.MapPath(path);

            if (path == null) return;
            using (var stream = File.OpenWrite(path))
            {
                stream.Write(data, 0, data.Length);
            }
        }

        // GET: api/Data
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Data/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Data
        public void Post([FromBody]DataModel data)
        {
            if (data.Type == "company")
            {
                var company = db.Companies.Find(data.Id);
                if (company != null)
                {
                    SaveToFile(data.Data, $"/App_Data/Companies/{data.Id}-{company.Logo}");
                }
            }
        }

        // PUT: api/Data/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Data/5
        public void Delete(int id)
        {
        }
    }
}
