namespace IplWebAPI.Models
{
    public class MatchDetails
    {
        public int MatchId { get; set; }
        public DateTime MatchDate { get; set; }
        public string? Venue { get; set; }
        public string? Team1Name { get; set; }
        public string? Team2Name { get; set; }
        public string? WinnerTeamName { get; set; }
    }
}
