using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using RestApi.Models;

namespace RestApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DeclineController : ApiController
    {
        Model1 db = new Model1();

        // POST: api/Decline
        public void Post([FromBody]int id)
        {
            var user = db.UserTables.Find(id);
            if (user == null || user.Type != "n") return;

            db.UserTables.Remove(user);
            db.SaveChanges();
        }
    }
}
