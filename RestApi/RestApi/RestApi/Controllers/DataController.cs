using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
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
            File.WriteAllBytes(path, data);
        }

        private static byte[] ReadFromFile(string path)
        {
            path = HostingEnvironment.MapPath(path);
            if (path == null) return null;

            return File.ReadAllBytes(path);
        }

        // GET: api/Data
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Data/5
        public byte[] Get(int id, string type = "")
        {
            if (type == "company")
            {
                var company = db.Companies.Find(id);
                return company == null ? null : ReadFromFile($"/App_Data/Companies/{id}-{company.Logo}");
            }

            return null;
        }

        // POST: api/Data
        public void Post([FromBody]DataModel data)
        {
            switch (data.Type)
            {
                case "company":
                    var company = db.Companies.Find(data.Id);
                    if (company != null)
                    {
                        SaveToFile(data.Data, $"/App_Data/Companies/{data.Id}-{company.Logo}");
                    }

                    break;
                case "announcement":
                    var announcement = db.Announcements.Find(data.Id);
                    if (announcement != null)
                    {
                        SaveToFile(data.Data, $"/App_Data/Announcements/{data.Id}-{announcement.Attachment}");
                    }

                    break;
                case "user":
                    var user = db.UserTables.Find(data.Id);
                    if (user != null)
                    {
                        SaveToFile(data.Data, $"/App_Data/Users/{data.Id}-{user.ProfilePicture}");
                    }

                    break;
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
