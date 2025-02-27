import React, { useState, useRef, useEffect } from 'react';

import { Questions10km } from './questions/10km';
import { Questions20km } from './questions/20km';
import { Questions30km } from './questions/30km';
import { Questions40km } from './questions/40km';
import { Questions50km } from './questions/50km';
import { Questions60km } from './questions/60km';
import { Questions70km } from './questions/70km';
import { Questions80km } from './questions/80km';
import { Questions90km } from './questions/90km';
import { Questions100km } from './questions/100km';

import QuizQuestions from './QuizQuestions';
import GalaxyBackground from '../backgrounds/GalaxyBackground';

function Quiz() {
    const [score, setScore] = useState(0);
    const [activeStep, setActiveStep] = useState(null);
    const containerRef = useRef(null); 
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
    };

    

    const STEPS = [
        { name: '10km', questions: Questions10km, decor: DECORS.decor_10km, decorMobile: DECORS.decorMobile_10km},
        { name: '20km', questions: Questions20km, decor: DECORS.decor_20km, decorMobile: DECORS.decorMobile_20km },
        { name: '30km', questions: Questions30km, decor: DECORS.decor_30km, decorMobile: DECORS.decorMobile_30km},
        { name: '40km', questions: Questions40km, decor: DECORS.decor_40km, decorMobile: DECORS.decorMobile_40km },
        { name: '50km', questions: Questions50km, decor: DECORS.decor_50km, decorMobile: DECORS.decorMobile_50km },
        { name: '60km', questions: Questions60km, decor: DECORS.decor_60km, decorMobile: DECORS.decorMobile_60km },
        { name: '70km', questions: Questions70km, decor: DECORS.decor_70km, decorMobile: DECORS.decorMobile_70km },
        { name: '80km', questions: Questions80km, decor: DECORS.decor_80km, decorMobile: DECORS.decorMobile_80km },
        { name: '90km', questions: Questions90km, decor: DECORS.decor_90km, decorMobile: DECORS.decorMobile_90km },
        { name: '100km', questions: Questions100km, decor: DECORS.decor_100km, decorMobile: DECORS.decorMobile_100km },
    ]

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
                                                    ${index > maxUnlockedStep ? 'border-[#00d0e3] opacity-30' :
                                                    index === maxUnlockedStep ? 'border-[#00d0e3] opacity-30' :
                                                    index === maxUnlockedStep && score <= scoreSuccessLimit ? 'border-[#00d0e3]' :
                                                    'border-[#edc314]'}`} 
                                    />
                                    <button 
                                        ref={stepsRefs.current[index]}
                                        key={index} 
                                        onClick={() => handleStepClick(index)}
                                        disabled={index > maxUnlockedStep}
                                        className={`relative bg-[rgba(0,208,227,1)] border-[2px] border-[#00d0e3] rounded-full stepShadow backdrop-blur-md backdrop-shadow-md p-10 w-[vw] text-xl 
                                                    ${index > maxUnlockedStep ? 'opacity-30 cursor-not-allowed' : 
                                                    index === maxUnlockedStep ? 'gradiantSolar hover:scale-105' :
                                                    index === maxUnlockedStep && score <= scoreSuccessLimit ? 'bg-[rgba(193,17,17,0.9)] ' :
                                                    'gradiantGold border border-[#edc314] hover:scale-105'}`}
                                    >
                                        <div className={`absolute top-0 right-0 px-4 rounded-full backdrop-shadow-md
                                                        ${index > maxUnlockedStep ? 'bg-[rgba(0,208,227,0.7)]' : 
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
