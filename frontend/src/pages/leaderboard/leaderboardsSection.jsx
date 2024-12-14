import { useState } from 'react';
import { SelectPicker } from 'rsuite';
import useFetchLeaderboards from '../../hooks/useFetchLeaderboards';
import quizCategories from '../../data/quizCategories.json';

// Displays player scores in a table for selected theme and period
const LeaderboardsSection = () => {
  const [period, setPeriod] = useState("allTime");
  const [theme, setTheme] = useState("Science");
  const { leaderboards, loading, error } = useFetchLeaderboards(theme, period);

  const periodOptions = [
    { label: 'All time', value: 'allTime' },
    { label: 'Daily', value: 'daily' },
    { label: 'Monthly', value: 'monthly' }
  ];

  const themeOptions = quizCategories.map(category => ({
    label: category.title,
    value: category.title
  }));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading leaderboards</p>;

  const currentUsername = JSON.parse(sessionStorage.getItem('username'));

  return (
    <div className="leaderboards-section">
      <h1>Leaderboards</h1>
      <div className="filters">
        <SelectPicker
          data={themeOptions}
          value={theme}
          onChange={setTheme}
          placeholder="Select Theme"
          style={{ width: 224, marginRight: 10 }}
          searchable={false}
        />
        <SelectPicker
          data={periodOptions}
          value={period}
          onChange={setPeriod}
          placeholder="Select Period"
          style={{ width: 224 }}
          searchable={false}
        />
      </div>
      
      {leaderboards.length === 0 ? (
        <p>No scores found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Placement</th>
              <th>Username</th>
              <th>Score</th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            {leaderboards.map((entry, index) => (
              // Change row color if the entry belongs to the current user:
              <tr key={index} className={entry.userInfo.username === currentUsername ? 'highlight-current-user' : ''}>
                <td>{entry.placement}</td>
                <td>{entry.userInfo.username}</td>
                <td>{entry.score}</td>
                <td>{entry.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaderboardsSection;