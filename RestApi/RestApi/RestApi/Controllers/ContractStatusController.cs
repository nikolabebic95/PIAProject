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
    public class ContractStatusController : ApiController
    {
        private Model1 db = new Model1();

        // GET: api/ContractStatus
        public IQueryable<ContractStatus> GetContractStatuses()
        {
            return db.ContractStatuses;
        }

        // GET: api/ContractStatus/5
        [ResponseType(typeof(ContractStatus))]
        public IHttpActionResult GetContractStatus(int id)
        {
            ContractStatus contractStatus = db.ContractStatuses.Find(id);
            if (contractStatus == null)
            {
                return NotFound();
            }

            return Ok(contractStatus);
        }

        // PUT: api/ContractStatus/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutContractStatus(int id, ContractStatus contractStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != contractStatus.Id)
            {
                return BadRequest();
            }

            db.Entry(contractStatus).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContractStatusExists(id))
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

        // POST: api/ContractStatus
        [ResponseType(typeof(ContractStatus))]
        public IHttpActionResult PostContractStatus(ContractStatus contractStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ContractStatuses.Add(contractStatus);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = contractStatus.Id }, contractStatus);
        }

        // DELETE: api/ContractStatus/5
        [ResponseType(typeof(ContractStatus))]
        public IHttpActionResult DeleteContractStatus(int id)
        {
            ContractStatus contractStatus = db.ContractStatuses.Find(id);
            if (contractStatus == null)
            {
                return NotFound();
            }

            db.ContractStatuses.Remove(contractStatus);
            db.SaveChanges();

            return Ok(contractStatus);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ContractStatusExists(int id)
        {
            return db.ContractStatuses.Count(e => e.Id == id) > 0;
        }
    }
}