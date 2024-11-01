import React from 'react';
import useFetchLeaderboards from '../../hooks/useFetchLeaderboards';

const LeaderboardsSection = () => {
  const { leaderboards, loading, error } = useFetchLeaderboards("Science", "allTime");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading leaderboards</p>;

  return (
    <div className="leaderboards-section">
      <h1>Leaderboards</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player ID</th>
            <th>Score</th>
            <th>Timestamp</th>
            <th>Period</th>
          </tr>
        </thead>
        <tbody>
          {leaderboards.map((entry, index) => (
            <tr key={index}>
              <td>{entry.rank}</td>
              <td>{entry.playerId}</td>
              <td>{entry.score}</td>
              <td>{new Date(entry.timestamp).toLocaleString()}</td>
              <td>{entry.period}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardsSection;