using IplWebAPI.Models;
using Npgsql;
using System.Data;

namespace IplWebAPI.DAO
{
    public class IplDAOImpl : IIplDAO
    {
        readonly NpgsqlConnection _connection;
        public IplDAOImpl(NpgsqlConnection connection)
        {
            _connection = connection;
        }

        public async Task<List<MatchDetails>> GetMatchesByDateRange(DateTime startDate, DateTime endDate)
        {
            string? errorMessage = null;
            List<MatchDetails> matchDetailsList = new List<MatchDetails>();

            string query = @"SELECT m.match_id, m.match_date, m.venue, t1.team_name AS Team1Name, t2.team_name AS Team2Name,
                wt.team_name AS WinnerTeamName FROM ipl.matches m
                JOIN ipl.teams t1 ON m.team1_id = t1.team_id
                JOIN ipl.teams t2 ON m.team2_id = t2.team_id
                LEFT JOIN ipl.teams wt ON m.winner_team_id = wt.team_id
                WHERE m.match_date BETWEEN @StartDate AND @EndDate ORDER BY m.match_date;";

            try
            {
                using (_connection)
                {
                    await _connection.OpenAsync();
                    NpgsqlCommand command = new NpgsqlCommand(query, _connection);
                    command.CommandType = CommandType.Text;
                    command.Parameters.AddWithValue("@StartDate", startDate);
                    command.Parameters.AddWithValue("@EndDate", endDate);
                    NpgsqlDataReader reader = await command.ExecuteReaderAsync();
                    if(reader.HasRows)
                    {
                        while (await reader.ReadAsync())
                        {
                            MatchDetails matchDetail = new MatchDetails
                            {
                                MatchId = reader.GetInt32(0),
                                MatchDate = reader.GetDateTime(1),
                                Venue = reader.GetString(2),
                                Team1Name = reader.GetString(3),
                                Team2Name = reader.GetString(4),
                                WinnerTeamName = reader.IsDBNull(5) ? null : reader.GetString(5)
                            };
                            matchDetailsList.Add(matchDetail);
                        }
                    }
                }
            }
            catch (NpgsqlException e)
            {
                errorMessage = e.Message;
                Console.WriteLine("Database exception occurred: " + errorMessage);
            }
            catch (Exception e)
            {
                errorMessage = e.Message;
                Console.WriteLine("An unexpected error occurred: " + errorMessage);
            }
            return matchDetailsList;
        }

        public async Task<List<MatchStatistics>> GetMatchStatistics()
        {
            string? errorMessage = null;
            List<MatchStatistics> matchStatisticsList = new List<MatchStatistics>();

            string query = @"SELECT m.match_date, m.venue, t1.team_name AS Team1Name, t2.team_name AS Team2Name,
                    COALESCE(COUNT(f.engagement_id), 0) AS TotalFanEngagement
                    FROM ipl.matches m
                    INNER JOIN ipl.teams t1 ON m.team1_id = t1.team_id
                    INNER JOIN ipl.teams t2 ON m.team2_id = t2.team_id
                    LEFT JOIN ipl.fan_engagement f ON m.match_id = f.match_id
                    GROUP BY m.match_date, m.venue, t1.team_name, t2.team_name
                    ORDER BY m.match_date;";

            try
            {
                using (_connection)
                {
                    await _connection.OpenAsync();
                    NpgsqlCommand command = new NpgsqlCommand(query, _connection);
                    command.CommandType = CommandType.Text;
                    NpgsqlDataReader reader = await command.ExecuteReaderAsync();
                    if (reader.HasRows)
                    {
                        while (await reader.ReadAsync())
                        {
                            var matchStatistic = new MatchStatistics
                            {
                                MatchDate = reader.GetDateTime(0),
                                Venue = reader.GetString(1),
                                Team1Name = reader.GetString(2),
                                Team2Name = reader.GetString(3),
                                TotalFanEngagement = reader.GetInt32(4)
                            };
                            matchStatisticsList.Add(matchStatistic);
                        }
                    }
                }
            }

            catch (NpgsqlException e)
            {
                errorMessage = e.Message;
                Console.WriteLine("Database exception occurred: " + errorMessage);
            }
            catch (Exception e)
            {
                errorMessage = e.Message;
                Console.WriteLine("An unexpected error occurred: " + errorMessage);
            }

            return matchStatisticsList;
        }

        public async Task<List<TopPlayerStatistics>> GetTopPlayersByFanEngagements()
        {
            string? errorMessage = null;
            List<TopPlayerStatistics> topPlayerStatisticsList = new List<TopPlayerStatistics>();
            string query = @"SELECT p.player_id, p.player_name, p.matches_played,
                    COALESCE(SUM(f.engagement_id), 0) AS TotalFanEngagement
                    FROM ipl.players p
                    INNER JOIN ipl.matches m ON p.team_id = m.team1_id OR p.team_id = m.team2_id
                    LEFT JOIN ipl.fan_engagement f ON m.match_id = f.match_id
                    GROUP BY p.player_id, p.player_name, p.matches_played
                    ORDER BY TotalFanEngagement DESC LIMIT 5";

            try
            {
                using (_connection)
                {
                    await _connection.OpenAsync();
                    NpgsqlCommand command = new NpgsqlCommand(query, _connection);
                    command.CommandType = CommandType.Text;
                    NpgsqlDataReader reader = await command.ExecuteReaderAsync();
                    if(reader.HasRows)
                    {
                        while (await reader.ReadAsync())
                        {
                            var playerStats = new TopPlayerStatistics
                            {
                                PlayerId = reader.GetInt32(0),
                                PlayerName = reader.GetString(1),
                                MatchesPlayed = reader.GetInt32(2),
                                TotalFanEngagement = reader.GetInt32(3)
                            };
                            topPlayerStatisticsList.Add(playerStats);
                        }
                    }
                }
            }
            catch (NpgsqlException e)
            {
                errorMessage = e.Message;
                Console.WriteLine("Database exception occurred: " + errorMessage);
            }
            catch (Exception e)
            {
                errorMessage = e.Message;
                Console.WriteLine("An unexpected error occurred: " + errorMessage);
            }

            return topPlayerStatisticsList;
        }

        public async Task<int> InsertPlayer(PlayerDetails playerDetails)
        {
            int rowsInserted = 0;
            string message = null;

            string insertQuery = @"INSERT INTO ipl.players (player_name, team_id, role, age, matches_played) 
                           VALUES (@playerName, @teamId, @role, @age, @matchesPlayed)";

            try
            {
                using (_connection) 
                {
                    await _connection.OpenAsync();

                    using (var insertCommand = new NpgsqlCommand(insertQuery, _connection))
                    {
                        insertCommand.Parameters.AddWithValue("@playerName", playerDetails.PlayerName);
                        insertCommand.Parameters.AddWithValue("@teamId", playerDetails.TeamId);
                        insertCommand.Parameters.AddWithValue("@role", playerDetails.Role);
                        insertCommand.Parameters.AddWithValue("@age", playerDetails.Age);
                        insertCommand.Parameters.AddWithValue("@matchesPlayed", playerDetails.MatchesPlayed);

                        rowsInserted = await insertCommand.ExecuteNonQueryAsync();
                    }
                }
            }
            catch (NpgsqlException e)
            {
                message = e.Message;
                Console.WriteLine($"An error occurred while inserting player details: {message}");
            }
            catch (Exception e)
            {
                message = e.Message;
                Console.WriteLine($"An unexpected error occurred: {message}");
            }

            return rowsInserted;
        }
    }
}
