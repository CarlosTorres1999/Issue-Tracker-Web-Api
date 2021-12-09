namespace IssueTracker_web_api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Nullable : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Comments", "TicketId", "dbo.Tickets");
            DropIndex("dbo.Comments", new[] { "TicketId" });
            AlterColumn("dbo.Comments", "TicketId", c => c.Int());
            CreateIndex("dbo.Comments", "TicketId");
            AddForeignKey("dbo.Comments", "TicketId", "dbo.Tickets", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Comments", "TicketId", "dbo.Tickets");
            DropIndex("dbo.Comments", new[] { "TicketId" });
            AlterColumn("dbo.Comments", "TicketId", c => c.Int(nullable: false));
            CreateIndex("dbo.Comments", "TicketId");
            AddForeignKey("dbo.Comments", "TicketId", "dbo.Tickets", "Id", cascadeDelete: true);
        }
    }
}
