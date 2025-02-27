import React from 'react';
import GalaxyBackground from '../backgrounds/GalaxyBackground';
import SunModel from '../models/SunModel';

export default function Sun() {

  return (
    <>
    <section className='relative flex flex-col justify-center min-h-[70vh] mt-10'>
      <div className='flex flex-row flex-wrap text-[#00d0e3] items-center align-center overflow-hidden'>

          <div className='flex flex-col w-4/5 max-[1400px]:w-full relative'>

            <div className='p-10 pb-0 description'>
              <h1 className='gradiantAnimator text-4xl mb-2 text-[#1c3b49] glow-effect p-4'>Le soleil</h1>
              <div>

                <p className='font-bold text-[#00d0e3] ml-4 mt-8'>Taille (diamètre)</p>
                <p className='ml-4'>1,4 million de km</p>

                <p className='font-bold text-[#00d0e3] ml-4 mt-4'>Température</p>
                <p className='ml-4 mb-2'>Environ 5 500 °C à la surface</p>

                <p className='font-bold text-[#00d0e3] ml-4 mt-4'>Longueur de l'année (période orbitale)</p>
                <p className='ml-4 mb-6'>250 millions d'années</p>

                <div className='flex flex-row flex-wrap description2 backdrop-blur-sm font-Orbitron'>
                    <div className='text-justify text-[#00d0e3] text-sm leading-6 my-8 p-4 w-3/4 max-[1400px]:w-full'>
                        <p> 
                            Source ardente de vie et d'énergie, le Soleil brille de mille feux, éclairant et réchauffant chacun des recoins de notre système solaire.
                        </p>
                    </div>
                  </div>
              </div>
            </div>  
          </div>
          <div className='h-[80vh] w-1/2 absolute right-0 top-[-10px] max-[1400px]:relative max-[1400px]:w-full max-[1400px]:mt-[30px] max-[1400px]:flex max-[1400px]:justify-center max-[1400px]:right-0'>
            <SunModel />
          </div>
        </div>
    </section>
    <GalaxyBackground />
    </>
  );
}
