using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using IssueTracker_web_api.Models;
using Issue_Tracker_Web_API.Models;
using AutoMapper;
using Issue_Tracker_Web_API.Models.DTOs;

namespace Issue_Tracker_Web_API.Controllers
{
    [Authorize]
    public class CommentsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        private IMapper _Mapper;

        private void ConfigMapper()
        {
            var Config = new MapperConfiguration(c =>
            {
                c.AddProfile<IssueTracker_web_api.App_Start.MapperProfile>();
            });

            _Mapper = Config.CreateMapper();

        }

        // GET: api/Comments
        public List<CommentDTO> GetComments()
        {
            ConfigMapper();
            List<Comment> Entities = db.Comments
                .Include(c => c.Ticket)
                .Include(c => c.UsuarioComment)
                .ToList();

            return _Mapper.Map<List<CommentDTO>>(Entities);
        }


        // GET: api/Comments/5
        [ResponseType(typeof(CommentDTO))]
        public IHttpActionResult GetComment(int id)
        {
            ConfigMapper();
            Comment comment = db.Comments
                .Include(c => c.Ticket)
                .Include(c => c.UsuarioComment)
                .FirstOrDefault(c => c.Id == id);
            if (comment == null)
            {
                return NotFound();
            }

            return Ok(_Mapper.Map<CommentDTO>(comment));
        }

        // PUT: api/Comments/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutComment(int id, CommentDTO comment)
        {
            ConfigMapper();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != comment.Id)
            {
                return BadRequest();
            }
            if(comment == null)
            {
                return BadRequest();
            }

            Comment CommentEntity = _Mapper.Map<Comment>(comment);
            ApplicationUser User = db.Users
                .FirstOrDefault(u => u.UserName.Equals(comment.UsuarioUserName));
            Ticket Ticket = db.Tickets
                .FirstOrDefault(t => t.Id == comment.TicketId);

            bool existUser = db.Users.Any(u => u.UserName.Equals(comment.UsuarioUserName));
            bool existTicket = db.Tickets.Any(t => t.Id == comment.TicketId);

            if (CommentEntity == null)
            {
                return BadRequest("El Comentario no es valido");
            }
              
            if((!existUser) && comment.UsuarioUserName != null)
            {
                return BadRequest("El Usuario No es Valido");
            }

            if((!existTicket) && comment.TicketId != -1)
            {
                return BadRequest("El Ticket no es valido");
            }

            if(comment.UsuarioUserName == null && comment.TicketId != -1)
            {
                CommentEntity.UsuarioComment = null;
                CommentEntity.UsuarioIdComment = null;
                CommentEntity.Ticket = Ticket;
                CommentEntity.TicketId = Ticket.Id;
                
            }
            if (comment.TicketId == -1 && comment.UsuarioUserName != null)
            {
                CommentEntity.UsuarioComment = User;
                CommentEntity.UsuarioIdComment = User.Id;
                CommentEntity.Ticket = null;
             
              
            }
            if(comment.TicketId == -1 && comment.UsuarioUserName == null)
            {
                CommentEntity.UsuarioComment = null;
                CommentEntity.UsuarioIdComment = null;
                CommentEntity.Ticket = null;
                
            }
            if(comment.TicketId != -1 && comment.UsuarioUserName != null)
            {
                CommentEntity.UsuarioComment = User;
                CommentEntity.UsuarioIdComment = User.Id;
                CommentEntity.Ticket = Ticket;
                CommentEntity.TicketId = Ticket.Id;
            }

            db.Entry(CommentEntity).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest("Error al actualizar los comentarios");
                }
            }

            return Ok(_Mapper.Map<CommentDTO>(comment));


        }

        // POST: api/Comments
        [ResponseType(typeof(CommentDTO))]
        public IHttpActionResult PostComment(CommentDTO comment)
        {
            ConfigMapper();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Comment CommentEntity = _Mapper.Map<Comment>(comment);
            ApplicationUser User = db.Users
                .FirstOrDefault(u => u.UserName.Equals(comment.UsuarioUserName));
            Ticket TicketEntity = db.Tickets
                .FirstOrDefault(t => t.Id == comment.TicketId);

            if(User == null)
            {
                return BadRequest("Usuario no encontrado");

            }

            if(TicketEntity == null)
            {
                return BadRequest("Ticket no encontrado");
            }
            CommentEntity.UsuarioComment = User;
            CommentEntity.UsuarioIdComment = User.Id;
            CommentEntity.TicketId = TicketEntity.Id;
            CommentEntity.Ticket = TicketEntity;
            db.Comments.Add(CommentEntity);
            db.SaveChanges();

            return Ok(_Mapper.Map<CommentDTO>(CommentEntity));
        }

        // DELETE: api/Comments/5
        [ResponseType(typeof(CommentDTO))]
        public IHttpActionResult DeleteComment(int id)
        {
            ConfigMapper();
            Comment comment = db.Comments.Find(id);
            if (comment == null)
            {
                return NotFound();
            }

            db.Comments.Remove(comment);
            db.SaveChanges();

            return Ok("Actualizado con exito");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CommentExists(int id)
        {
            return db.Comments.Count(e => e.Id == id) > 0;
        }
    }
}