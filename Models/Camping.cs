using CampingMap.API.Data;
using Microsoft.AspNetCore.Components.Routing;

namespace CampingMap.API.Models
{
    public class Camping
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string PhoneNumber { get; set; }

        public string OpeningHours { get; set; }

        public double Price { get; set; }

        public Rating Rating { get; set; }

        public Review[] Reviews { get; set; }

        public Photo[] Photos { get; set; }

        public CampingType Type { get; set; }

        public Location Location { get; set; }

        public CampingFacilities[] Facilities { get; set; }


    }
}
