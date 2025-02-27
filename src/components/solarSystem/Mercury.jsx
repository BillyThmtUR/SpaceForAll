import React, { useState } from 'react';
import GalaxyBackground from '../backgrounds/GalaxyBackground';
import MercuryModel from '../models/MercuryModel';

export default function Mercury() {
    const [isActive, setIsActive] = useState(false);
    const [activeTexture, setActiveTexture] = useState(`${process.env.PUBLIC_URL}/data/textures//8k_mercury.jpg`);

    const handleTextureChange = () => {
        const newTexture = activeTexture === `${process.env.PUBLIC_URL}/data/textures//8k_mercury.jpg` 
                           ? `${process.env.PUBLIC_URL}/data/textures//8k_mercuryAmplifié.jpg` 
                           : `${process.env.PUBLIC_URL}/data/textures//8k_mercury.jpg`;
        setActiveTexture(newTexture);
        setIsActive(!isActive); 
      };

    return (
        <>
        <section className='relative flex flex-col justify-center min-h-[70vh] mt-10'>
        <div className='flex flex-row flex-wrap text-[#00d0e3] items-center align-center overflow-hidden'>

            <div className='flex flex-col w-4/5 max-[1152px]:w-full relative'>

                <div className='p-10 pb-0 description'>
                <h1 className='gradiantAnimator text-4xl mb-2 text-[#1c3b49] glow-effect p-4'>Mercure</h1>
                <div>

                    <p className='font-bold text-[#00d0e3] ml-4 mt-8'>Taille (diamètre)</p>
                    <p className='ml-4'>4 880 km</p>

                    <p className='font-bold text-[#00d0e3] ml-4 mt-4'>Température</p>
                    <p className='ml-4 mb-2'>Entre -173 et 427 °C</p>

                    <p className='font-bold text-[#00d0e3] ml-4 mt-4'>Longueur de l'année (période orbitale)</p>
                    <p className='ml-4 mb-6'>88 jours</p>

                    <div className='flex flex-row flex-wrap description2 backdrop-blur-sm'>
                        <div className='text-center font-Orbitron text-[#00d0e3] text-sm leading-6 my-8 p-4 w-2/5 max-[1152px]:w-full'>
                            <p> 
                                La NASA a effectué une cartographie de Mercure en utilisant des "couleurs artificielles" 
                                pour différencier les cratères récents, qui apparaissent en bleu, 
                                des bassins d'impact plus anciens, représentés en orange.
                            </p>
                        </div>
                        <div className='text-center font-Orbitron w-2/5 drop-shadow-xl max-[1152px]:w-full'>
                            <button className='bg-[#00d0e3] text-[#1c3b49] text-xl p-10 w-full h-full' onClick={handleTextureChange}>
                                {isActive ? 'Désactiver' : 'Activer'}
                            </button>
                        </div>
                    </div>
                </div>
                </div>  

            </div>

            <div className='h-[80vh] w-1/2 absolute right-0 top-[-10px] max-[1152px]:relative max-[1152px]:w-full max-[1152px]:mt-[30px] max-[1152px]:flex max-[1152px]:justify-center max-[1152px]:right-0'>
                <MercuryModel texture={activeTexture} />
            </div>

            </div>
        </section>
        <GalaxyBackground />
        </>
    );
}
