// src/quiz/questionsData.js
export const QUIZ_QUESTIONS = {
  '10km': [
    {
      id: 'q10_1',
      text: "Quelle est la température typique à 10 km d'altitude ?",
      options: { A: "-50°C", B: "0°C", C: "25°C" },
      correct_answer: 'A',
    },
    {
      id: 'q10_2',
      text: "Quelle pression atmosphérique trouve-t-on à 10 km ?",
      options: { A: "1 bar", B: "0.26 bar", C: "0.01 bar" },
      correct_answer: 'B',
    }
  ],
  '20km': [
    {
      id: 'q20_1',
      text: "Quelle couche de l'atmosphère se trouve à 20 km ?",
      options: { A: "Stratosphère", B: "Troposphère", C: "Mésosphère" },
      correct_answer: 'A',
    },
    {
      id: 'q20_2',
      text: "Quel gaz est le plus présent à cette altitude ?",
      options: { A: "Ozone", B: "Hydrogène", C: "CO2" },
      correct_answer: 'A',
    }
  ],
  '30km': [
    {
      id: 'q30_1',
      text: "À 30 km, l’ozone est en…",
      options: { A: "baisse", B: "pic", C: "absence totale" },
      correct_answer: 'B',
    },
    {
      id: 'q30_2',
      text: "Quel phénomène est observé à cette altitude ?",
      options: { A: "Aurores", B: "Réflexion UV", C: "Orages" },
      correct_answer: 'B',
    }
  ],
  '40km': [
    {
      id: 'q40_1',
      text: "Quel est le principal danger biologique à 40 km ?",
      options: { A: "Température", B: "Rayons UV", C: "Manque d’oxygène" },
      correct_answer: 'B',
    },
    {
      id: 'q40_2',
      text: "La densité de l’air à 40 km est environ…",
      options: { A: "10%", B: "1%", C: "0.1% de celle au sol" },
      correct_answer: 'C',
    }
  ],
  '50km': [
    {
      id: 'q50_1',
      text: "À 50 km, on atteint la…",
      options: { A: "stratopause", B: "tropopause", C: "mésopause" },
      correct_answer: 'A',
    },
    {
      id: 'q50_2',
      text: "Quelle est la température approximative ?",
      options: { A: "-2°C", B: "-50°C", C: "0°C" },
      correct_answer: 'A',
    }
  ],
  '60km': [
    {
      id: 'q60_1',
      text: "Quelle couche commence à 60 km ?",
      options: { A: "Mésosphère", B: "Thermosphère", C: "Exosphère" },
      correct_answer: 'A',
    },
    {
      id: 'q60_2',
      text: "Quel phénomène peut-on observer vers 60 km ?",
      options: { A: "Aurores", B: "Pluie de météores", C: "Nuages noctulescents" },
      correct_answer: 'B',
    }
  ],
  '70km': [
    {
      id: 'q70_1',
      text: "À cette altitude, les météorites…",
      options: { A: "commencent à se désintégrer", B: "touchent le sol", C: "s’accumulent" },
      correct_answer: 'A',
    },
    {
      id: 'q70_2',
      text: "La pression y est…",
      options: { A: "proche du vide", B: "stable", C: "égale à 0.5 bar" },
      correct_answer: 'A',
    }
  ],
  '80km': [
    {
      id: 'q80_1',
      text: "Quel est l’état de l’eau à 80 km ?",
      options: { A: "Liquide", B: "Vapeur uniquement", C: "Solide" },
      correct_answer: 'B',
    },
    {
      id: 'q80_2',
      text: "Qu’observe-t-on la nuit à cette altitude ?",
      options: { A: "Ciel noir pur", B: "Nuages noctulescents", C: "Éclairs" },
      correct_answer: 'B',
    }
  ],
  '90km': [
    {
      id: 'q90_1',
      text: "Quelle limite approche-t-on à 90 km ?",
      options: { A: "Espace", B: "Ionosphère", C: "Mésopause" },
      correct_answer: 'C',
    },
    {
      id: 'q90_2',
      text: "Quel gaz domine à cette altitude ?",
      options: { A: "Azote", B: "Oxygène", C: "Hélium" },
      correct_answer: 'C',
    }
  ],
  '100km': [
    {
      id: 'q100_1',
      text: "Quelle frontière est définie à 100 km ?",
      options: { A: "Ligne de Kármán", B: "Ligne Armstrong", C: "Ligne d’horizon" },
      correct_answer: 'A',
    },
    {
      id: 'q100_2',
      text: "À cette altitude, un objet est considéré comme…",
      options: { A: "encore atmosphérique", B: "en orbite basse", C: "dans l’espace" },
      correct_answer: 'C',
    }
  ],
};