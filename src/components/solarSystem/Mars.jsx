import React from 'react';
import GalaxyBackground from '../backgrounds/GalaxyBackground';
import MarsModel from '../models/MarsModel';

export default function Mars() {

  return (
    <>
    <section className='relative flex flex-col justify-center min-h-[70vh] mt-10'>
      <div className='flex flex-row flex-wrap text-[#00d0e3] items-center align-center overflow-hidden'>

          <div className='flex flex-col w-4/5 max-[1152px]:w-full relative'>

            <div className='p-10 pb-0 description'>
              <h1 className='gradiantAnimator text-4xl mb-2 text-[#1c3b49] glow-effect p-4'>Mars</h1>
              <div>

                <p className='font-bold text-[#00d0e3] ml-4 mt-8'>Taille (diamètre)</p>
                <p className='ml-4'>6 791 km</p>

                <p className='font-bold text-[#00d0e3] ml-4 mt-4'>Température</p>
                <p className='ml-4 mb-2'>Entre -140 et 30 °C</p>

                <p className='font-bold text-[#00d0e3] ml-4 mt-4'>Longueur de l'année (période orbitale)</p>
                <p className='ml-4 mb-6'>687 jours</p>

                <div className='flex flex-row flex-wrap description2 backdrop-blur-sm'>
                    <div className='text-justify font-Orbitron text-[#00d0e3] text-sm leading-6 my-8 p-4 w-3/5 max-[1152px]:w-full'>
                        <p> 
                          Il a été découvert que Mars a abrité de l'eau à sa surface il y a environ 3,7 milliards d'années.
                          <br/><br/> 
                          confirmant ainsi un ancien environnement "habitable" sur la planète rouge.
                        </p>
                    </div>
                    <div className='w-2/5 max-[1152px]:w-full'>
                      <div className='Ocean drop-shadow-xl'>
                        <svg className="Wave mt-4 drop-shadow-xl" viewBox="0 0 12960 1120">
                        <path d="M9720,320C8100,320,8100,0,6480,0S4860,320,3240,320,1620,0,0,0V1120H12960V0C11340,0,11340,320,9720,320Z">
                          <animate dur="10s" repeatCount="indefinite" attributeName="d" values="
                              M9720,320C8100,320,8100,0,6480,0S4860,320,3240,320,1620,0,0,0V1120H12960V0C11340,0,11340,320,9720,320Z;
                              M9720,0C8100,0,8100,319,6480,319S4860,0,3240,0,1620,320,0,320v800H12960V320C11340,320,11340,0,9720,0Z;
                              M9720,320C8100,320,8100,0,6480,0S4860,320,3240,320,1620,0,0,0V1120H12960V0C11340,0,11340,320,9720,320Z
                            "/>
                        </path>
                        </svg>
                      </div>
                    </div>
                  </div>
              </div>
            </div>  
          </div>
          <div className='h-[80vh] w-1/2 absolute right-0 top-[-10px] max-[1152px]:relative max-[1152px]:w-full max-[1152px]:mt-[30px] max-[1152px]:flex max-[1152px]:justify-center max-[1152px]:right-0'>
            <MarsModel />
          </div>
        </div>
    </section>
    <GalaxyBackground />
    </>
  );
}
