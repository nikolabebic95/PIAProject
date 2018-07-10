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
    public class MoneyContractsController : ApiController
    {
        private Model1 db = new Model1();

        // GET: api/MoneyContracts
        public IQueryable<MoneyContract> GetMoneyContracts()
        {
            return db.MoneyContracts;
        }

        // GET: api/MoneyContracts/5
        [ResponseType(typeof(MoneyContract))]
        public IHttpActionResult GetMoneyContract(int id)
        {
            MoneyContract moneyContract = db.MoneyContracts.Find(id);
            if (moneyContract == null)
            {
                return NotFound();
            }

            return Ok(moneyContract);
        }

        // PUT: api/MoneyContracts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMoneyContract(int id, MoneyContract moneyContract)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != moneyContract.ContractId)
            {
                return BadRequest();
            }

            db.Entry(moneyContract).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MoneyContractExists(id))
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

        // POST: api/MoneyContracts
        [ResponseType(typeof(MoneyContract))]
        public IHttpActionResult PostMoneyContract(MoneyContract moneyContract)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.MoneyContracts.Add(moneyContract);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (MoneyContractExists(moneyContract.ContractId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = moneyContract.ContractId }, moneyContract);
        }

        // DELETE: api/MoneyContracts/5
        [ResponseType(typeof(MoneyContract))]
        public IHttpActionResult DeleteMoneyContract(int id)
        {
            MoneyContract moneyContract = db.MoneyContracts.Find(id);
            if (moneyContract == null)
            {
                return NotFound();
            }

            db.MoneyContracts.Remove(moneyContract);
            db.SaveChanges();

            return Ok(moneyContract);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MoneyContractExists(int id)
        {
            return db.MoneyContracts.Count(e => e.ContractId == id) > 0;
        }
    }
}