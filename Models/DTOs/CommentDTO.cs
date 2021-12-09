using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Issue_Tracker_Web_API.Models.DTOs
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public string Comentario { get; set; }
        public int TicketId { get; set; }
        public string UsuarioUserName { get; set; }
        public string Fecha { get; set; }

    }
}