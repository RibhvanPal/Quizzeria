"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

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
    <div className="min-h-screen flex flex-col items-center bg-[#21a36f] px-6 py-28">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-semibold mb-8 text-white"
      >
        Quiz Results
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-2xl bg-[#CFFFE2] p-8 rounded-2xl shadow-lg text-black"
      >
        <h3 className="text-2xl text-indigo-600 text-center font-extrabold mb-4">
          Your Score: {score} out of {total}
        </h3>
        <p className="text-lg text-center font-semibold mb-6">
          {score === total
            ? "Perfect score! Amazing job! 🎉"
            : `You got ${total > 0 ? ((score / total) * 100).toFixed(2) : 0}% correct. Keep practicing!`}
        </p>

        <h4 className="text-3xl pt-4 text-green-800 font-semibold mb-6">Question Review</h4>
        {questions.length > 0 && userAnswers.length === questions.length ? (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <p className="font-medium mb-2 text-gray-800">
                  Question {question.id}: {question.text}
                </p>
                <p
                  className={`mb-2 font-semibold ${
                    userAnswers[index] === question.correctAnswer
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Your Answer: {userAnswers[index] || "Not answered"}
                </p>
                <p className="text-green-600 font-semibold">
                  Correct Answer: {question.correctAnswer}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-red-600 text-center">Unable to load question details or answers.</p>
        )}

        <div className="flex justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = "/"}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold shadow-md"
          >
            Back to Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}