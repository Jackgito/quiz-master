import { useState } from "react"; 

import Navbar from '../../components/Navbar';
import LeaderboardsSection from './LeaderboardsSection';

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
