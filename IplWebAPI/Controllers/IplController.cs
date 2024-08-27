using IplWebAPI.DAO;
using IplWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

namespace IplWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IplController : ControllerBase
    {
        private readonly IIplDAO _iplDAO;

        public IplController(IIplDAO iplDAO) => _iplDAO = iplDAO;

        [HttpGet("matchbyrange")]
        public async Task<IActionResult> GetMatchesByDateRange([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var matches = await _iplDAO.GetMatchesByDateRange(startDate, endDate);
            if (matches == null)
            {
                return NotFound();
            }
            return Ok(matches);
        }

        [HttpGet("matchstatistic")]
        public async Task<ActionResult<List<MatchStatistics>>> GetMatchStatistics()
        {
            List<MatchStatistics> matchStatistic = await _iplDAO.GetMatchStatistics();
            if (matchStatistic == null)
            {
                return NotFound();
            }
            return Ok(matchStatistic);
        }

        [HttpGet("topplayer")]
        public async Task<ActionResult<List<TopPlayerStatistics>>> GetTopPlayerByFanEngagement()
        {
            List<TopPlayerStatistics> topPlayerStatistic = await _iplDAO.GetTopPlayersByFanEngagements();
            if (topPlayerStatistic == null)
            {
                return NotFound();
            }
            return Ok(topPlayerStatistic);
        }

        [HttpPost("insertplayer", Name = "InsertPlayer")]
        public async Task<ActionResult<int>> InsertPlayer(PlayerDetails playerDetails)
        {
            if (playerDetails != null)
            {
                int res = await _iplDAO.InsertPlayer(playerDetails);
                if (res > 0)
                {
                    return CreatedAtRoute(nameof(InsertPlayer), new { id = playerDetails.PlayerId}, playerDetails);
                }
                return BadRequest("Failed to add product");
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
