namespace IplWebAPI.Models
{
    public class MatchStatistics
    {
        public string? Team1Name { get; set; }
        public string? Team2Name { get; set; }
        public string? Venue { get; set; }
        public DateTime MatchDate { get; set; }
        public int TotalFanEngagement { get; set; }
    }
}
