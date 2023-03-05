namespace CampingMap.API.Models
{
    public class Photo
    {
        public Guid Id { get; set; }

        public string Url { get; set; }

        public Guid CampingId { get; set; }

    }
}
