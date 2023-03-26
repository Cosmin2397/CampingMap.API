using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampingMap.API.Migrations
{
    public partial class updateRating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Campings_CampingId",
                table: "Ratings");

            migrationBuilder.DropIndex(
                name: "IX_Ratings_CampingId",
                table: "Ratings");

            migrationBuilder.AddColumn<double>(
                name: "Rating",
                table: "Campings",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Campings");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_CampingId",
                table: "Ratings",
                column: "CampingId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Campings_CampingId",
                table: "Ratings",
                column: "CampingId",
                principalTable: "Campings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
