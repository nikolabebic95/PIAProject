using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using RestApi.Models;

namespace RestApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CompaniesController : ApiController
    {
        private Model1 db = new Model1();

        private const int RESULTS_ON_PAGE = 20;

        // GET: api/Companies
        public IQueryable<Company> GetCompanies(string packageName = "", string companyName = "", int page = 0)
        {
            if (packageName == "")
            {
                return db.Companies.Where(company => companyName == "" || company.Name.ToLower().Contains(companyName.ToLower()))
                    .OrderBy(company => company.Name.ToLower()).Skip(page * RESULTS_ON_PAGE).Take(RESULTS_ON_PAGE);
            }

            return db.Contracts.Where(contract => contract.Package.Name.ToLower().Contains(packageName.ToLower()))
                .Select(contract => contract.Company).Where(company => companyName == "" || company.Name.ToLower().Contains(companyName.ToLower()))
                .OrderBy(company => company.Name.ToLower()).Skip(page * RESULTS_ON_PAGE).Take(RESULTS_ON_PAGE);
        }

        // GET: api/Companies/5
        [ResponseType(typeof(Company))]
        public IHttpActionResult GetCompany(int id)
        {
            Company company = db.Companies.Find(id);
            if (company == null)
            {
                return NotFound();
            }

            return Ok(company);
        }

        // PUT: api/Companies/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCompany(int id, Company company)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != company.Id)
            {
                return BadRequest();
            }

            db.Entry(company).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id))
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

        // POST: api/Companies
        [ResponseType(typeof(Company))]
        public IHttpActionResult PostCompany(Company company)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Companies.Add(company);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = company.Id }, company);
        }

        // DELETE: api/Companies/5
        [ResponseType(typeof(Company))]
        public IHttpActionResult DeleteCompany(int id)
        {
            Company company = db.Companies.Find(id);
            if (company == null)
            {
                return NotFound();
            }

            db.Companies.Remove(company);
            db.SaveChanges();

            return Ok(company);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CompanyExists(int id)
        {
            return db.Companies.Count(e => e.Id == id) > 0;
        }
    }
}