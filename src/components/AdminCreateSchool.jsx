import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import GalaxyBackground from './backgrounds/GalaxyBackground';
import { useNavigate } from 'react-router-dom';

export default function AdminCreateSchool() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    level: 'college',
  });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
      const checkAdmin = async () => {
        const { data } = await supabase.auth.getUser();
        const userEmail = data?.user?.email;
  
        if (userEmail !== 'billy.thomont@univ-reunion.fr') {
          navigate('/login-ecole');
        }
      };
  
      checkAdmin();
    }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setStatus('Création en cours...');

    // Créer l’utilisateur Supabase Auth
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email: form.email,
      password: form.password,
      email_confirm: true,
    });

    if (userError || !userData?.user?.id) {
      setStatus('❌ Erreur création utilisateur : ' + (userError?.message || 'inconnue'));
      return;
    }

    const userId = userData.user.id;

    // Ajouter dans la table schools
    const { error: dbError } = await supabase.from('schools').insert({
      id: userId,
      name: form.name,
      email: form.email,
      level: form.level,
      created_at: new Date().toISOString(),
    });

    if (dbError) {
      setStatus('❌ Erreur insertion BDD : ' + dbError.message);
    } else {
      setStatus(`✅ École "${form.name}" créée avec succès`);
      setForm({ name: '', email: '', password: '', level: 'college' });
    }
  };

  return (
    <>
      <div className="p-6 max-w-xl mx-auto text-white">
        <h1 className="text-2xl mb-4">Créer une école</h1>
        <form onSubmit={handleCreate} className="flex flex-col gap-4 bg-white p-4 rounded text-black">
          <input
            type="text"
            name="name"
            placeholder="Nom de l'école"
            value={form.name}
            onChange={handleChange}
            required
            className="p-2 border"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="p-2 border"
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            required
            className="p-2 border"
          />
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className="p-2 border"
          >
            <option value="college">Collège</option>
            <option value="lycee">Lycée</option>
            <option value="universite">Université</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Créer
          </button>
        </form>
        <p className="mt-4">{status}</p>
      </div>
      <GalaxyBackground />
    </>
  );
}
