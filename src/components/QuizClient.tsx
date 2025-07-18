// "use client";

// import { useSearchParams } from "next/navigation";
// import { useState } from "react";

// type QuizQuestion = {
//   question: string;
//   options: string[];
//   answer: string;
// };

// export default function QuizClient({ language }: { language: string }) {
//   const searchParams = useSearchParams();
//   const level = searchParams.get("level");
//   const goal = searchParams.get("goal");

//   const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [showQuiz, setShowQuiz] = useState(false);

//   const handleStartQuiz = async () => {
//     setLoading(true);
//     setShowQuiz(true);

//     const prompt = `Generate 5 multiple choice questions (MCQs) on ${language} for a ${level} learner aiming for ${goal} preparation. Each question should have 4 options and also provide the correct answer in JSON format like:

// [
//   {
//     "question": "What is Python used for?",
//     "options": ["Web Development", "Data Science", "Automation", "All of the above"],
//     "answer": "All of the above"
//   },
//   ...
// ]`;

//     try {
//       const response = await fetch("/api/gemini-quiz", {
//         method: "POST",
//         body: JSON.stringify({ prompt }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await response.json();
//       if (!data.response) {
//         console.error("Gemini API did not return a response:", data);
//         alert("No response received from Gemini. Please try again.");
//         setLoading(false);
//         return;
//       }

//       const cleaned = data.response.trim().replace(/^```(json)?\n?|\n?```$/g, "");


//       try {
//         const parsed = JSON.parse(cleaned);
//         setQuiz(parsed);
//       } catch (parseError) {
//         console.error("Failed to parse Gemini response:", cleaned);
//         alert("Gemini returned an invalid response. Try again.");
//         setQuiz([]);
//       }

//     } catch (error) {
//       console.error("Error fetching quiz:", error);
//       setQuiz([]);
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="min-h-screen px-6 py-12 flex flex-col items-center justify-center bg-gray-50">
//       <h1 className="text-4xl font-bold mb-6">Quiz: {language.toUpperCase()}</h1>

//       {!showQuiz && (
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl text-center">
//           <p className="mb-4 text-lg">
//             <strong>Level:</strong> {level}
//           </p>
//           <p className="mb-4 text-lg">
//             <strong>Goal:</strong> {goal}
//           </p>

//           <p className="text-gray-600 mb-6">Click Start to generate quiz using Gemini AI</p>

//           <button
//             onClick={handleStartQuiz}
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//             disabled={loading}
//           >
//             {loading ? "Generating..." : "Start Quiz"}
//           </button>
//         </div>
//       )}

//       {showQuiz && !loading && quiz.length > 0 && (
//         <div className="w-full max-w-3xl bg-white p-6 mt-6 rounded shadow">
//           {quiz.map((q, idx) => (
//             <div key={idx} className="mb-6">
//               <h3 className="font-semibold mb-2">{idx + 1}. {q.question}</h3>
//               <ul className="space-y-1">
//                 {q.options.map((opt, i) => (
//                   <li key={i} className="ml-4 list-disc">{opt}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
