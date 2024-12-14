import Navbar from '../../components/Navbar';
import LeaderboardsSection from './leaderboardsSection';

import './index.css'; 

function Home() {

  return (
    <>
      <Navbar active={"leaderBoards"}/>
      <LeaderboardsSection />
    </>
  );
}

export default Home;
