using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampingMap.API.Migrations
{
    public partial class deleteFacilities : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CampingFacilities");

            migrationBuilder.DropTable(
                name: "Facilities");

            migrationBuilder.AddColumn<string>(
                name: "Facilities",
                table: "Campings",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Facilities",
                table: "Campings");

            migrationBuilder.CreateTable(
                name: "CampingFacilities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CampingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Facility = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FacilityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CampingFacilities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CampingFacilities_Campings_CampingId",
                        column: x => x.CampingId,
                        principalTable: "Campings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Facilities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Facilities", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CampingFacilities_CampingId",
                table: "CampingFacilities",
                column: "CampingId");
        }
    }
}
