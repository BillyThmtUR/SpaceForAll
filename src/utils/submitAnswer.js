// src/utils/submitAnswer.js
import { supabase } from '../lib/supabaseClient';

export const submitAnswer = async ({ studentId, question }) => {
  const isCorrect = question.selected === question.correct_answer;

  

  const { error } = await supabase.from('answers').insert({
    student_id: studentId,
    question_id: question.id,
    selected_option: question.selected,
    is_correct: isCorrect,
  });

  if (error) {
    console.error('Erreur lors de la soumission :', error.message);
    throw error;
  }

  return isCorrect;
};
