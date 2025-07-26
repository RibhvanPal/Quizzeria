"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

export default function QuizPage({ params }: { params: { language: string } }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  const searchParams = useSearchParams();
  const router = useRouter();
  const level = searchParams.get("level") || "beginner";
  const goal = searchParams.get("goal") || "college";
  const language = params.language;

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        const response = await fetch("/api/quiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language,
            level,
            goal,
            numQuestions: 10,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();
        setQuestions(data.questions);
        setUserAnswers(new Array(data.questions.length).fill(null));
        setLoading(false);
      } catch (err) {
        setError("Failed to load questions. Please try again.");
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [language, level, goal]);

  useEffect(() => {
    if (timeLeft <= 0) {
      localStorage.setItem("quizQuestions", JSON.stringify(questions));
      localStorage.setItem("quizUserAnswers", JSON.stringify(userAnswers));
      router.push(`/results?score=${score}&total=${questions.length}`);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, questions, userAnswers, score, router]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = option;
    setUserAnswers(newUserAnswers);
    // Reset score and recalculate to handle answer changes
    const newScore = newUserAnswers.reduce((acc, answer, index) => {
      return answer === questions[index]?.correctAnswer ? acc + 1 : acc;
    }, 0);
    setScore(newScore);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setSelectedOption(userAnswers[currentQuestionIndex + 1] || null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleFinishQuiz = () => {
    localStorage.setItem("quizQuestions", JSON.stringify(questions));
    localStorage.setItem("quizUserAnswers", JSON.stringify(userAnswers));
    router.push(`/results?score=${score}&total=${questions.length}`);
  };

  const handleQuestionNavigation = (index: number) => {
    setCurrentQuestionIndex(index);
    setSelectedOption(userAnswers[index] || null);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black">
        <p className="text-xl text-white">Loading questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#21a36f] px-6 py-28">
      <style jsx>{`
        .fade-in {
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeIn 0.5s ease-out forwards;
        }
        .fade-in-container {
          opacity: 0;
          transform: scale(0.95);
          animation: fadeInScale 0.5s ease-out 0.2s forwards;
        }
        .fade-in-option {
          opacity: 0;
          transform: translateX(-20px);
          animation: fadeInSlide 0.3s ease-out forwards;
        }
        .button-hover {
          transition: transform 0.2s ease, background-color 0.2s ease;
        }
        .button-hover:hover {
          transform: scale(1.05);
          background-color: #15803d;
        }
        .button-hover:active {
          transform: scale(0.95);
        }
        .nav-button {
          transition: all 0.2s ease;
        }
        .nav-button:hover {
          transform: scale(1.1);
          background-color: #15803d;
          color: white;
        }
        .nav-button.active {
          background-color: #15803d;
          color: white;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInScale {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes fadeInSlide {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <h2 className="text-4xl font-semibold mb-8 text-white fade-in">
        Quiz - {level.charAt(0).toUpperCase() + level.slice(1)} Level
      </h2>

      <div className="w-full max-w-2xl text-black bg-[#CFFFE2] p-8 rounded-2xl shadow-lg fade-in-container">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-indigo-600 underline">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h3>
          <p className="text-lg font-semibold text-red-600">
            Time Left: {formatTime(timeLeft)}
          </p>
        </div>

        {currentQuestion && (
          <>
            <h4 className="text-2xl font-semibold mb-6 text-gray-800">
              {currentQuestion.text}
            </h4>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`block w-full text-left p-4 rounded-lg border ${
                    selectedOption === option
                      ? "bg-green-200 border-green-600 shadow-md"
                      : "bg-white border-gray-200 hover:bg-gray-100"
                  } transition duration-300 fade-in-option`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex >= questions.length - 1}
            className={`px-6 py-3 rounded-lg font-semibold shadow-md button-hover ${
              currentQuestionIndex >= questions.length - 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white"
            }`}
          >
            Next
          </button>
          <button
            onClick={handleFinishQuiz}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow-md button-hover"
          >
            Finish
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => handleQuestionNavigation(index)}
              className={`px-4 py-2 rounded-lg border border-gray-200 nav-button ${
                currentQuestionIndex === index ? "active" : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}