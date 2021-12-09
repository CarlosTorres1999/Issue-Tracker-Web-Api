namespace IssueTracker_web_api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Comment : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Comentarios",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Comentario_ = c.String(),
                        FechaComentario = c.DateTime(nullable: false),
                        TicketId = c.Int(nullable: false),
                        UsuarioIdComment = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Tickets", t => t.TicketId, cascadeDelete: false)
                .ForeignKey("dbo.AspNetUsers", t => t.UsuarioIdComment, cascadeDelete: false)
                .Index(t => t.TicketId)
                .Index(t => t.UsuarioIdComment);
            
            CreateTable(
                "dbo.TicketDTOes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Titulo = c.String(),
                        Descripcion = c.String(),
                        Responsable = c.String(),
                        FechaCreacion = c.String(),
                        FechaFin = c.String(),
                        Prioridad = c.String(),
                        Estado = c.String(),
                        Creador = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Comentarios", "UsuarioIdComment", "dbo.AspNetUsers");
            DropForeignKey("dbo.Comentarios", "TicketId", "dbo.Tickets");
            DropIndex("dbo.Comentarios", new[] { "UsuarioIdComment" });
            DropIndex("dbo.Comentarios", new[] { "TicketId" });
            DropTable("dbo.TicketDTOes");
            DropTable("dbo.Comentarios");
        }
    }
}
