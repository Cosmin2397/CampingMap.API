namespace CampingMap.API.Models
{
    public class Photo
    {
        public Guid Id { get; set; }

        public string? Name { get; set; }

        public byte[]? Image{ get; set; }

        public Guid CampingId { get; set; }

    }
}
