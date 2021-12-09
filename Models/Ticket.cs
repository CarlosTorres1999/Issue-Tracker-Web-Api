using IssueTracker_web_api.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Issue_Tracker_Web_API.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public string Titulo {get; set; }
        public string Descripcion { get; set; }
        
        public string ResponsableId { get; set; }
        public DateTime FechaCreacion{ get; set; }
        public DateTime FechaFin { get; set; }
        public string Prioridad { get; set; }
        public string Estado { get; set; }
        
        public string CreadorId { get; set; }

        [ForeignKey("ResponsableId")]
        public ApplicationUser Responsable { get; set; }

        [ForeignKey("CreadorId")]
        public ApplicationUser Creador { get; set; }
    }
}