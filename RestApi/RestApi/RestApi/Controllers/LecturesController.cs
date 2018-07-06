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
    public class LecturesController : ApiController
    {
        private Model1 db = new Model1();

        // GET: api/Lectures
        public IQueryable<Lecture> GetLectures([FromUri] string time = null, int limit = 0)
        {
            if (limit == 0) limit = int.MaxValue;

            switch (time)
            {
                case "future":
                    return db.Lectures.Where(entry => entry.DateTime > DateTime.Now)
                        .OrderBy(entry => entry.DateTime).Take(limit);
                case "past":
                    return db.Lectures.Where(entry => entry.DateTime < DateTime.Now)
                        .OrderByDescending(entry => entry.DateTime).Take(limit);
                default:
                    return db.Lectures.OrderBy(entry => entry.DateTime).Take(limit);
            }
        }

        // GET: api/Lectures/5
        [ResponseType(typeof(Lecture))]
        public IHttpActionResult GetLecture(int id)
        {
            Lecture lecture = db.Lectures.Find(id);
            if (lecture == null)
            {
                return NotFound();
            }

            return Ok(lecture);
        }

        // PUT: api/Lectures/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLecture(int id, Lecture lecture)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != lecture.Id)
            {
                return BadRequest();
            }

            db.Entry(lecture).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LectureExists(id))
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

        // POST: api/Lectures
        [ResponseType(typeof(Lecture))]
        public IHttpActionResult PostLecture(Lecture lecture)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Lectures.Add(lecture);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = lecture.Id }, lecture);
        }

        // DELETE: api/Lectures/5
        [ResponseType(typeof(Lecture))]
        public IHttpActionResult DeleteLecture(int id)
        {
            Lecture lecture = db.Lectures.Find(id);
            if (lecture == null)
            {
                return NotFound();
            }

            db.Lectures.Remove(lecture);
            db.SaveChanges();

            return Ok(lecture);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LectureExists(int id)
        {
            return db.Lectures.Count(e => e.Id == id) > 0;
        }
    }
}