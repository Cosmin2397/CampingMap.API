using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampingMap.API.Migrations
{
    public partial class updateimagevalue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Campings_CampingId",
                table: "Photos");

            migrationBuilder.DropIndex(
                name: "IX_Photos_CampingId",
                table: "Photos");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Photos_CampingId",
                table: "Photos",
                column: "CampingId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Campings_CampingId",
                table: "Photos",
                column: "CampingId",
                principalTable: "Campings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
