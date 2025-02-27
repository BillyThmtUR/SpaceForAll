import React, { useEffect, useState } from 'react';
import Loader from './Loader'
import GalaxyBackgroundAccueil from './backgrounds/GalaxyBackgroundAccueil';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Accueil() {
  const [loading, setLoading] = useState(true);
  const [minDelayMet, setMinDelayMet] = useState(false);

  // Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init({});
      // Lorsque toutes les ressources de la page sont chargées, cachez le loader
      const handleLoad = () => {
        if (minDelayMet) {
          setLoading(false);
        } else {
          // Si le délai minimum n'est pas encore atteint, attendez qu'il le soit.
          setTimeout(() => {
            setLoading(false);
          }, 5000);
        }
      }
  
      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
        // Supprimez l'écouteur d'événements lors du démontage du composant
        return () => {
          window.removeEventListener('load', handleLoad);
        };
      }
    }, [minDelayMet]);
  
    // Assurez-vous que le Loader s'affiche pendant au moins 2 secondes.
    useEffect(() => {
      const timer = setTimeout(() => {
        setMinDelayMet(true);
        if (document.readyState === "complete") {
          setLoading(false);
        }
      }, 2000);
      // Supprimez le timer lors du démontage pour éviter les fuites de mémoire.
      return () => {
        clearTimeout(timer);
      };
  }, []); 

  useEffect(() => {
    // Cacher la barre de défilement lorsque le composant est monté
    document.body.style.overflow = 'hidden';

    // Réafficher la barre de défilement lorsque le composant est démonté
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
