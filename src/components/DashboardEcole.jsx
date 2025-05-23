// 📁 src/pages/DashboardEcole.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import GalaxyBackground from './backgrounds/GalaxyBackground';

export default function DashboardEcole() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [schoolLevel, setSchoolLevel] = useState(null);
  const navigate = useNavigate();

  // Vérification de session
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/login-ecole');
      }
    };
    checkAuth();
  }, [navigate]);

  // Récupération des étudiants liés à l'utilisateur
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      const {
        data: userData,
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !userData?.user) {
        navigate('/login-ecole');
        return;
      }

      const userId = userData.user.id;

      const { data, error } = await supabase
        .from('students')
        .select('id, first_name, last_name, answers(score)')
        .eq('created_by', userId); // ← à adapter à ta structure

      if (!error) {
        setStudents(data);
      }
      setLoading(false);
    };

    fetchStudents();
  }, [navigate]);

  useEffect(() => {
  const fetchSchool = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) return;

    const { data, error: fetchError } = await supabase
      .from('schools')
      .select('level')
      .eq('email', user.email) // ou .eq('user_id', user.id) si stocké ainsi
      .single();

    if (!fetchError && data) {
      setSchoolLevel(data.level);
    }
  };

  fetchSchool();
}, []);

  if (loading) return <p className="p-4">Chargement en cours...</p>;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login-ecole');
  };

  return (
    <>
    <div className="bg-[rgba(0,208,227,0.05)] backdrop-blur-sm w-full absolute z-[1] h-full overflow-hidden">
    <div className="p-6">
      <h1 className="text-2xl mb-4 text-white">Dashboard de l'école</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-700 text-white text-center">
            <th className="p-2 border">Prénom</th>
            <th className="p-2 border">Nom</th>
            <th className="p-2 border">Score total</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const score = student.answers?.filter(a => a.is_correct)?.length || 0;
            return (
              <tr key={student.id} className="text-center">
                <td className="p-2 border">{student.first_name}</td>
                <td className="p-2 border">{student.last_name}</td>
                <td className="p-2 border">{score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Se déconnecter
        </button>
    </div>
  </div>
  <GalaxyBackground />
  </>
  );
}
