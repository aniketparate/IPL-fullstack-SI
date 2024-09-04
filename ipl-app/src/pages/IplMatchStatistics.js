import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMatchDetails } from '../redux/actions/apiActions';

const IplMatchStatistics = () => {
  const dispatch = useDispatch();
  const { matchStatistics, loading, error } = useSelector((state) => state.apiData)

  useEffect(() => {
    dispatch(fetchMatchDetails('matchstatistic'));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <>
    <div>
      <h1>Match Statistics</h1>
      <table>
        <thead>
          <tr>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>Venue</th>
            <th>Match Date</th>
            <th>Total Fan Engagement</th>
          </tr>
        </thead>
        <tbody>
          {matchStatistics.map((match, index) => (
            <tr key={index}>
              <td>{match.team1Name}</td>
              <td>{match.team2Name}</td>
              <td>{match.venue}</td>
              <td>{new Date(match.matchDate).toLocaleDateString()}</td>
              <td>{match.totalFanEngagement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
}

export default IplMatchStatistics
