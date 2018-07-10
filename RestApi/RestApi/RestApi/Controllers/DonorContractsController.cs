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
    public class DonorContractsController : ApiController
    {
        private Model1 db = new Model1();

        // GET: api/DonorContracts
        public IQueryable<DonorContract> GetDonorContracts()
        {
            return db.DonorContracts;
        }

        // GET: api/DonorContracts/5
        [ResponseType(typeof(DonorContract))]
        public IHttpActionResult GetDonorContract(int id)
        {
            DonorContract donorContract = db.DonorContracts.Find(id);
            if (donorContract == null)
            {
                return NotFound();
            }

            return Ok(donorContract);
        }

        // PUT: api/DonorContracts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDonorContract(int id, DonorContract donorContract)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != donorContract.ContractId)
            {
                return BadRequest();
            }

            db.Entry(donorContract).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DonorContractExists(id))
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

        // POST: api/DonorContracts
        [ResponseType(typeof(DonorContract))]
        public IHttpActionResult PostDonorContract(DonorContract donorContract)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.DonorContracts.Add(donorContract);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (DonorContractExists(donorContract.ContractId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = donorContract.ContractId }, donorContract);
        }

        // DELETE: api/DonorContracts/5
        [ResponseType(typeof(DonorContract))]
        public IHttpActionResult DeleteDonorContract(int id)
        {
            DonorContract donorContract = db.DonorContracts.Find(id);
            if (donorContract == null)
            {
                return NotFound();
            }

            db.DonorContracts.Remove(donorContract);
            db.SaveChanges();

            return Ok(donorContract);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DonorContractExists(int id)
        {
            return db.DonorContracts.Count(e => e.ContractId == id) > 0;
        }
    }
}