import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer } from '../redux/actions/apiActions';

const IplAddPlayers = () => {
  const dispatch = useDispatch();
  const { successMessage, error, loading } = useSelector((state) => state.apiData);

  const [playerName, setPlayerName] = useState('');
  const [teamId, setTeamId] = useState('');
  const [role, setRole] = useState('');
  const [age, setAge] = useState('');
  const [matchesPlayed, setMatchesPlayed] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({ type: 'ADD_PLAYER_REQUEST' });

    if (!playerName || !teamId || !role || !age || !matchesPlayed) {
      dispatch({ type: 'ADD_PLAYER_FAILURE', payload: 'All fields are required.' });
      return;
    }

    const playerData = {
      playerId: 0,
      playerName,
      teamId: parseInt(teamId, 10),
      role,
      age: parseInt(age, 10),
      matchesPlayed: parseInt(matchesPlayed, 10),
    };

    dispatch(addPlayer('insertplayer', playerData));
  };

  return <>
    <div>
      <h1>Add Players</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Player Name:
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Team ID:
            <input
              type="number"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Role:
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Matches Played:
            <input
              type="number"
              value={matchesPlayed}
              onChange={(e) => setMatchesPlayed(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>Add Player</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
    </div>
  </>
}

export default IplAddPlayers
