"use client";

import React, { useEffect, useState } from "react";
import EndPage from "@/components/EndPage";
import { AnimatePresence, motion } from "framer-motion";

export default function QuizPage() {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  type Question = {
    question: string;
    options: string[];
    correct: string;
  };

  const questions = [
    {
      question: "What year did World War I start?",
      options: ["1914", "1915", "1916", "1917"],
      correct: "1914",
    },
    {
      question: "In what year did Alexander Sergeyevich Pushkin die?",
      options: ["1840", "1845", "1837", "1833"],
      correct: "1837",
    },
    {
      question: "What is the capital city of France?",
      options: ["Rome", "Berlin", "Paris", "Madrid"],
      correct: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Venus", "Mars", "Jupiter"],
      correct: "Mars",
    },
    {
      question: " Who wrote the play 'Romeo and Juliet'?",
      options: [
        "Charles Dickens",
        "William Shakespeare",
        "Mark Twain",
        "Jane Austen",
      ],
      correct: "William Shakespeare",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Southern Ocean",
        "Pacific Ocean",
      ],
      correct: "Pacific Ocean",
    },
    {
      question: " How many continents are there on Earth?",
      options: ["Five", "Six", "Seven", "Eight"],
      correct: "Seven",
    },
    {
      question: "What is the boiling point of water at sea level in Celsius?",
      options: ["90°C", "80°C", "100°C", "120°C"],
      correct: "100°C",
    },
    {
      question: "Which language is most widely spoken in the world?",
      options: ["English", "Mandarin Chinese", "Spanish", "Hindi"],
      correct: "Mandarin Chinese",
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Go", "Gd"],
      correct: "Au",
    },
  ];

  const randomQuestions = (): Question[] => {
    const arr = [...questions];
    arr.sort(() => Math.random() - 0.5);
    return arr;
  };

  useEffect(() => {
    const random = randomQuestions();
    setShuffledQuestions(random);
  }, []);

  const handleAnswer = (option: string) => {
    if (selectedOption !== null) return;

    setSelectedOption(option);

    const currentQuestion = shuffledQuestions[currentIndex];
    const isCorrect = option === currentQuestion.correct;

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    const timeout = isCorrect ? 600 : 1500;

    setTimeout(() => {
      if (currentIndex === shuffledQuestions.length - 1) {
        setIsFinished(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
      setSelectedOption(null);
    }, timeout);
  };

  if (shuffledQuestions.length === 0 || !shuffledQuestions[currentIndex]) {
    return <div className="text-white text-xl">Загрузка...</div>;
  }

  if (isFinished) {
    const percentage = Math.round(
      (correctAnswers / shuffledQuestions.length) * 100
    );
    return <EndPage percentage={percentage} />;
  }

  const currentQuestion = shuffledQuestions[currentIndex];

  return (
    <div className="bg-gradient-to-r from-[#003A57] to-[#505486] h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="text-[36px] text-white text-center mb-[30px] max-w-[700px]">
            {currentQuestion.question}
          </div>
          <div className="flex gap-5 flex-col w-[392px]">
            {currentQuestion.options.map((option, index) => {
              let bgColor = "bg-[#8B65FF]";

              if (selectedOption) {
                const isCorrect = option === currentQuestion.correct;
                const isSelected = option === selectedOption;

                if (isSelected && isCorrect) {
                  bgColor = "bg-green-500";
                } else if (isSelected && !isCorrect) {
                  bgColor = "bg-red-500";
                } else if (!isSelected && isCorrect) {
                  bgColor = "bg-green-500";
                } else {
                  bgColor = "bg-[#8B65FF] opacity-50";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`text-white text-[32px] h-[65px] items-center justify-center flex rounded-[20px] cursor-pointer p-4 transition-all duration-300 ${bgColor}`}
                  disabled={!!selectedOption}
                >
                  {index + 1}. {option}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
