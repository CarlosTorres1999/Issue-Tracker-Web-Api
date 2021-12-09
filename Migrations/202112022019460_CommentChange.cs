namespace IssueTracker_web_api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CommentChange : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.Comentarios", newName: "Comments");
            AddColumn("dbo.Comments", "Comentario", c => c.String());
            DropColumn("dbo.Comments", "Comentario_");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Comments", "Comentario_", c => c.String());
            DropColumn("dbo.Comments", "Comentario");
            RenameTable(name: "dbo.Comments", newName: "Comentarios");
        }
    }
}
