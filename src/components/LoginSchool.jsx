// src/components/LoginSchool.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import GalaxyBackground from './backgrounds/GalaxyBackground';

export default function LoginSchool() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMsg('');
    console.log('Tentative de connexion avec :', email, password);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg('Erreur : ' + error.message);
    } else {
      setErrorMsg('Connexion réussie !');
    }

    if (email === 'billy.thomont@univ-reunion.fr') {
      navigate('/dashboard-admin');
    } else {
      navigate('/dashboard-ecole');
    }
  }


  useEffect(() => {
    fetch(supabase.supabaseUrl + '/auth/v1/health')
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        console.log('✅ Supabase Auth API disponible');
      })
      .catch(err => {
        console.error('❌ Supabase indisponible ou mal configuré :', err);
      });
  }, []);


  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-[rgba(0,208,227,0.05)] backdrop-blur-sm">
      <h1 className="text-4xl mb-6 text-white">Connexion</h1>
      <input
        type="email"
        placeholder="Email"
        className="mb-2 p-2 border rounded text-black"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        className="mb-4 p-2 border rounded text-black"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
        Se connecter
      </button>
      {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
    </div>
    <GalaxyBackground />
    </>
  );
}
