import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopPlayers } from '../redux/actions/apiActions';

const IplTopPlayers = () => {
  const dispatch = useDispatch();
  const { topPlayers, loading, error } = useSelector((state) => state.apiData);

  useEffect(() => {
    dispatch(fetchTopPlayers('topplayer'));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <>
    <div>
      <h1>Top Players</h1>
      <table>
        <thead>
          <tr>
            <th>Player ID</th>
            <th>Player Name</th>
            <th>Matches Played</th>
            <th>Total Fan Engagement</th>
          </tr>
        </thead>
        <tbody>
          {topPlayers.map((player) => (
            <tr key={player.playerId}>
              <td>{player.playerId}</td>
              <td>{player.playerName}</td>
              <td>{player.matchesPlayed}</td>
              <td>{player.totalFanEngagement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
}

export default IplTopPlayers