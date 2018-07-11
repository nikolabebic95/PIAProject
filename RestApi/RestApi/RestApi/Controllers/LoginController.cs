using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using RestApi.Data;
using RestApi.Models;
using RestApi.Util;

namespace RestApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        private Model1 db = new Model1();

        // POST: api/Login
        [ResponseType(typeof(UserTable))]
        public IHttpActionResult Post([FromBody]LoginRequest request)
        {
            var pass = ShaUtil.ComputeSha256Hash(request.Password);
            var user = db.UserTables.SingleOrDefault(u => u.Username == request.Username && u.PasswordHash == pass);
            if (user == null)
            {
                return BadRequest("Wrong username or password");
            }

            if (user.Type == "n")
            {
                return BadRequest("User is not approved yet");
            }

            user.PasswordHash = "";
            return Ok(user);
        }
    }
}
