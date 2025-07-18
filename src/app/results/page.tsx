"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get("score") || "0", 10);
  const total = parseInt(searchParams.get("total") || "0", 10);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);

  useEffect(() => {
    // Retrieve data from localStorage
    const storedQuestions = localStorage.getItem("quizQuestions");
    const storedUserAnswers = localStorage.getItem("quizUserAnswers");

    try {
      if (storedQuestions && storedUserAnswers) {
        setQuestions(JSON.parse(storedQuestions));
        setUserAnswers(JSON.parse(storedUserAnswers));
      }
      // Clear localStorage to avoid stale data
      localStorage.removeItem("quizQuestions");
      localStorage.removeItem("quizUserAnswers");
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-white px-6 py-12">
      <h2 className="text-3xl font-semibold mb-8">Quiz Results</h2>
      <div className="w-full max-w-2xl bg-gray-100 p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-bold mb-4">
          Your Score: {score} out of {total}
        </h3>
        <p className="text-lg mb-6">
          {score === total
            ? "Perfect score! Amazing job!"
            : `You got ${total > 0 ? ((score / total) * 100).toFixed(2) : 0}% correct. Keep practicing!`}
        </p>

        <h4 className="text-xl font-semibold mb-4">Question Review</h4>
        {questions.length > 0 && userAnswers.length === questions.length ? (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={question.id} className="p-4 bg-white rounded-lg border border-gray-300">
                <p className="font-medium mb-2">
                  Question {question.id}: {question.text}
                </p>
                <p
                  className={`mb-2 ${
                    userAnswers[index] === question.correctAnswer
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Your Answer: {userAnswers[index] || "Not answered"}
                </p>
                <p className="text-green-600">
                  Correct Answer: {question.correctAnswer}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-600">Unable to load question details or answers.</p>
        )}

        <button
          onClick={() => window.location.href = "/"}
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}