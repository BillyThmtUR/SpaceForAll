import React from 'react';
import GalaxyBackground from '../backgrounds/GalaxyBackground';
import JupiterModel from '../models/JupiterModel';

export default function Jupiter() {

  return (
    <>
    <section className='relative flex flex-col justify-center min-h-[70vh] mt-10'>
      <div className='flex flex-row flex-wrap text-[#00d0e3] items-center align-center overflow-hidden'>

          <div className='flex flex-col w-4/5 max-[1152px]:w-full relative'>

            <div className='p-10 pb-0 description'>
              <h1 className='gradiantAnimator text-4xl mb-2 text-[#1c3b49] glow-effect p-4'>Jupiter</h1>
              <div>

                <p className='font-bold text-[#00d0e3] ml-4 mt-8'>Taille (diamètre)</p>
                <p className='ml-4'>139 822 km</p>

                <p className='font-bold text-[#00d0e3] ml-4 mt-4'>Température</p>
                <p className='ml-4 mb-2'>Entre -161 et -108 °C</p>

                <p className='font-bold text-[#00d0e3] ml-4 mt-4'>Longueur de l'année (période orbitale)</p>
                <p className='ml-4 mb-6'>11,8 ans</p>

                <div className='flex flex-row flex-wrap description2 backdrop-blur-sm'>
                    <div className='text-center font-Orbitron text-[#00d0e3] text-sm leading-6 my-8 p-4 w-3/5 max-[1152px]:w-full'>
                        <p> 
                        Avec sa taille titanesque, Jupiter domine le système solaire et fascine par ses énigmatiques tempêtes
                        </p>
                    </div>
                    <div className='w-2/5 max-[1152px]:w-full drop-shadow-md'>
                    </div>
                  </div>
              </div>
            </div>  

          </div>

          <div className='h-[80vh] w-1/2 absolute right-0 top-[-10px] max-[1152px]:relative max-[1152px]:w-full max-[1152px]:mt-[30px] max-[1152px]:flex max-[1152px]:justify-center max-[1152px]:right-0'>
            <JupiterModel />
          </div>

        </div>
    </section>
    <GalaxyBackground />
    </>
  );
}
