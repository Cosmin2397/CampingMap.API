using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CampingMap.API.Migrations
{
    public partial class addimagefile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Photos_CampingId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "Photos");

            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "Photos",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Photos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Photos_CampingId",
                table: "Photos",
                column: "CampingId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Photos_CampingId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Photos");

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Photos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_CampingId",
                table: "Photos",
                column: "CampingId");
        }
    }
}
