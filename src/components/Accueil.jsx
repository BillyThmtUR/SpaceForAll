import React, { useEffect, useState } from 'react';
import Loader from './Loader'
import GalaxyBackgroundAccueil from './backgrounds/GalaxyBackgroundAccueil';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Accueil() {
  const [loading, setLoading] = useState(true);
  const [minDelayMet, setMinDelayMet] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);


  useEffect(() => {
    AOS.init({});
  }, []);
  
  // Liste des images à charger
  const imagesToLoad = [
    `${process.env.PUBLIC_URL}/img/Intro00.jpg`,
    `${process.env.PUBLIC_URL}/img/astronaut.png`,
    `${process.env.PUBLIC_URL}/img/astronaut2.png`,
    `${process.env.PUBLIC_URL}/img/nasa-logo.svg`,
  ];

  // Charger toutes les images avant d'afficher la page
  useEffect(() => {
    const preloadImages = async () => {

      const imagePromises = imagesToLoad.map((src, index) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            resolve();
          };
            img.onerror = () => {
              resolve(); // On continue même en cas d'erreur
            };
        });
      });

      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };

    preloadImages();
  }, []);

  // Assurer un délai minimum de 3 secondes avant la disparition du loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinDelayMet(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Masquer le loader une fois que toutes les images sont chargées ET que le délai est atteint
  useEffect(() => {
    if (imagesLoaded && minDelayMet) {
      setLoading(false);
      console.log(
        "%cCreated by Billy THOMONT 🚀 - www.billythomont.com",
        "color: rgb(55, 255, 0); background: #000; font-size: 16px; padding: 10px; border: 2px solid rgb(55, 255, 0); font-family: 'Courier New', monospace; text-shadow: 0 0 10px rgb(55, 255, 0);"
      );
    }
  }, [imagesLoaded, minDelayMet]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleStartClick = () => {
  // Ouvre la section "système solaire"
  window.dispatchEvent(new Event('openSolarSystem'));
  window.dispatchEvent(new Event('MobileOpenSolarSystem'));
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
    <div className="fade-in">
      <Parallax pages={3}>

        {/* Page 1 */}
        <ParallaxLayer offset={0} speed={0}>
          <div
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/img/Intro00.jpg)`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: '100vh'
            }}
            className='z-[10]'>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0.5}>
          <img 
            src={`${process.env.PUBLIC_URL}/img/astronaut.png`} 
            style={{position: 'absolute', top: '10vh', left: '-20vw'}}
            className='z-[5]' 
            alt='astronaute page 1'
          />
        </ParallaxLayer>
        
        <ParallaxLayer offset={0} speed={1} >
          <h1 className='text-right text-6xl max-sm:text-[2.5em] text-white p-10 mt-[10vh] drop-shadow-xl max-md:mt-[90vh] max-sm:mt-[60vh]'>
              Vivez une expérience<br/>3d unique
          </h1>
          <div className='bg-[rgba(0,208,227,0.1)] anim backdrop-blur-md absolute right-0 max-md:w-full w-1/2 z-[1]'>
            <div className='text-justify text-white leading-6 my-8 p-10 max-sm:text-left'>
                <p className='mb-4'>Décollez pour un voyage visuel à travers l'infini spatial, le tout dans une dimension 3D immersive. </p>
                <p className='mb-4'>Chez SpaceForAll, nous pensons que les merveilles célestes doivent être accessibles à tous et ne pas être limitées par l'achat de télescopes parfois onéreux et délicats à manier.</p>
                <p className='mb-4'>C'est dans cette vision que nous avons conçu une porte vers l'univers, accessible à chacun depuis son écran. Nous vous souhaitons bon voyage parmi les étoiles...</p>
            </div>
            <div className='horizontal-line' />
          </div>
        </ParallaxLayer>
        
        {/* Page 2 */}
        <ParallaxLayer 
          offset={1}
          speed={0.5}
          style={{height: '100vh'}}
          className='absolute'
        >
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.5}>
          <img 
            src={`${process.env.PUBLIC_URL}/img/astronaut2.png`} 
            style={{position: 'absolute', top: '20vh', right: '-20vw'}}
            className='z-[20] max-md:w-2/4 max-md:left-[70vw] max-md:mt-[-10vh] max-sm:w-3/4 max-sm:left-[20vh]' 
            alt='astronaute page 2'
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={1}>
            <h1 className=' text-left text-6xl max-sm:text-[2.5em] text-white p-10 mt-[10vh] drop-shadow-xl max-md:mt-[100vh] max-sm:mt-[60vh]'>
              Un rendu ultra-HD 8k
            </h1>
            <div className='bg-[rgba(0,208,227,0.1)] anim backdrop-blur-md absolute left-0 max-md:w-full w-1/2 z-[1]'>
            <div className='text-justify text-white leading-6 my-8 p-10 max-sm:text-left'>
                <p className='mb-4'>Nos représentations planétaires sont le fruit d'un travail méticuleux de texturisation et de perfectionnement de surface en résolution 8K. </p>
                <p className='mb-8'>Chaque cratère, chaque nuance et chaque relief ont été conçus avec le plus grand soin, en combinant les compétences avancées de l'intelligence artificielle, des retouches images sophistiquées et des technologies de développement web les plus récentes.</p>

                <div className='flex items-center mb-4 p-4 bg-[rgba(0,208,227,0.1)]'>
                  <img src={`${process.env.PUBLIC_URL}/img/nasa-logo.svg`} alt="SVG Icon" className='w-[50px] h-[50px] mr-4 max-sm:absolute max-sm:bottom-4 max-sm:right-0'/> 
                  <p>Pour garantir l'authenticité et la fidélité de nos modèles, nous nous sommes appuyés sur les données de référence des missions emblématiques de la NASA, telles que Messenger et Voyager.</p>
                </div>
            </div>
            <div className='horizontal-line glow-effectNavbar' />
          </div>
        </ParallaxLayer>
        
        {/* Page 3 */}
        <ParallaxLayer 
          offset={2}
          speed={0.5}
          style={{height: '100vh'}}
          className='absolute'
          >
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={1.5}>
          <div className='bg-[rgba(0,208,227,0.1)] backdrop-blur-md w-full absolute top-[30vh] z-[1] '>
            <div className='text-center text-white leading-6 p-10 font-Orbitron'>
                <p className='mb-6'>Plongez dans l'expérience en commençant par explorer notre barre de navigation ci-dessus.</p>
                <button className='font-Orbitron text-2xl p-4 gradiantSolar hover:glow-effect' onClick={() => { handleStartClick();}}>
                  Commencer
                </button>
            </div>
          </div>
        </ParallaxLayer>

      </Parallax>

      <GalaxyBackgroundAccueil />
    </div>
    </>
  );
}
