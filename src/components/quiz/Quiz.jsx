import React, { useState, useRef, useEffect } from 'react';
import Loader from '../Loader';
import QuizQuestions from './QuizQuestions';
import GalaxyBackground from '../backgrounds/GalaxyBackground';
import { QUIZ_QUESTIONS } from './questionsData';
import QuizSetup from './QuizSetup';
import { supabase } from '../../lib/supabaseClient';

function Quiz() {
    const [studentId, setStudentId] = useState(null);
    const [score, setScore] = useState(0);
    const [activeStep, setActiveStep] = useState(null);
    const containerRef = useRef(null); 
    const [loading, setLoading] = useState(true);
    const scoreSuccessLimit = 1; // Limite pour le success score
    const [activeSectionIndex, setActiveSectionIndex] = useState(1); // start with the troposphere section by default

    // Décors
    const DECORS = {
        decor_10km: {
            backgroundImage: `url('${process.env.PUBLIC_URL}/data/quizImages/decors/10km.jpg')`,
            backgroundSize: 'cover',
        },
        decorMobile_10km: {
            backgroundImage: `url('${process.env.PUBLIC_URL}/data/quizImages/decors/mobile_10km.jpg')`,
            backgroundSize: 'cover',
        },
        decor_20km: {
            backgroundImage: `url('${process.env.PUBLIC_URL}/data/quizImages/decors/20km.jpg')`,
            backgroundSize: 'cover',
        },
        decorMobile_20km: {
            backgroundImage: `url('${process.env.PUBLIC_URL}/data/quizImages/decors/mobile_20km.jpg')`,
            backgroundSize: 'cover',
        },
        decor_30km: {
            backgroundImage: `url('${process.env.PUBLIC_URL}/data/quizImages/decors/30km.jpg')`,
            backgroundSize: 'cover',
        },
        decorMobile_30km: {
            backgroundImage: `url('${process.env.PUBLIC_URL}/data/quizImages/decors/mobile_30km.jpg')`,
            backgroundSize: 'cover',
        },
        decor_40km: {
            backgroundImage: `url('${process.env.PUBLIC_URL}/data/quizImages/decors/40km.jpg')`,
            backgroundSize: 'cover',
        },
        decorMobile_40km: {
            backgroundImage: `url('${process.env.PUBLIC_URL}/data/quizImages/decors/mobile_40km.jpg')`,
            backgroundSize: 'cover',
        },
        decor_50km: {
            backgroundImage: `url('${process.env.PUBLIC_URL}/data/quizImages/decors/50km.jpg')`,
            backgroundSize: 'cover',
        },
        decorMobile_50km: {
            backgroundImage: `url('${process.env.PUBLIC_URL}/data/quizImages/decors/mobile_50km.jpg')`,
            backgroundSize: 'cover',
        },
        decor_60km: {
            backgroundImage: `url('${process.env.PUBLIC_URL}/data/quizImages/decors/60km.jpg')`,
            backgroundSize: 'cover',
        },
        decorMobile_60km: {
            backgroundImage: `url('${process.env.PUBLIC_URL}/data/quizImages/decors/mobile_60km.jpg')`,
            backgroundSize: 'cover',
        },
        decor_70km: {
            backgroundImage: `url('${process.env.PUBLIC_URL}/data/quizImages/decors/70km.jpg')`,
            backgroundSize: 'cover',
        },
        decorMobile_70km: {
            backgroundImage: `url('${process.env.PUBLIC_URL}/data/quizImages/decors/mobile_70km.jpg')`,
            backgroundSize: 'cover',
        },
        decor_80km: {
            backgroundImage: `url('${process.env.PUBLIC_URL}/data/quizImages/decors/80km.jpg')`,
            backgroundSize: 'cover',
        },
        decorMobile_80km: {
            backgroundImage: `url('${process.env.PUBLIC_URL}/data/quizImages/decors/mobile_80km.jpg')`,
            backgroundSize: 'cover',
        },
        decor_90km: {
            backgroundImage: `url('${process.env.PUBLIC_URL}/data/quizImages/decors/90km.jpg')`,
            backgroundSize: 'cover',
        },
        decorMobile_90km: {
            backgroundImage: `url('${process.env.PUBLIC_URL}/data/quizImages/decors/mobile_90km.jpg')`,
            backgroundSize: 'cover',
        },
        decor_100km: {
            backgroundImage: `url('${process.env.PUBLIC_URL}/data/quizImages/decors/100km.jpg')`,
            backgroundSize: 'cover',
        },
        decorMobile_100km: {
            backgroundImage: `url('${process.env.PUBLIC_URL}/data/quizImages/decors/mobile_100km.jpg')`,
            backgroundSize: 'cover',
        },
    };

    // Paliers
    const STEP_ALTITUDES = ['10km', '20km', '30km', '40km', '50km', '60km', '70km', '80km', '90km', '100km'];

    const STEPS = STEP_ALTITUDES.map((alt) => ({
    name: alt,
    questions: QUIZ_QUESTIONS[alt],
    decor: DECORS[`decor_${alt}`],
    decorMobile: DECORS[`decorMobile_${alt}`],
    }));

    const handleStepCompletion = (stepIndex) => {
        // If it's the last step of the current section
        if (stepIndex === STEPS.length - 1) {
            setActiveSectionIndex(prevSectionIndex => prevSectionIndex + 1);
        }
        // other logic for step completion...
    }

    let cumulativeSteps = 0;
    let currentSection = null;
    let currentStep = null;

    for (let step of STEPS) {
        if (cumulativeSteps === activeStep) {
            currentStep = step;
            break;
        }
        cumulativeSteps++;
    }
    

    const totalStepsLength = STEPS.length;
    const [scores, setScores] = useState(Array(totalStepsLength).fill(0));
    const stepsRefs = useRef(Array(totalStepsLength).fill(0).map(() => React.createRef()));
    const [maxUnlockedStep, setMaxUnlockedStep] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 

    const handleStepClick = (index) => {
        if (index <= maxUnlockedStep) {
            setActiveStep(index);
            stepsRefs.current[index].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            console.log(index);
        }
    };

    useEffect(() => {
        setScores(prevScores => {
            const updatedScores = [...prevScores];
            updatedScores[activeStep] = score;
            return updatedScores;
        }); 
    }, [activeStep, score]);    

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo(0, containerRef.current.scrollHeight);  // Fait défiler la div en bas à l'ouverture
        }
    }, []);

    const [schoolLevel, setSchoolLevel] = useState(null);

    useEffect(() => {
    const fetchSchoolLevel = async () => {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user?.email) return;

        const { data, error } = await supabase
        .from('schools')
        .select('level')
        .eq('email', userData.user.email)
        .single();

        if (!error && data?.level) {
        setSchoolLevel(data.level);
        } else {
        setSchoolLevel('college'); // fallback
        }
    };
        fetchSchoolLevel();
    }, []);


    useEffect(() => {
        const imageUrls = [
            `${process.env.PUBLIC_URL}/data/quizImages/decors/10km.jpg`,
            `${process.env.PUBLIC_URL}/data/quizImages/decors/mobile_10km.jpg`,
            `${process.env.PUBLIC_URL}/data/quizImages/decors/20km.jpg`,
            `${process.env.PUBLIC_URL}/data/quizImages/decors/mobile_20km.jpg`,
            `${process.env.PUBLIC_URL}/data/quizImages/decors/30km.jpg`,
            `${process.env.PUBLIC_URL}/data/quizImages/decors/mobile_30km.jpg`,
            `${process.env.PUBLIC_URL}/data/quizImages/decors/40km.jpg`,
            `${process.env.PUBLIC_URL}/data/quizImages/decors/mobile_40km.jpg`,
            `${process.env.PUBLIC_URL}/data/quizImages/decors/50km.jpg`,
            `${process.env.PUBLIC_URL}/data/quizImages/decors/mobile_50km.jpg`,
            `${process.env.PUBLIC_URL}/data/quizImages/decors/60km.jpg`,
            `${process.env.PUBLIC_URL}/data/quizImages/decors/mobile_60km.jpg`,
            `${process.env.PUBLIC_URL}/data/quizImages/decors/70km.jpg`,
            `${process.env.PUBLIC_URL}/data/quizImages/decors/mobile_70km.jpg`,
            `${process.env.PUBLIC_URL}/data/quizImages/decors/80km.jpg`,
            `${process.env.PUBLIC_URL}/data/quizImages/decors/mobile_80km.jpg`,
            `${process.env.PUBLIC_URL}/data/quizImages/decors/90km.jpg`,
            `${process.env.PUBLIC_URL}/data/quizImages/decors/mobile_90km.jpg`,
            `${process.env.PUBLIC_URL}/data/quizImages/decors/100km.jpg`,
            `${process.env.PUBLIC_URL}/data/quizImages/decors/mobile_100km.jpg`
        ];

        let loadedImages = 0;
        imageUrls.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedImages++;
                if (loadedImages === imageUrls.length) {
                    setLoading(false);
                }
            };
        });
    }, []);

    const questions = QUIZ_QUESTIONS[schoolLevel];

    if (loading) {
        return <Loader />;
    }

    if (!studentId) {
    return <QuizSetup onStudentCreated={(student) => setStudentId(student.id)} />;
    }

    return (
        <>
            <div ref={containerRef} className="relative flex justify-center justify-end overflow-y-auto no-scrollbar">
                <div className='flex flex-col flex-col-reverse justify-center items-center text-center w-[100vw] overflow-y-auto no-scrollbar'>
                    {activeStep === null ? (
                        // Afficher les paliers
                        STEPS.map((step, index) => (
                            <div key={index} style={isMobile ? step.decorMobile : step.decor}
                                className='justify-center items-center text-center w-[100vw] h-[30vh] overflow-y-auto no-scrollbar'>                    
                                <>
                                    <div 
                                        key={index}
                                        className={`h-[7vh] bg-transparent border-l-2 border-dashed self-center
                                                    ${index > maxUnlockedStep ? 'border-[#00d0e3] opacity-70' :
                                                    index === maxUnlockedStep ? 'border-[#00d0e3] opacity-70' :
                                                    index === maxUnlockedStep && score <= scoreSuccessLimit ? 'border-[#00d0e3]' :
                                                    'border-[#edc314]'}`} 
                                    />
                                    <button 
                                        ref={stepsRefs.current[index]}
                                        key={index} 
                                        onClick={() => handleStepClick(index)}
                                        disabled={index > maxUnlockedStep}
                                        className={`relative bg-[rgba(0,208,227,1)] border-[3px] border-[#00d0e3] rounded-lg stepShadow backdrop-blur-md shadow-xl p-10 w-[vw] text-xl 
                                                    ${index > maxUnlockedStep ? 'opacity-60 cursor-not-allowed bg-[rgba(0,208,227,0.05)] backdrop-blur-xl' : 
                                                    index === maxUnlockedStep ? 'gradiantSolar hover:scale-105' :
                                                    index === maxUnlockedStep && score <= scoreSuccessLimit ? 'bg-[rgba(193,17,17,0.9)]' :
                                                    'gradiantGold border border-[#edc314] hover:scale-105'}`}
                                    >
                                        <div className={`absolute top-0 left-0 right-0 rounded-t-md mx-auto px-4 shadow-xl
                                                        ${index > maxUnlockedStep ? 'opacity-0' : 
                                                        index < maxUnlockedStep ? 'bg-[rgba(227,193,0,0.9)]' :
                                                        index === maxUnlockedStep && score <= scoreSuccessLimit ? 'bg-[rgba(193,17,17,0.9)]' :
                                                        'bg-[rgba(0,208,227,0.7)]'}`}>
                                            {scores[index]}/10
                                        </div>
                                        {step.name}
                                    </button>
                                </>
                            </div>
                            ))
                        )   : (
                        // Afficher les questions du palier
                        <>
                            <QuizQuestions 
                                score={score} 
                                setScore={setScore} 
                                questions={currentStep.questions}
                                setActiveStep={setActiveStep} 
                                step={currentStep.name}
                                setMaxUnlockedStep={setMaxUnlockedStep} 
                                scoreSuccessLimit={scoreSuccessLimit}
                            />
                        </>
                    )}
                </div>
            </div>
            <GalaxyBackground />
        </>
    );
}

export default Quiz;
