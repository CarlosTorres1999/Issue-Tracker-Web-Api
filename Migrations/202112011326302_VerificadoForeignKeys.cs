namespace IssueTracker_web_api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class VerificadoForeignKeys : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Tickets", new[] { "Creador_Id" });
            DropIndex("dbo.Tickets", new[] { "Responsable_Id" });
            DropColumn("dbo.Tickets", "CreadorID");
            DropColumn("dbo.Tickets", "ResponsableId");
            RenameColumn(table: "dbo.Tickets", name: "Creador_Id", newName: "CreadorId");
            RenameColumn(table: "dbo.Tickets", name: "Responsable_Id", newName: "ResponsableId");
            AlterColumn("dbo.Tickets", "ResponsableId", c => c.String(maxLength: 128));
            AlterColumn("dbo.Tickets", "CreadorId", c => c.String(maxLength: 128));
            CreateIndex("dbo.Tickets", "ResponsableId");
            CreateIndex("dbo.Tickets", "CreadorId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Tickets", new[] { "CreadorId" });
            DropIndex("dbo.Tickets", new[] { "ResponsableId" });
            AlterColumn("dbo.Tickets", "CreadorId", c => c.Int(nullable: false));
            AlterColumn("dbo.Tickets", "ResponsableId", c => c.Int(nullable: false));
            RenameColumn(table: "dbo.Tickets", name: "ResponsableId", newName: "Responsable_Id");
            RenameColumn(table: "dbo.Tickets", name: "CreadorId", newName: "Creador_Id");
            AddColumn("dbo.Tickets", "ResponsableId", c => c.Int(nullable: false));
            AddColumn("dbo.Tickets", "CreadorID", c => c.Int(nullable: false));
            CreateIndex("dbo.Tickets", "Responsable_Id");
            CreateIndex("dbo.Tickets", "Creador_Id");
        }
    }
}
