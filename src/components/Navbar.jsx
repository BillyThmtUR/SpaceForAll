import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeSubMenu, setActiveSubMenu] = React.useState(null); 

  useEffect(() => {
    const handleOpenSolarSystem = () => {
      setIsDropdownOpen(true);
    };
  
    window.addEventListener('openSolarSystem', handleOpenSolarSystem);
  
    return () => {
      window.removeEventListener('openSolarSystem', handleOpenSolarSystem);
    };
  }, []);

  useEffect(() => {
    const handleMobileOpenSolarSystem = () => {
      setIsMobileMenuOpen(true);
    };
  
    window.addEventListener('MobileOpenSolarSystem', handleMobileOpenSolarSystem);
  
    return () => {
      window.removeEventListener('MobileOpenSolarSystem', handleMobileOpenSolarSystem);
    };
  }, []);

  return (
<>
<div className='border-[1px] border-[#00d0e3] glow-effectNavbar'/>
<nav className="relative text-white bg-[#00d0e3]/[0.1] drop-shadow-min-[1152px] backdrop-blur-[3px] z-[1000]">
  <div className="flex flex-wrap gap-4 items-center justify-between mx-auto p-4 pr-10">
    <a href="#" className="flex items-center">
      <img src={`${process.env.PUBLIC_URL}/img/logo.png`} className="h-14 mr-1 mb-4" alt="Flowbite Logo" />
      <div className='flex flex-col'>
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white font-Orbitron mb-1">SpaceForAll</span>
        <div className='flex flex-row'>
          <span className="text-left text-sm font-thin signature">by Billy Thomont</span>
          <span className='border-[2px] ring-offset-0 rounded-full px-1 text-xs ml-4 mb-4'>Beta</span>
        </div>
      </div>
    </a>

    <button 
      type="button" 
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm min-[1152px]:hidden" 
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    >
      <svg className="w-5 h-5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke='#00d0e3' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
      </svg>
    </button>

    <div className={`${isMobileMenuOpen ? '' : 'hidden'} w-full min-[1152px]:block min-[1152px]:w-auto`} >
      <ul className="flex flex-col font-medium p-4 min-[1152px]:p-0 mt-4 min-[1152px]:flex-row min-[1152px]:space-x-8 min-[1152px]:mt-0 min-[1152px]:border-0 text-white">
        <li>
        <Link to="/" className="block py-2 pl-3 pr-4 hoverGradiantAnimator" >Accueil</Link>
        </li>
        <li>
        <button className="flex items-center justify-between w-full py-2 pl-3 pr-4 hoverGradiantAnimator"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}>Le système solaire <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg></button>
        {
          isDropdownOpen && (
            <div className="z-99">
              <ul className="py-2 text-sm" aria-labelledby="dropdownLargeButton">

                {/* Les étoiles */}
                <li className="bg-[rgba(35,180,196,0.2)] hover:bg-[rgba(35,180,196,0.7)] mx-4 px-4 py-2" onClick={() => setActiveSubMenu(activeSubMenu === 'stars' ? null : 'stars')}>
                  Les étoiles
                </li>
                {
                  activeSubMenu === 'stars' && (
                    <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} data-aos="fade-down" data-aos-delay="0" data-aos-duration="150">
                      <Link to="/sun" className="block mx-4 px-4 py-2 hoverGradiantAnimator">
                        <img className="icon mr-2" src={`${process.env.PUBLIC_URL}/img/planetsIcon/sunIcon.png`} />
                        Le soleil
                      </Link>
                    </li>
                  )
                }

                {/* Les planètes */}
                <li className="bg-[rgba(35,180,196,0.2)] hover:bg-[rgba(35,180,196,0.7)] mx-4 px-4 py-2 mt-2" onClick={() => setActiveSubMenu(activeSubMenu === 'planets' ? null : 'planets')}>
                  Les planètes
                </li>
                {
                  activeSubMenu === 'planets' && (
                    <>
                  <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} data-aos="fade-down" data-aos-delay="0" data-aos-duration="150">
                    <Link to="/earth" className="block mx-4 px-4 py-2 hoverGradiantAnimator">
                      <img className="icon mr-2" src={`${process.env.PUBLIC_URL}/img/planetsIcon/terreIcon.png`} />
                      La terre
                    </Link>
                  </li>
                  <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} data-aos="fade-down" data-aos-delay="100" data-aos-duration="150">
                    <Link to="/jupiter" className="block mx-4 px-4 py-2 hoverGradiantAnimator">
                      <img className="icon mr-2" src={`${process.env.PUBLIC_URL}/img/planetsIcon/jupiterIcon.png`} />
                      Jupiter
                    </Link>
                  </li>
                  <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} data-aos="fade-down" data-aos-delay="200" data-aos-duration="150">
                    <Link to="/mars" className="block mx-4 px-4 py-2 hoverGradiantAnimator">
                      <img className="icon mr-2" src={`${process.env.PUBLIC_URL}/img/planetsIcon/marsIcon.png`} />
                      Mars
                    </Link>
                  </li>
                  <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} data-aos="fade-down" data-aos-delay="300" data-aos-duration="150">
                    <Link to="/mercury" className="block mx-4 px-4 py-2 hoverGradiantAnimator">
                      <img className="icon mr-2" src={`${process.env.PUBLIC_URL}/img/planetsIcon/mercureIcon.png`} />
                      Mercure
                    </Link>
                  </li>
                  <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} data-aos="fade-down" data-aos-delay="400" data-aos-duration="150">
                    <Link to="/neptune" className="block mx-4 px-4 py-2 hoverGradiantAnimator">
                      <img className="icon mr-2" src={`${process.env.PUBLIC_URL}/img/planetsIcon/neptuneIcon.png`} />
                      Neptune
                    </Link>
                  </li>
                  <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} data-aos="fade-down" data-aos-delay="500" data-aos-duration="150">
                    <Link to="/saturn" className="block mx-4 px-4 py-2 hoverGradiantAnimator">
                      <img className="icon mr-2" src={`${process.env.PUBLIC_URL}/img/planetsIcon/saturnIcon.png`} />
                      Saturne
                    </Link>
                  </li>
                  <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} data-aos="fade-down" data-aos-delay="600" data-aos-duration="150">
                    <Link to="/uranus" className="block mx-4 px-4 py-2 hoverGradiantAnimator">
                      <img className="icon mr-2" src={`${process.env.PUBLIC_URL}/img/planetsIcon/uranusIcon.png`} />
                      Uranus
                    </Link>
                  </li>
                  <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} data-aos="fade-down" data-aos-delay="700" data-aos-duration="150">
                    <Link to="/venus" className="block mx-4 px-4 py-2 hoverGradiantAnimator">
                      <img className="icon mr-2" src={`${process.env.PUBLIC_URL}/img/planetsIcon/venusIcon.png`} />
                      Venus
                    </Link>
                  </li>
                </>
                )
              }

              {/* Les satellites naturels */}
              <li className="bg-[rgba(35,180,196,0.2)] hover:bg-[rgba(35,180,196,0.7)] mx-4 px-4 py-2 mt-2" onClick={() => setActiveSubMenu(activeSubMenu === 'satellites' ? null : 'satellites')}>
                Les satellites naturels
              </li>
              {
                activeSubMenu === 'satellites' && (
                  <>
                    <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} data-aos="fade-down" data-aos-delay="0" data-aos-duration="150">
                      <Link to="/moon" href="#" className="block mx-4 px-4 py-2 hoverGradiantAnimator">
                        <img className="icon mr-2" src={`${process.env.PUBLIC_URL}/img/planetsIcon/luneIcon.png`} />
                        La lune
                      </Link>
                    </li>
                  </>
                )
              }
              </ul>
            </div>
          )
        }
        </li>
        <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Link to="/quiz" href="#" className="block py-2 pl-3 pr-4 min-[1152px]:border-0 hoverGradiantAnimator">
            Jeu quiz
          </Link>
        </li>
        <li>
          <Link to="/contact" className="block py-2 pl-3 pr-4 min-[1152px]:border-0 hoverGradiantAnimator">Nous contacter</Link>
        </li>
        <li>
          <a href="#" className="block py-2 pl-3 pr-4 min-[1152px]:border-0 hoverGradiantAnimator">Se connecter</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</>
  )
}

export default Navbar