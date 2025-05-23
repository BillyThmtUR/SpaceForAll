import React from 'react'
import { useNavigate } from 'react-router-dom'
import GalaxyBackground from './backgrounds/GalaxyBackground'

function Contact() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Formulaire soumis")
    navigate("/spaceforall")
  }

  return (
    <> 
    <div className='bg-[rgba(0,208,227,0.1)] backdrop-blur-sm w-full absolute z-[1] h-full overflow-hidden'>
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 className="mb-2 text-4xl font-extrabold text-center text-white font-Orbitron">Nous contacter</h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-white sm:text-xl">Besoin de nous contacter pour une question technique ou commerciale ?</p>
            
            <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white font-Orbitron">Email</label>
                    <input type="email" id="email" className="shadow-sm border border-gray-600 text-black text-sm focus:ring-[#00d0e3] focus:border-[#00d0e3] block w-full p-2.5" required />
                </div>
                <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium text-white font-Orbitron">Objet</label>
                    <input type="text" id="subject" className="block p-3 w-full text-sm text-black  border border-gray-300 shadow-sm focus:ring-[#00d0e3] focus:border-[#00d0e3]" required />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-white font-Orbitron">Votre message</label>
                    <textarea id="message" rows="6" className="block p-2.5 w-full text-sm text-black shadow-sm border border-gray-300 focus:ring-[#00d0e3] focus:border-[#00d0e3]" placeholder="Écrire un message..." />
                </div>
                <button type="submit" className="font-Orbitron text-2xl p-4 gradiantSolar hover:bg-[#00d0e3]">envoyer</button>
            </form>
        </div>
    </div>
    <GalaxyBackground />
    </>
  )
}

export default Contact