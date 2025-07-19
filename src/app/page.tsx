"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [level, setLevel] = useState("beginner");
  const [goal, setGoal] = useState("college");

  const router = useRouter();

  const handleSubmit = () => {
    if (selectedLang) {
      const path = `/study/${selectedLang.toLowerCase()}?level=${level}&goal=${goal}`;
      router.push(path);
    }
  };

  const languages = ["C", "C++", "Python", "Java", "JavaScript", "Matlab"];

  return (
    <div className="text-black">
      {/* Home Section */}
      <section id="home" className="h-screen flex flex-col justify-center items-center bg-[#CFFFE2]">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Quiz App</h1>
        <p className="mb-6 text-center">Start your journey to mastering knowledge.</p>
      </section>

      {/* About Section */}
      <section id="about" className="h-screen flex flex-col justify-center items-center bg-[#A2D5C6]">
        <h2 className="text-3xl font-semibold mb-4">About Us</h2>
        <p className="max-w-xl text-center">
          We’re here to help students grow through quizzes and learning tools.
        </p>
      </section>

      {/* Study Zone Section */}
      <section id="study" className="min-h-screen flex flex-col justify-center items-center bg-[#88B5A5] px-6 py-12">
        <h2 className="text-3xl font-semibold mb-8">Study Zone</h2>

        {/* Language Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl place-items-center">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              className="block p-6 bg-white rounded-xl shadow-md hover:shadow-xl  hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-in-out w-full max-w-xs"
            >
              <img
                src={`/${lang.toLowerCase()}.png`}
                alt={`${lang} logo`}
                className="h-24 w-auto mx-auto"
              />
            </button>
          ))}
        </div>

        {/* Modal Form */}
        {selectedLang && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
              <button
                className="absolute top-2 right-3 text-gray-500 text-xl"
                onClick={() => setSelectedLang(null)}
              >
                ×
              </button>
              <h3 className="text-2xl font-bold mb-4">
                {selectedLang} – Choose Your Preferences
              </h3>

              {/* Level Input */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Select Level:</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Goal Input */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Your Goal:</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                >
                  <option value="college">College</option>
                  <option value="job">Job</option>
                </select>
              </div>

              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}