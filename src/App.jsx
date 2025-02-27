import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

import './App.css';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Accueil from './components/Accueil';
import Quiz from './components/quiz/Quiz';
import Contact from './components/Contact';

import Earth from './components/solarSystem/Earth';
import Moon from './components/solarSystem/Moon';
import Mars from './components/solarSystem/Mars';
import Saturn from './components/solarSystem/Saturn';
import Mercury from './components/solarSystem/Mercury';
import Venus from './components/solarSystem/Venus';
import Jupiter from './components/solarSystem/Jupiter';
import Neptune from './components/solarSystem/Neptune';
import Uranus from './components/solarSystem/Uranus';
import Sun from './components/solarSystem/Sun';

import AOS from 'aos';


// Initialisation
AOS.init();

export default function App() {
  console.log(`

 ▀█████████▄  ▄█   ▄█        ▄█       ▄██   ▄            ███        ▄█    █▄     ▄██████▄    ▄▄▄▄███▄▄▄▄    ▄██████▄  ███▄▄▄▄       ███     
  ███    ███ ███  ███       ███       ███   ██▄      ▀█████████▄   ███    ███   ███    ███ ▄██▀▀▀███▀▀▀██▄ ███    ███ ███▀▀▀██▄ ▀█████████▄ 
  ███    ███ ███▌ ███       ███       ███▄▄▄███         ▀███▀▀██   ███    ███   ███    ███ ███   ███   ███ ███    ███ ███   ███    ▀███▀▀██ 
 ▄███▄▄▄██▀  ███▌ ███       ███       ▀▀▀▀▀▀███          ███   ▀  ▄███▄▄▄▄███▄▄ ███    ███ ███   ███   ███ ███    ███ ███   ███     ███   ▀ 
▀▀███▀▀▀██▄  ███▌ ███       ███       ▄██   ███          ███     ▀▀███▀▀▀▀███▀  ███    ███ ███   ███   ███ ███    ███ ███   ███     ███     
  ███    ██▄ ███  ███       ███       ███   ███          ███       ███    ███   ███    ███ ███   ███   ███ ███    ███ ███   ███     ███     
  ███    ███ ███  ███▌    ▄ ███▌    ▄ ███   ███          ███       ███    ███   ███    ███ ███   ███   ███ ███    ███ ███   ███     ███     
▄█████████▀  █▀   █████▄▄██ █████▄▄██  ▀█████▀          ▄████▀     ███    █▀     ▀██████▀   ▀█   ███   █▀   ▀██████▀   ▀█   █▀     ▄████▀   
                  ▀         ▀                                                                                                                                                                                                                            
  `)

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/earth" element={<Earth />} />
        <Route path="/moon" element={<Moon />} />
        <Route path="/mars" element={<Mars />} />
        <Route path="/saturn" element={<Saturn />} />     
        <Route path="/mercury" element={<Mercury />} />   
        <Route path="/venus" element={<Venus />} /> 
        <Route path="/jupiter" element={<Jupiter />} />     
        <Route path="/neptune" element={<Neptune />} />     
        <Route path="/uranus" element={<Uranus />} />   
        <Route path="/sun" element={<Sun />} /> 
        <Route path="/quiz" element={<Quiz />} />  
        <Route path="/contact" element={<Contact />} />  
      </Routes>

    </Router>
    </>
  );
}