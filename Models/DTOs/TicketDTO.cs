using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Issue_Tracker_Web_API.Models.DTOs
{
    public class TicketDTO
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public string Responsable { get; set; }
        public string FechaCreacion { get; set; }
        public string FechaFin { get; set; }
        public string Prioridad { get; set; }
        public string Estado { get; set; }
        public string Creador { get; set; }
    }
}