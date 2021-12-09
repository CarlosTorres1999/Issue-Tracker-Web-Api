namespace IssueTracker_web_api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Tickets : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Tickets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Titulo = c.String(),
                        Descripcion = c.String(),
                        ResponsableId = c.Int(nullable: false),
                        FechaCreacion = c.DateTime(nullable: false),
                        FechaFin = c.DateTime(nullable: false),
                        Prioridad = c.String(),
                        Estado = c.String(),
                        Creador_Id = c.String(maxLength: 128),
                        Responsable_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.Creador_Id, cascadeDelete: false)
                .ForeignKey("dbo.AspNetUsers", t => t.Responsable_Id, cascadeDelete: false)
                .Index(t => t.Creador_Id)
                .Index(t => t.Responsable_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Tickets", "Responsable_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Tickets", "Creador_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Tickets", new[] { "Responsable_Id" });
            DropIndex("dbo.Tickets", new[] { "Creador_Id" });
            DropTable("dbo.Tickets");
        }
    }
}
