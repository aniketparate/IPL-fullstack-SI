namespace IplWebAPI.Models
{
    public class TopPlayerStatistics
    {
        public int PlayerId { get; set; }
        public string? PlayerName { get; set; }
        public int MatchesPlayed { get; set; }
        public int TotalFanEngagement { get; set; }
    }
}
