import React, { useState } from 'react';
import GalaxyBackground from '../backgrounds/GalaxyBackground';
import VenusModel from '../models/VenusModel';

export default function Venus() {
  const [opacity, setOpacity] = useState(1);

  const decreaseOpacity = () => {
    setOpacity(prevOpacity => Math.max(0, prevOpacity - 0.1));
  }

  const increaseOpacity = () => {
    setOpacity(prevOpacity => Math.min(1, prevOpacity + 0.1));
  }

  return (
    <>
    <section className='relative flex flex-col justify-center min-h-[70vh] mt-10'>
      <div className='flex flex-row flex-wrap text-[#00d0e3] items-center align-center overflow-hidden'>

          <div className='flex flex-col w-4/5 max-[1400px]:w-full relative'>

            <div className='p-10 pb-0 description'>
              <h1 className='gradiantAnimator text-4xl mb-2 text-[#1c3b49] glow-effect p-4'>Venus</h1>
              <div>

                <p className='font-bold text-[#00d0e3] ml-4 mt-8'>Taille (diamètre)</p>
                <p className='ml-4'>12 104 km</p>

                <p className='font-bold text-[#00d0e3] ml-4 mt-4'>Température</p>
                <p className='ml-4 mb-2'>Environ 460 °C</p>

                <p className='font-bold text-[#00d0e3] ml-4 mt-4'>Longueur de l'année (période orbitale)</p>
                <p className='ml-4 mb-6'>224,7 jours</p>

                <div className='flex flex-row flex-wrap description2 backdrop-blur-sm font-Orbitron'>
                    <div className='text-center text-[#00d0e3] text-sm leading-6 my-8 p-4 w-1/4 max-[1400px]:w-full'>
                        <p> 
                        La surface de Vénus demeure voilée et mystérieuse, dissimulée sous son épais manteau d'atmosphère nuageuse.
                        </p>
                    </div>
                    <div className='flex flex-row items-center w-3/4 max-[1400px]:w-full'>
                        <button className='bg-[#00d0e3] text-[#1c3b49] text-4xl p-10 max-sm:p-4 h-full glow-effect' onClick={decreaseOpacity}>
                          -
                        </button>
                        <p className='flex items-center justify-center p-10 text-center text-sm bg-[rgba(0,208,227,0.1)] max-[1400px]:w-full max-sm:p-4 h-full'>Opacité de l'atmosphère</p>
                        <button className='bg-[#00d0e3] text-[#1c3b49] text-4xl p-10 max-sm:p-4 h-full glow-effect' onClick={increaseOpacity}>
                          +
                        </button>
                    </div>
                  </div>
              </div>
            </div>  
          </div>
          <div className='h-[80vh] w-1/2 absolute right-0 top-[-10px] max-[1400px]:relative max-[1400px]:w-full max-[1400px]:mt-[30px] max-[1400px]:flex max-[1400px]:justify-center max-[1400px]:right-0'>
            <VenusModel opacity={opacity}/>
          </div>
        </div>
    </section>
    <GalaxyBackground />
    </>
  );
}
