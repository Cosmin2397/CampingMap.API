namespace CampingMap.API.Models
{
    public class Location
    {
        public Guid Id { get; set; }

        public string Region { get; set; }

        public string County { get; set; }

        public string City { get; set; }

        public string Adress { get; set; }

        public decimal Longitude { get; set; }

        public decimal Latitude { get; set; }

        public Guid CampingId { get; set; }
    }
}
