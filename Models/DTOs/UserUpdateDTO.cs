using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IssueTracker_web_api.Models.DTOs
{
    public class UserUpdateDTO
    {
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Role { get; set; }
    }
}