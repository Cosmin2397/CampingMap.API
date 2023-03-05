namespace CampingMap.API.Models
{
    public class Rating
    {
        public Guid Id { get; set; }

        public double Score { get; set; }

        public Guid CampingId { get; set; }
    }
}
