import { useState } from "react"; 

import Navbar from '../../components/Navbar';
import QuizSelectionSection from './quizSelectionSection';
import HeroSection from "./heroSection";

import './index.css'; 

function Home() {
  const [activeTab, setActiveTab] = useState('home'); 

  return (
    <>
      <Navbar active={activeTab} onSelect={setActiveTab} />
      <HeroSection />
      <QuizSelectionSection />
    </>
  );
}

export default Home;
