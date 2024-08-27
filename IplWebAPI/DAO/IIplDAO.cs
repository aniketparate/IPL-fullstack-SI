using IplWebAPI.Models;

namespace IplWebAPI.DAO
{
    public interface IIplDAO
    {
        Task<int> InsertPlayer(PlayerDetails playerDetails);

        Task<List<MatchStatistics>> GetMatchStatistics();

        Task<List<TopPlayerStatistics>> GetTopPlayersByFanEngagements();

        Task<List<MatchDetails>> GetMatchesByDateRange(DateTime startDate, DateTime endDate);

    }
}
