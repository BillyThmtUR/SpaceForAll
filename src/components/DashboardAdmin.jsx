import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import GalaxyBackground from './backgrounds/GalaxyBackground';

export default function DashboardAdmin() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Vérifie que c'est bien Billy
  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getUser();
      const userEmail = data?.user?.email;

      if (userEmail !== 'billy.thomont@univ-reunion.fr') {
        alert('Accès refusé : réservé à l’administrateur.');
        navigate('/login-ecole');
      }
    };

    checkAdmin();
  }, [navigate]);

  useEffect(() => {
    const fetchAllStudents = async () => {
      const { data, error } = await supabase
        .from('students')
        .select('id, first_name, last_name, created_by, answers(is_correct, question_id)');

      if (!error) {
        setStudents(data);
        setLoading(false);
      }
    };

    fetchAllStudents();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login-ecole');
  };

  const handleGoToCreateSchool = () => {
    navigate('/nouvelle-ecole');
  };

  if (loading) return <p className="p-6 text-white">Chargement des données…</p>;

  return (
    <>
      <div className="p-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl">Dashboard Administrateur</h1>
          <div className="flex gap-4">
            <button
              onClick={handleGoToCreateSchool}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              ➕ Créer une école
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Déconnexion
            </button>
          </div>
        </div>

        <table className="w-full border border-gray-300 table-auto text-black bg-white rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Prénom</th>
              <th className="p-2 border">Nom</th>
              <th className="p-2 border">École (user_id)</th>
              <th className="p-2 border">Score</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => {
              const score = s.answers?.filter((a) => a.is_correct).length || 0;
              return (
                <tr key={s.id}>
                  <td className="p-2 border">{s.first_name}</td>
                  <td className="p-2 border">{s.last_name}</td>
                  <td className="p-2 border">{s.created_by}</td>
                  <td className="p-2 border">{score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <GalaxyBackground />
    </>
  );
}
