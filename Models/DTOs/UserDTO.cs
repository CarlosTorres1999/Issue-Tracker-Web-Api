using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IssueTracker_web_api.Models.DTOs
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}