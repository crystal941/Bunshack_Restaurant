using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bunshack_Restaurant.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTableConstraints : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderMenus_Menus_MenuId",
                table: "OrderMenus");

            migrationBuilder.DropIndex(
                name: "IX_OrderMenus_MenuId",
                table: "OrderMenus");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_OrderMenus_MenuId",
                table: "OrderMenus",
                column: "MenuId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderMenus_Menus_MenuId",
                table: "OrderMenus",
                column: "MenuId",
                principalTable: "Menus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
