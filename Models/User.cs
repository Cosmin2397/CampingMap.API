﻿namespace CampingMap.API.Models
{
    public class User
    {
        public int UserId { get; set; }

        public string? UserName { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }

        public DateTime? CreatedDate { get; set; }

    }
}