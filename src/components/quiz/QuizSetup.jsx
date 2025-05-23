// src/components/quiz/QuizSetup.jsx
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import GalaxyBackground from '../backgrounds/GalaxyBackground';

export default function QuizSetup({ onStudentCreated }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStart = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('students')
      .insert([{ first_name: firstName, last_name: lastName }])
      .select()
      .single();

    if (error) {
      setError('Erreur : ' + error.message);
      setLoading(false);
    } else {
      onStudentCreated(data); // transmet l'élève à ton composant parent
    }
  };

  return (
    <>
    <div className="bg-[rgba(0,208,227,0.05)] backdrop-blur-xs w-full absolute z-[1] h-full overflow-hidden">
      <div className="p-10 flex flex-col items-center justify-center h-full">
        <h2 className="mb-4 text-4xl font-extrabold text-center text-white font-Orbitron">Entrez vos informations</h2>
        <input
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mb-4 rounded-xl text-gray-800"
        />
        <input
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="rounded-xl text-gray-800"
        />
        <button
          onClick={handleStart}
          disabled={loading || !firstName || !lastName}
          className={`relative px-6 py-3 mt-4 font-bold text-white uppercase rounded-lg transition-transform transform ${
            loading || !firstName || !lastName
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-teal-400 hover:scale-105 hover:shadow-[0_0_15px_rgba(0,208,227,0.8)]'
          }`}
        >
          {loading ? 'Chargement...' : 'Commencer'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
    <GalaxyBackground />
    </>
  );
}
