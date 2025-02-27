import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function QuizQuestions({ score, setScore, setActiveStep, step, setMaxUnlockedStep, questions, scoreSuccessLimit }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handleAnswer = (index) => {
        if (questions[currentQuestion].correct === index) {
            setScore(prevScore => prevScore + 1);
        }

        setCurrentQuestion(prevQuestion => prevQuestion + 1);
    };

    const advanceStep = () => {
        setScore(0);
        setCurrentQuestion(0);
    };

    const retryQuiz = () => {
        setScore(0);
        setCurrentQuestion(0);
    };
    
    const continueQuiz = () => {
        if (score >= scoreSuccessLimit) {
            advanceStep();
        }
        setScore(0);
        setCurrentQuestion(0);
        setActiveStep(null)
        setMaxUnlockedStep(prevStep => prevStep + 1);
    };    

    const handleClose = () => {
        setScore(0);
        setCurrentQuestion(0);
        setActiveStep(null);
    };
    

    return (
        <>
        <div className="flex h-full">
            <div className='relative text-center description2 backdrop-blur-sm w-[100vw] h-[90vh] pb-4'>
                
                {currentQuestion < questions.length ? (
                    // Render questions
                    <>
                        <div className='w-full h-[40vh]'
                            style={{
                                backgroundImage: `linear-gradient(rgba(0,208,227,0.5), rgba(0,208,227,0.7)), url(${questions[currentQuestion].image})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundColor: 'rgba(0,208,227,0.3)'
                            }}
                        >
                            {/* ProgressBar */}
                            <div className="relative w-full h-2 bg-[rgba(0,0,0,0.2)] mb-8 drop-shadow-md">
                            <div style={{ 
                                            width: `${(currentQuestion + 1) / questions.length * 100}%`, 
                                            backgroundColor: '#00d0e3' 
                                        }} className="h-full"></div>
                            </div>
                            <div className="absolute top-[2.5vh] left-[2vh] cursor-pointer hover:drop-shadow-md" onClick={() => handleClose()}>
                                <FaTimes size={20} color="white" />
                            </div>
                            <p className="absolute top-[2vh] right-[2vh] text-white font-Orbitron">Hauteur: {step}</p>
                            <p className='relative font-bold bg-[rgba(0,0,0,0.3)] mt-10 p-10 text-white'>{questions[currentQuestion].question}</p>
                        </div>
                        
                        <div className='flex flex-col justify-center items-center py-4 mt-10'>
                        {questions[currentQuestion].answers.map((answer, index) => (
                            <button key={index} onClick={() => handleAnswer(index)}
                                className='bg-[rgba(0,208,227,0.1)] hoverGradiantAnimator hover:scale-105 w-[70%] px-4 py-4 mb-2'>
                                {answer}
                            </button>
                        ))}
                        </div>
                    </>
                ) : (
                    // Render score
                    <>
                    <div className='w-full h-[40vh] flex items-center justify-center'
                            style={{
                                backgroundImage: `linear-gradient(rgba(0,208,227,0.5), rgba(0,208,227,0.9))`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundColor: 'rgba(0,208,227,0.3)'
                            }}
                    >
                        <p className="absolute top-[2vh] right-[2vh] text-white font-Orbitron">Hauteur: {step}</p>
                        <h2 className={`text-2xl max-sm:text-xl font-Orbitron my-10`}>
                            {score < 4 ? 'Vous pouvez le faire' : (score >= scoreSuccessLimit ? 'Félicitations !' : 'Presque')}
                        </h2>
                    </div>
                    <p className="text-xl font-Orbitron text-white mt-10 mb-6">Votre score est:
                    <br /><br />
                    <span className='text-6xl'>{score} / {questions.length}</span></p>

                    <div className='flex flex-row flex-wrap justify-center text-xl font-Orbitron'>
                        {score >= scoreSuccessLimit ?
                            <button 
                                className='bg-[rgba(0,208,227,0.1)] hoverGradiantAnimator hover:scale-110 p-4 m-4'
                                onClick={continueQuiz}
                            >
                                Continuer
                            </button>
                        :
                            <button 
                                className='bg-[rgba(0,208,227,0.1)] hoverGradiantAnimator hover:scale-110 p-4 m-4'
                                onClick={retryQuiz}
                            >
                                Réessayer
                            </button>
                        }
                    </div>
                    </>
                    )}
                <div className='horizontal-line' />
            </div>
        </div>
        </>
    );
    
    
}

export default QuizQuestions;