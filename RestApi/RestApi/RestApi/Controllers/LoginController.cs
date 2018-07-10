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

namespace RestApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        private Model1 db = new Model1();

        // POST: api/Login
        [ResponseType(typeof(LoginInfo))]
        public IHttpActionResult Post([FromBody]LoginRequest request)
        {
            if (request.Username == "nikola")
            {
                var ret = new LoginInfo { Type = "a" };
                return Ok(ret);
            }

            return NotFound();
        }

    }
}
