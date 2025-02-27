import React, { useState, useEffect } from 'react';
import EarthModel from '../models/EarthModel';
import GalaxyBackground from '../backgrounds/GalaxyBackground';
import Countdown from "react-countdown";

export default function Earth() {

  const [currentTime, setCurrentTime] = useState(new Date());
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setNow(new Date());
    }, 60000); // mise à jour toutes les minutes

    return () => clearInterval(interval); // nettoyage à la désinscription du composant
  }, []);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

    // Calcul du temps restant avant le prochain changement
    let targetTime;
    if (hours < 6) {
      targetTime = new Date(now);
      targetTime.setHours(6, 0, 0, 0);
    } else if (hours < 18) {
      targetTime = new Date(now);
      targetTime.setHours(18, 0, 0, 0);
    } else {
      targetTime = new Date(now);
      targetTime.setDate(now.getDate() + 1);
      targetTime.setHours(6, 0, 0, 0);
    }
  
    const renderer = ({ hours: countdownHours, minutes: countdownMinutes, seconds }) => {
      if (now.getHours() < 6 || now.getHours() >= 18) {
        return <p className='text-center font-Orbitron text-[#00d0e3] my-8 w-1/5 max-[1152px]:w-full'><span className='bg-[#00d0e3] text-[#1c3b49] px-2'>map de nuit</span><br /><span className='text-xs'>Temps restant</span><br /> {countdownHours}h {countdownMinutes}m {seconds}s</p>;
      } else {
        return <p className='text-center font-Orbitron text-[#00d0e3] my-8 w-1/5 max-[1152px]:w-full'><span className='bg-[#00d0e3] text-[#1c3b49] px-2'>map de jour</span><br /><span className='text-xs'>Temps restant</span><br /> {countdownHours}h {countdownMinutes}m {seconds}s</p>;
      }
    };

  return (
    <>
    <section className='relative flex flex-col justify-center min-h-[70vh] mt-10'>
      <div className='flex flex-row flex-wrap text-[#00d0e3] items-center align-center overflow-hidden'>

          <div className='flex flex-col w-4/5 max-[1152px]:w-full relative'>

            <div className='p-10 pb-0 description'>
              <h1 className='gradiantAnimator text-4xl mb-2 text-[#1c3b49] glow-effect p-4'>La terre</h1>
              <div>

                <p className='font-bold text-[#00d0e3] ml-4 mt-8'>Taille (diamètre)</p>
                <p className='ml-4'>12 742 km </p>
            
                <p className='ml-4 my-2'></p>
                <p className=' w-1/4 mb-4'></p>

                <p className='font-bold text-[#00d0e3] ml-4 mt-4'>Température</p>
                <p className='ml-4 mb-2'>Entre -89,2 et 56,7 °C</p>

                <p className='font-bold text-[#00d0e3] ml-4 mt-4'>Longueur de l'année (période orbitale)</p>
                <p className='ml-4 mb-6'>365,26 jours</p>

                <div className='flex flex-row flex-wrap description2 backdrop-blur-sm'>
                  <div className='text-center font-Orbitron text-[#00d0e3] text-sm my-8 pt-1 w-1/5 max-[1152px]:w-full'>
                    <p className='font-bold'>Heure actuelle<br/><span className='text-4xl'>{hours}h{minutes}</span></p>
                    </div>
                    <Countdown
                      date={targetTime} 
                      renderer={renderer} />
                </div>
              </div>
            </div>  

          </div>

          <div className='h-[80vh] w-1/2 absolute right-0 top-[-10px] max-[1152px]:relative max-[1152px]:w-full max-[1152px]:mt-[30px] max-[1152px]:flex max-[1152px]:justify-center max-[1152px]:right-0'>
            <EarthModel />
          </div>

        </div>
    </section>
    <GalaxyBackground />

    </>
  );
}
