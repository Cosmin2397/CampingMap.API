namespace CampingMap.API.Models
{
    public class Review
    {
        public Guid Id { get; set; }

        public double Rating { get; set; }

        public string Description { get; set; }

        public Guid CampingId { get; set; }

        public string UserId { get; set; }
    }
}
