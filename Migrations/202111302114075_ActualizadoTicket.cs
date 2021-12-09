namespace IssueTracker_web_api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ActualizadoTicket : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tickets", "CreadorID", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Tickets", "CreadorID");
        }
    }
}
