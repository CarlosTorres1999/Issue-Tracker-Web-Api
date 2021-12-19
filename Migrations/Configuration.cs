namespace IssueTracker_web_api.Migrations
{
    using Issue_Tracker_Web_API;
    using IssueTracker_web_api.Models;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<IssueTracker_web_api.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(IssueTracker_web_api.Models.ApplicationDbContext context)
        {
            bool existAdmin = null != context.Roles.FirstOrDefault(r => r.Name.Equals("Admin"));
            bool existUser = null != context.Roles.FirstOrDefault(r => r.Name.Equals("User"));
            bool existUserAdministrador = null != context.Users.FirstOrDefault(u => u.Email.Equals("Admin.Admins123@mail.com"));

            if (!existAdmin)
            {
                context.Roles.AddOrUpdate(x => x.Id, 
                    new IdentityRole() {
                        Name = "Admin"
                    }
                );
            }

            if (!existUser)
            {
                context.Roles.AddOrUpdate(x => x.Id,
                    new IdentityRole()
                    {
                        Name = "User"
                    }
                );
            }

            if (!existUserAdministrador)
            {
                UserStore<ApplicationUser> Store = new UserStore<ApplicationUser>(context);
                ApplicationUserManager UserManager = new ApplicationUserManager(Store);
                var user = new ApplicationUser() { 
                   Nombre = "Admin",
                   Apellido = "Adminstrador",
                   Email = "Admin.Admins123@mail.com",
                   UserName = "Admin.Admins123@mail.com",
                   Role = "Admin"
                };
                UserManager.Create(user, "Admin.Administrador123");

                var GetUser = context.Users.FirstOrDefault(u => u.Email.Equals("Admin.Admins123@mail.com"));
                UserManager.AddToRole(GetUser.Id, GetUser.Role);
            }
        }
    }
}
