using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampingMap.API.Migrations
{
    public partial class deleteFacilityField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CampingFacilities_Facilities_FacilityId",
                table: "CampingFacilities");

            migrationBuilder.DropIndex(
                name: "IX_CampingFacilities_FacilityId",
                table: "CampingFacilities");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_CampingFacilities_FacilityId",
                table: "CampingFacilities",
                column: "FacilityId");

            migrationBuilder.AddForeignKey(
                name: "FK_CampingFacilities_Facilities_FacilityId",
                table: "CampingFacilities",
                column: "FacilityId",
                principalTable: "Facilities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
