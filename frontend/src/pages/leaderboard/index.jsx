import { useState } from "react"; 

import Navbar from '../../components/Navbar';
import LeaderboardsSection from './LeaderboardsSection';

import './index.css'; 

function Home() {
  const [activeTab, setActiveTab] = useState('leaderboards'); 

  return (
    <>
      <Navbar active={activeTab} onSelect={setActiveTab} />
      <LeaderboardsSection />
    </>
  );
}

export default Home;
