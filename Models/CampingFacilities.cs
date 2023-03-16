namespace CampingMap.API.Models
{
    public class CampingFacilities
    {
        public Guid Id { get; set; }

        public Guid CampingId { get; set; }

        public Guid FacilityId { get; set; }

        public string Facility { get; set; }

    }
}
