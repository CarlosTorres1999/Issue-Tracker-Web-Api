using Issue_Tracker_Web_API.Models.DTOs;
using IssueTracker_web_api.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Issue_Tracker_Web_API.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Comentario { get; set; }
        public DateTime FechaComentario { get; set; }
        public int? TicketId { get; set; }
        public string UsuarioIdComment { get; set; }

        [ForeignKey("UsuarioIdComment")]
        public ApplicationUser UsuarioComment { get; set; }

        [ForeignKey("TicketId")]
        public Ticket Ticket { get; set; }
    }
}