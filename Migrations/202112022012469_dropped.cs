namespace IssueTracker_web_api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class dropped : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.TicketDTOes");
        }
        
        public override void Down()
        {
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
    }
}
