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
using System.Web.Http.Cors;
using System.Web;
using Microsoft.AspNet.Identity;

namespace Issue_Tracker_Web_API.Controllers
{

    [Authorize]
    public class TicketsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        private IMapper _Mapper;
        private CommentsController cmController = new CommentsController();
   
        public TicketsController()
        {
        }
        private void ConfigMapper()
        {
            var Config = new MapperConfiguration(c =>
            {
                c.AddProfile<IssueTracker_web_api.App_Start.MapperProfile>();
            });

            _Mapper = Config.CreateMapper();

        }
        // GET: api/Tickets
        public List<TicketDTO> GetTickets()
        {
            ConfigMapper();
            List<Ticket> Entities = db.Tickets
                .Include(t => t.Creador)
                .Include(t => t.Responsable)
                .ToList();

            return _Mapper.Map<List<TicketDTO>>(db.Tickets);
        }

        // GET: api/Tickets/5
        [ResponseType(typeof(TicketDTO))]
        public IHttpActionResult GetTicket(int id)
        {
            ConfigMapper();
            Ticket ticket = db.Tickets
                .Include(t => t.Responsable)
                .Include(t => t.Creador)
                .FirstOrDefault(t => t.Id == id);
            if (ticket == null)
            {
                return NotFound();
            }

            
            return Ok(_Mapper.Map<TicketDTO>(ticket));
        }

        // PUT: api/Tickets/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTicket(int id, TicketDTO ticket)
        {
            ConfigMapper();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ticket.Id)
            {
                return BadRequest("Id Distinto");
            }
            if(ticket == null)
            {
                return BadRequest("Campo Vacio");
            }

            Ticket ticketResult;
            try
            {
                 ticketResult = _Mapper.Map<Ticket>(ticket);
            }
            catch
            {
                return BadRequest("Verifica si los inputs son adecuados");
            }            
            

            ApplicationUser responsable = db
                .Users
                .SingleOrDefault(u => u.UserName.Equals(ticket.Responsable));

            ApplicationUser creador = db
                .Users
                .SingleOrDefault(u => u.UserName.Equals(ticket.Creador));

            bool existResponsable = db.Users.Any(u => u.UserName.Equals(ticket.Responsable));
            bool existCreador = db.Users.Any(u => u.UserName.Equals(ticket.Creador));

            if((!existResponsable) && ticket.Responsable != null)
            {
                return BadRequest("No se encontro ningun UserName valido para el campo [Responsable]");
            }

            if((!existCreador) && ticket.Creador != null)
            {
                return BadRequest("No se encontro ningun UserName valido para el campo [Creador]");
            }
            if (ticket.Creador == null && ticket.Responsable == null)
            {
                ticketResult.Creador = null;
                ticketResult.CreadorId = null;
                ticketResult.Responsable = null;
                ticketResult.ResponsableId = null;

            }

            if (ticket.Responsable == null && ticket.Creador != null)
            {
                ticketResult.Creador = creador;
                ticketResult.CreadorId = creador.Id;
                ticketResult.Responsable = null;
                ticketResult.ResponsableId = null;
            }

            if (ticket.Creador == null && ticket.Responsable != null)
            {
                ticketResult.Creador = null;
                ticketResult.CreadorId = null;
                ticketResult.ResponsableId = responsable.Id;
                ticketResult.Responsable = responsable;
            }

            if(ticket.Creador != null && ticket.Responsable != null)
            {
                ticketResult.Creador = creador;
                ticketResult.CreadorId = creador.Id;
                ticketResult.Responsable = responsable;
                ticketResult.ResponsableId = responsable.Id;

            }
            db.Entry(ticketResult).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest("Error al actualizar los datos de la tarea");
                }
            }
            return Ok(_Mapper.Map<TicketDTO>(ticketResult));
          
        }

        // POST: api/Tickets
        [ResponseType(typeof(TicketDTO))]
        [Authorize]
        public IHttpActionResult PostTicket(TicketDTO ticket)
        {
            ConfigMapper();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Ticket ticketResult;
            try
            {
                ticketResult = _Mapper.Map<Ticket>(ticket);
            }
            catch
            {
                return BadRequest("Verifica si los inputs son validos");
            }
            

            ApplicationUser responsable = db
                .Users
                .SingleOrDefault(u => u.UserName.Equals(ticket.Responsable));

            ApplicationUser creador = db
                .Users
                .SingleOrDefault(u => u.UserName.Equals(ticket.Creador));

            if(responsable == null || creador == null)
            {
                return BadRequest("Usuario asignado o Creador no existe");
            }
            ticketResult.Creador = creador;
            ticketResult.Responsable = responsable;
            ticketResult.ResponsableId = responsable.Id;
            ticketResult.CreadorId = creador.Id;

            db.Tickets.Add(ticketResult);
            db.SaveChanges();

            return Ok(_Mapper.Map<TicketDTO>(ticketResult));
        }

        // DELETE: api/Tickets/5
        [ResponseType(typeof(TicketDTO))]
        public IHttpActionResult DeleteTicket(int id)
        {
            Ticket ticket = db.Tickets.Find(id);
            if (ticket == null)
            {
                return NotFound();
            }

            try
            {
                db.Tickets.Remove(ticket);
                db.SaveChanges();

                return Ok("Borrado con exito");

            }
            catch
            {
                return BadRequest("Error al borrar la tarea, verifica que no sea referenciado en otra tabla, si es así, anula la referencia e intenta de nuevo");
            }


        }

        [Route ("Prioridad")]
        [HttpGet]
        public List<TicketDTO> FiltrarPorPrioridad(string prioridad)
        {
            ConfigMapper();
            List<TicketDTO> tickets = _Mapper.Map<List<TicketDTO>>(db.Tickets.Include(t => t.Creador).Include(t => t.Responsable));
            return tickets.FindAll(t => t.Prioridad.Equals(prioridad));
        }

        [Route("Estado")]
        [HttpGet]
        public List<TicketDTO> FiltrarPorEstado(string estado)
        {
            ConfigMapper();
            List<TicketDTO> tickets = _Mapper.Map<List<TicketDTO>>(db.Tickets.Include(t => t.Creador).Include(t => t.Responsable));
            return tickets.FindAll(t => t.Estado.Equals(estado));
        }

        [Route("User")]
        [HttpGet]
        public IHttpActionResult FiltrarPorUsuario(string usuario)
        {
            if (usuario == null)
            {
                return BadRequest("Obligatorio el UserName");
            }
            ConfigMapper();
            List<TicketDTO> tickets = new List<TicketDTO>();
            foreach (Ticket t in db.Tickets.Include(t => t.Creador).Include(t => t.Responsable))
            {
                if (!(t.Creador == null ||t.Responsable == null))
                {
                    if (t.Creador.UserName.Equals(usuario) || t.Responsable.UserName.Equals(usuario))
                    {
                        tickets.Add(_Mapper.Map<TicketDTO>(t));
                    }
                }
            }

            return Ok(tickets);

        }

        [Route("Fechas")]
        [HttpGet]
        public List<TicketDTO> FiltrarPorFechasCreacion(string fecha1, string fecha2)
        {
            ConfigMapper();
            DateTime FechaInicio = Convert.ToDateTime(fecha1);
            DateTime FechaFin = Convert.ToDateTime(fecha2);
            List<Ticket> Entities;
            if(DateTime.Compare(FechaFin, FechaInicio) > 0 )
            {
                 Entities = db.Tickets
                    .Include(t => t.Creador)
                    .Include(t => t.Responsable)
                    .ToList()
                    .FindAll(
                        t => 0 == DateTime.Compare(FechaInicio, t.FechaCreacion)//Si la fecha de Inicio es igual a la fecha de creacion
                            ||( 0 > DateTime.Compare(FechaInicio, t.FechaCreacion)//Si la Fecha de Inicio esta antes de la Fecha de Creacion Y
                            && 0 < DateTime.Compare(FechaFin, t.FechaCreacion))//Si la fecha Fin esta despues de la fecha de creacion
                            || 0 == DateTime.Compare(FechaInicio, t.FechaCreacion) // Si la fecha fin es igual a la fecha de Creacion
              );
                try
                {
                    return _Mapper.Map<List<TicketDTO>>(Entities);
                }catch
                {
                    return null;
                }
                
            }
            else
            {
                return null;
            }
        }
      


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TicketExists(int id)
        {
            return db.Tickets.Count(e => e.Id == id) > 0;
        }
    }
}