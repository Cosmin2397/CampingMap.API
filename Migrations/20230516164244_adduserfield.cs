using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampingMap.API.Migrations
{
    public partial class adduserfield : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Campings",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Campings");
        }
    }
}
