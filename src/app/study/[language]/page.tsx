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

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;

    // Update user answers
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(newUserAnswers);

    // Update score
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    setSelectedOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Store questions and user answers in localStorage
      localStorage.setItem("quizQuestions", JSON.stringify(questions));
      localStorage.setItem("quizUserAnswers", JSON.stringify(newUserAnswers));
      // Redirect to results with only score and total
      router.push(`/results?score=${score}&total=${questions.length}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <p className="text-xl">Loading questions...</p>
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
    <div className="min-h-screen flex flex-col items-center bg-white px-6 py-12">
      <h2 className="text-3xl font-semibold mb-8">
        {language} Quiz - {level.charAt(0).toUpperCase() + level.slice(1)} Level
      </h2>

      {currentQuestion && (
        <div className="w-full max-w-2xl bg-gray-100 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            Question {currentQuestionIndex + 1}: {currentQuestion.text}
          </h3>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={`block w-full text-left p-3 rounded-lg border ${
                  selectedOption === option
                    ? "bg-green-200 border-green-600"
                    : "bg-white border-gray-300"
                } hover:bg-gray-200 transition duration-300`}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
            className={`mt-6 px-4 py-2 rounded ${
              selectedOption === null
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
          </button>
        </div>
      )}
    </div>
  );
}