"use client";

import { useState, useEffect, MouseEvent } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [level, setLevel] = useState("beginner");
  const [goal, setGoal] = useState("college");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isStudyHeaderVisible, setIsStudyHeaderVisible] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const router = useRouter();

  // Scroll to Home section on page reload
  useEffect(() => {
    const homeSection = document.getElementById("home");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Handle modal open/close with smooth transition
  useEffect(() => {
    if (selectedLang) {
      setIsModalOpen(true);
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      setIsModalOpen(false);
      document.body.style.overflow = "auto"; // Enable scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [selectedLang]);

  // Handle About Us header animation on scroll
  useEffect(() => {
    const aboutSection = document.getElementById("about");
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderVisible(entry.isIntersecting);
      },
      { threshold: 0.2 } // Trigger when 10% of section is visible
    );

    if (aboutSection) {
      observer.observe(aboutSection);
    }

    return () => {
      if (aboutSection) {
        observer.unobserve(aboutSection);
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsHeroVisible(true);
    }, 100); // 100ms delay
  }, []);

  // Handle Quiz Zone header animation on scroll
  useEffect(() => {
    const studySection = document.getElementById("study");
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStudyHeaderVisible(entry.isIntersecting);
      },
      { threshold: 0.2 } // Trigger when 20% of section is visible
    );

    if (studySection) {
      observer.observe(studySection);
    }

    return () => {
      if (studySection) {
        observer.unobserve(studySection);
      }
    };
  }, []);

  const handleSubmit = () => {
    if (selectedLang) {
      const path = `/study/${selectedLang.toLowerCase()}?level=${level}&goal=${goal}`;
      router.push(path);
    }
  };

  // Close modal when clicking outside
  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedLang(null);
    }
  };

  const languages = ["C", "C++", "Python", "Java", "JavaScript", "Matlab"];

  return (
    <div className="text-black">
      {/* Home Section */}
      <section id="home" className="h-screen flex flex-row justify-center items-center bg-[#CFFFE2] px-6">
        {/* Left Side (Text Content) */}
        <div className="flex-1 flex flex-col justify-center items-start px-8">
          <h1
            className={`text-6xl font-bold mb-8 max-w-2xl text-left transition-transform duration-700 ease-in-out ${
              isHeroVisible ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            Level Up Your Programming Skills with AI-Powered Quizzes
          </h1>
          <p className="mb-6 text-2xl font-semibold text-green-900 max-w-xl text-left">
            Practice coding skills with tailored quizzes for C, Python, Java, and more!
          </p>
          <button
            onClick={() =>
              document.getElementById("study")?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-[#0b9614] text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200"
          >
            Start Learning
          </button>
        </div>

        {/* Right Side (Logo + Horizontal Images Layout) */}
        <div className="flex-1 flex flex-col justify-center items-center mt-[80px] gap-6">
          {/* Logo */}
          <img
            src="logo.png"
            alt="Quiz App Hero"
            className="h-60 w-60 rounded-full object-cover bg-transparent shadow-xl mb-4"
          />

          {/* Animated Images */}
          <div
            className={`flex flex-col items-center gap-4 transition-transform duration-700 ease-in-out ${
              isHeroVisible ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* First Row: Image 1 & Image 2 */}
            <div className="flex flex-row gap-4">
              <img
                src="img1.png"
                alt="Image 1"
                className="h-36 w-52 rounded-xl shadow-lg object-cover opacity-80"
              />
              <img
                src="img2.jpg"
                alt="Image 2"
                className="h-36 w-52 rounded-xl shadow-lg object-cover opacity-80"
              />
            </div>

            {/* Second Row: Image 3 centered */}
            <img
              src="img3.png"
              alt="Image 3"
              className="h-36 w-52 rounded-xl shadow-lg object-cover opacity-80 mt-2"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="h-screen flex flex-col justify-center items-center bg-[#A2D5C6] px-6">
        <div
          className={`text-2xl bg-green-500 px-4 py-2 rounded-4xl font-semibold mb-8 text-center transition-transform duration-700 ease-in-out ${
            isHeaderVisible ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          About Us
          
        </div>

        <div className="bg-transparent text-base max-w-[800px] text-justify">Quizzeria is an interactive quiz app built with Next.js and Tailwind CSS, designed to help users practice and improve their programming skills through AI-generated quizzes. With support for multiple programming languages, levels, and goals, it’s ideal for students and job seekers alike.</div>
      </section>

      {/* Study Zone Section */}
      <section id="study" className="min-h-screen flex flex-col justify-start items-center bg-[#88B5A5] py-6 pt-24">
        <div
          className={`text-2xl bg-black text-green-300 px-4 py-2 rounded-4xl font-semibold mb-8 text-center transition-transform duration-700 ease-in-out ${
            isStudyHeaderVisible ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          Quiz Zone
        </div>

        {/* Language Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl place-items-center">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              className="block p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-in-out w-full max-w-xs"
            >
              <img
                src={`/${lang.toLowerCase()}.png`}
                alt={`${lang} logo`}
                className="h-24 w-auto mx-auto transform hover:scale-110 transition-transform duration-200 ease-in-out"
              />
            </button>
          ))}
        </div>

        {/* Modal Form */}
        {selectedLang && (
          <div
            className="fixed inset-0 flex justify-center items-center z-50"
            onClick={handleOutsideClick}
          >
            <div
              className={`bg-[#cae3cc] p-8 rounded-2xl shadow-2xl max-w-md w-full relative transform transition-all duration-300 ease-in-out ${
                isModalOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <button
                className="absolute top-3 right-3 text-gray-500 text-xl hover:text-gray-700 transition-colors duration-200"
                onClick={() => setSelectedLang(null)}
              >
                ×
              </button>
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                {selectedLang}
              </h3>

              {/* Level Input */}
              <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-700">Select Level:</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Goal Input */}
              <div className="mb-8">
                <label className="block mb-2 font-medium text-gray-700">Your Goal:</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                >
                  <option value="college">College</option>
                  <option value="job">Job</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
                  className="bg-[#0b9614] text-white px-6 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}