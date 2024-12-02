import { useState } from "react"; 

import Navbar from '../../components/Navbar';
import QuizSelectionSection from './quizSelectionSection';
import HeroSection from "./heroSection";

import './index.css'; 

function Home() {

  return (
    <>
      <Navbar active={"home"}/>
      <HeroSection />
      <QuizSelectionSection />
    </>
  );
}

export default Home;
