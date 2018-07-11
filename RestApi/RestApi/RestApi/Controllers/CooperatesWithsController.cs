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

namespace RestApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CooperatesWithsController : ApiController
    {
        private Model1 db = new Model1();

        // GET: api/CooperatesWiths
        public IQueryable<CooperatesWith> GetCooperatesWiths()
        {
            return db.CooperatesWiths;
        }

        // GET: api/CooperatesWiths/5
        [ResponseType(typeof(CooperatesWith))]
        public IHttpActionResult GetCooperatesWith(int id)
        {
            CooperatesWith cooperatesWith = db.CooperatesWiths.Find(id);
            if (cooperatesWith == null)
            {
                return NotFound();
            }

            return Ok(cooperatesWith);
        }

        // PUT: api/CooperatesWiths/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCooperatesWith(int id, CooperatesWith cooperatesWith)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cooperatesWith.Id)
            {
                return BadRequest();
            }

            db.Entry(cooperatesWith).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CooperatesWithExists(id))
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

        // POST: api/CooperatesWiths
        [ResponseType(typeof(CooperatesWith))]
        public IHttpActionResult PostCooperatesWith(CooperatesWith cooperatesWith)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CooperatesWiths.Add(cooperatesWith);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = cooperatesWith.Id }, cooperatesWith);
        }

        // DELETE: api/CooperatesWiths/5
        [ResponseType(typeof(CooperatesWith))]
        public IHttpActionResult DeleteCooperatesWith(int id)
        {
            CooperatesWith cooperatesWith = db.CooperatesWiths.Find(id);
            if (cooperatesWith == null)
            {
                return NotFound();
            }

            db.CooperatesWiths.Remove(cooperatesWith);
            db.SaveChanges();

            return Ok(cooperatesWith);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CooperatesWithExists(int id)
        {
            return db.CooperatesWiths.Count(e => e.Id == id) > 0;
        }
    }
}