import React, { useState, useEffect } from 'react';
import { Modal, Button, Avatar, List, Loader } from 'rsuite';
import useFetchUserData from '../../hooks/useFetchUserData';

// Displays user's information, including username, total wins, total score, achievements, and themes.
const ProfileModal = ({ open, onClose }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchUserData = useFetchUserData();
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Ensure loading state resets on each call
      const result = await fetchUserData(userId);
      if (result.success) {
        setUser(result.data);
      }
      setLoading(false);
    };

    if (userId) fetchUser();
  }, [userId]);

  let profilePicturePath = '/profilePictures/default.png';
  if (user) {
    profilePicturePath = `/profilePictures/${user.profilePicture}` || '/profilePictures/default.png';
  }

  return (
    <Modal size="lg" open={open} onClose={onClose} backdrop={true}>
      <Modal.Header>
        <Modal.Title>Player Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <Loader center content="Loading..." />
        ) : user ? (
          <div style={{ margin: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <Avatar size="lg" src={profilePicturePath} />
              <div style={{ marginLeft: '20px' }}>
                <h4>{user.username || 'N/A'}</h4>
                <p>Total Wins: {user.totalWins !== undefined ? user.totalWins : 'N/A'}</p>
                <p>Total Score: {user.totalScore !== undefined ? user.totalScore : 'N/A'}</p>
              </div>
            </div>
            <h5>Achievements</h5>
            <List bordered>
              {user.achievements && user.achievements.length > 0 ? (
                user.achievements.map((achievement, index) => (
                  <List.Item key={index}>
                    {achievement.icon} {achievement.name} - {achievement.dateEarned ? new Date(achievement.dateEarned).toLocaleDateString() : 'N/A'}
                  </List.Item>
                ))
              ) : (
                <List.Item>No achievements available</List.Item>
              )}
            </List>
            <h5>Themes</h5>
            <List bordered>
              {user.themes && user.themes.length > 0 ? (
                user.themes.map((theme, index) => (
                  <List.Item key={index}>
                    <strong>{theme.theme || 'N/A'}</strong>: Rank - {theme.rank || 'N/A'}, Score - {theme.currentScore !== undefined ? theme.currentScore : 'N/A'}
                  </List.Item>
                ))
              ) : (
                <List.Item>No themes available</List.Item>
              )}
            </List>
          </div>
        ) : (
          <List.Item>No user data available</List.Item>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} appearance="subtle">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;
