import MoonModel from '../models/MoonModel';
import GalaxyBackground from '../backgrounds/GalaxyBackground';
import { WiMoonAltWaningCrescent1, WiMoonAltWaningGibbous4, WiMoonAltFull, 
  WiMoonAltWaxingGibbous3, WiMoonAltWaxingCrescent6, WiMoonAltWaxingCrescent2, WiMoonFull } from 'react-icons/wi';

export default function Moon() {
  return (
    <>
    <section className='relative flex flex-col justify-center min-h-[70vh] mt-10'>
      <div className='flex flex-row flex-wrap text-[#00d0e3] items-center align-center overflow-hidden'>

          <div className='flex flex-col w-4/5 max-[1152px]:w-full relative'>

            <div className='p-10 pb-0 description'>
              <h1 className='gradiantAnimator text-4xl mb-2 text-[#1c3b49] glow-effect p-4'>La lune</h1>
              <div>

                <p className='font-bold text-[#00d0e3] ml-4 mt-8'>Distance de la Terre</p>
                <p className='ml-4'>384 400 km</p>

                <p className='font-bold text-[#00d0e3] ml-4 mt-4'>Taille (diamètre)</p>
                <p className='ml-4'>3 476 km</p>

                <p className='font-bold text-[#00d0e3] ml-4 mt-4'>Température</p>
                <p className='ml-4'>Entre -248 et 123 °C</p>

                <p className='font-bold text-[#00d0e3] ml-4 mt-4'>Longueur de l'année (période orbitale)</p>
                <p className='ml-4 mb-6'>27,3 jours</p>

                <div className='flex flex-col description2 backdrop-blur-sm'>
                  <div className='font-Orbitron text-[#00d0e3] text-xl mt-2 mb-4 pl-6 max-[1152px]:w-full'>
                    <p className='font-bold '>Les phases de la lune</p>
                  </div>
                  <div className='flex flew-row flex-wrap gap-6 px-6 pb-6 text-xs text-center text-sm max-sm:justify-center'>
                    <div className='flex flex-col items-center'>
                      <WiMoonAltWaningCrescent1 className='text-4xl'/>
                      <span>Premier<br/>quartier</span>
                    </div>
                    <div className='flex flex-col items-center'>
                      <WiMoonAltWaningGibbous4 className='text-4xl'/>
                      <span>Premier<br/>croissant</span>
                    </div>
                    <div className='flex flex-col items-center'>
                      <WiMoonAltFull className='text-4xl'/>
                      <span>Nouvelle<br/>lune</span>
                    </div>

                    <div className='flex flex-col items-center'>
                      <WiMoonAltWaxingGibbous3 className='text-4xl'/>
                      <span>Dernier<br/>croissant</span>
                    </div>
                    <div className='flex flex-col items-center'>
                      <WiMoonAltWaxingCrescent6 className='text-4xl'/>
                      <span>Dernier<br/>quartier</span>
                    </div>
                    <div className='flex flex-col items-center'>
                      <WiMoonAltWaxingCrescent2 className='text-4xl'/>
                      <span>Lune<br/>gibbeuse<br/>décroissante</span>
                    </div>
                    <div className='flex flex-col items-center'>
                      <WiMoonFull className='text-4xl'/>
                      <span>Pleine<br/>lune</span>
                    </div>

                  </div>
                </div>
              </div>
            </div>  
          </div>
          <div className='h-[80vh] w-1/2 absolute right-0 top-[-10px] max-[1152px]:relative max-[1152px]:w-full max-[1152px]:mt-[30px] max-[1152px]:flex max-[1152px]:justify-center max-[1152px]:right-0'>
            <MoonModel />
          </div>
        </div>
    </section>
    <GalaxyBackground />
    </>
  );
}