import React, { useState, useEffect } from 'react';
import { Modal, Button, Avatar, List, Loader, FlexboxGrid } from 'rsuite';
import useFetchUserData from '../../hooks/useFetchUserData';
import useDeleteUser from '../../hooks/useDeleteUser';
import useUpdateUserProfile from '../../hooks/useUpdateUserProfile';

// Displays user's information, including username, total wins, total score, achievements, and themes.
const ProfileModal = ({ open, onClose }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingPicture, setEditingPicture] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);

  const fetchUserData = useFetchUserData();
  const deleteUser = useDeleteUser();
  const updateUserProfile = useUpdateUserProfile();

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

  const handleDeleteUser = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      const result = await deleteUser(userId);
      if (result.success) {
        onClose();
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userProfilePicturePath");
        window.location.reload();
      }
    }
  };

  const handleUpdateProfilePicture = async () => {
    if (!selectedPicture) return;

    const result = await updateUserProfile(userId, { profilePicture: selectedPicture });
    if (result.success) {
      setUser((prevUser) => ({ ...prevUser, profilePicture: selectedPicture }));
      sessionStorage.setItem('userProfilePicturePath', selectedPicture);
      setEditingPicture(false);
    }
  };

  const profilePicturePath = user ? `/profilePictures/${user.profilePicture}` : '/profilePictures/girl.png';

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
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ position: 'relative', width: 'fit-content' }}>
                <Avatar size="lg" src={profilePicturePath} />
                <Button
                  style={{
                    position: 'absolute',
                    bottom: '-10px',
                    right: '-10px',
                    padding: '5px',
                  }}
                  size="xs"
                  onClick={() => setEditingPicture(!editingPicture)}
                >
                  {editingPicture ? 'Cancel' : 'Edit'}
                </Button>
              </div>
              <div style={{ marginLeft: '20px' }}>
                <h4>{user.username || 'N/A'}</h4>
                <p>Total Wins: {user.totalWins !== undefined ? user.totalWins : 'N/A'}</p>
                <p>Total Score: {user.totalScore !== undefined ? user.totalScore : 'N/A'}</p>
              </div>
            </div>
            {editingPicture && (
              <div>
                <h5>Choose a Profile Picture</h5>
                <FlexboxGrid justify="start" align="middle" style={{ marginBottom: '20px' }}>
                  {["girl.png", "boy.png", "default.png", "einstein.png"].map((picture) => (
                    <FlexboxGrid.Item key={picture} style={{ margin: '10px' }}>
                      <Avatar
                        size="lg"
                        src={`/profilePictures/${picture}`}
                        style={{
                          border: selectedPicture === picture ? '2px solid blue' : 'none',
                          cursor: 'pointer',
                        }}
                        onClick={() => setSelectedPicture(picture)}
                      />
                    </FlexboxGrid.Item>
                  ))}
                </FlexboxGrid>
                <Button onClick={handleUpdateProfilePicture} appearance="primary">
                  Save
                </Button>
              </div>
            )}
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
        <Button onClick={handleDeleteUser} appearance="primary" className='redBtn'>
          Delete User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;
