using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using RestApi.Models;
using RestApi.Util;

namespace RestApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserTablesController : ApiController
    {
        private Model1 db = new Model1();

        // GET: api/UserTables
        public IQueryable<UserTable> GetUserTables()
        {
            return db.UserTables;
        }

        // GET: api/UserTables/5
        [ResponseType(typeof(UserTable))]
        public IHttpActionResult GetUserTable(int id)
        {
            UserTable userTable = db.UserTables.Find(id);
            if (userTable == null)
            {
                return NotFound();
            }

            return Ok(userTable);
        }

        // PUT: api/UserTables/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUserTable(int id, UserTable userTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userTable.Id)
            {
                return BadRequest();
            }

            db.Entry(userTable).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserTableExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/UserTables
        [ResponseType(typeof(UserTable))]
        public IHttpActionResult PostUserTable(UserTable userTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (db.UserTables.Any(user => user.Username == userTable.Username))
            {
                return BadRequest("Username already exists");
            }

            userTable.PasswordHash = ShaUtil.ComputeSha256Hash(userTable.PasswordHash);
            userTable.Type = "n";

            db.UserTables.Add(userTable);
            db.SaveChanges();

            userTable.PasswordHash = "";

            return CreatedAtRoute("DefaultApi", new { id = userTable.Id }, userTable);
        }

        // DELETE: api/UserTables/5
        [ResponseType(typeof(UserTable))]
        public IHttpActionResult DeleteUserTable(int id)
        {
            UserTable userTable = db.UserTables.Find(id);
            if (userTable == null)
            {
                return NotFound();
            }

            db.UserTables.Remove(userTable);
            db.SaveChanges();

            return Ok(userTable);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserTableExists(int id)
        {
            return db.UserTables.Count(e => e.Id == id) > 0;
        }
    }
}