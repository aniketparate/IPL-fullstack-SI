import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatchByRange } from '../redux/actions/apiActions';

const IplMatchDetails = () => {
  const dispatch = useDispatch();
  const { matchDetails, loading, error } = useSelector((state) => state.apiData);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFetchData = () => {
    if (!startDate || !endDate) {
      alert('Both start date and end date are required.');
      return;
    }
    dispatch(fetchMatchByRange('matchbyrange' ,startDate, endDate));
  };

  return <>
    <div>
      <h1>Match Details</h1>
      <div>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button onClick={handleFetchData}>Fetch Data</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {matchDetails.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Match ID</th>
              <th>Match Date</th>
              <th>Venue</th>
              <th>Team 1</th>
              <th>Team 2</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            {matchDetails.map((match) => (
              <tr key={match.matchId}>
                <td>{match.matchId}</td>
                <td>{new Date(match.matchDate).toLocaleDateString()}</td>
                <td>{match.venue}</td>
                <td>{match.team1Name}</td>
                <td>{match.team2Name}</td>
                <td>{match.winnerTeamName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {matchDetails.length === 0 && !loading && !error && (
        <p>No matches found for the selected date range.</p>
      )}
    </div>
  </>
}

export default IplMatchDetails
