"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, ArrowRight } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What is Nupur's ultimate fuel to survive a 12-hour work marathon?",
    options: [
      "A cup of hot warm water",
      "Double-shot espresso injected straight into the veins! ☕🔥",
      "Taking a 2-hour afternoon nap",
      "Eating a sugar-free oat bar"
    ],
    correctAnswerIndex: 1,
    explanation: "Correct! Caffeine is the lifeblood of Nupur's legendary work marathons!"
  },
  {
    id: 2,
    text: "After a long corporate grind, how does Nupur choose to 'decompress' and get high-vibe?",
    options: [
      "Updating spreadsheets for fun",
      "Sipping a gorgeous, neon-lit cocktail and listening to deep house! 🍸🌀",
      "Reading corporate policy handbooks",
      "Going to bed at 9:00 PM sharp"
    ],
    correctAnswerIndex: 1,
    explanation: "Exactly! Good beats, glowing neon lights, and a cool cocktail are the ultimate way to unwind!"
  },
  {
    id: 3,
    text: "What is the secret ingredient that makes a chili cocktail taste absolutely mind-bending?",
    options: [
      "A splash of white vinegar",
      "A pinch of fiery ghost pepper syrup and a sugar rim! 🌶️🍹",
      "Just basic ice cubes",
      "A celery stalk stir"
    ],
    correctAnswerIndex: 1,
    explanation: "Perfect! A sweet and spicy kick takes the cocktail experience to a whole new dimension!"
  },
  {
    id: 4,
    text: "If Nupur gets a Slack notification at 11:00 PM on a Friday while holding a drink, what happens?",
    options: [
      "She shuts down her laptop, ignores it, and takes a shot! 🥂✨",
      "She starts writing code immediately",
      "She schedules a client meeting for Saturday morning",
      "She sends an email apologizing for the delay"
    ],
    correctAnswerIndex: 0,
    explanation: "Spot on! Respect the weekend, shut the laptop, and toast to freedom! 🥂"
  }
];

interface FoodieQuizProps {
  onComplete: (allCorrect: boolean) => void;
}

export default function FoodieQuiz({ onComplete }: FoodieQuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleOptionClick = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedIdx(optionIndex);
    setIsAnswered(true);

    if (optionIndex !== currentQuestion.correctAnswerIndex) {
      // She answered incorrectly
      setTimeout(() => {
        setIsFailed(true);
      }, 1000);
    }
  };

  const handleNext = () => {
    setSelectedIdx(null);
    setIsAnswered(false);
    
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Quiz finished successfully with all correct answers
      onComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setIsFailed(false);
  };

  if (isFailed) {
    return (
      <div className="card" style={{ textAlign: "center" }}>
        <div style={{ color: "var(--color-red)", fontSize: "4rem", marginBottom: "16px" }}>
          <XCircle size={64} style={{ margin: "0 auto" }} />
        </div>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "12px" }}>Brain Overheated! 🥵</h2>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "32px" }}>
          Oh no, Nupur! You got a question wrong. Real workaholics know their coffee and cocktails inside out! Let's reboot and try again!
        </p>
        <button className="btn btn-primary" onClick={handleReset}>
          Reboot System <RotateCcw size={18} />
        </button>
      </div>
    );
  }

  const progressPercent = ((currentIdx) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <div className="badge badge-yellow">
          Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
        </div>
        <div style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "4px" }}>
          <HelpCircle size={14} /> Spicy Level: Hot
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
      </div>

      <h2 style={{ fontSize: "1.35rem", marginBottom: "24px", lineHeight: "1.4" }}>
        {currentQuestion.text}
      </h2>

      <div style={{ marginBottom: "24px" }}>
        {currentQuestion.options.map((option, idx) => {
          let btnClass = "option-btn";
          let icon = null;

          if (isAnswered) {
            if (idx === currentQuestion.correctAnswerIndex) {
              btnClass += " correct";
              icon = <CheckCircle2 size={18} />;
            } else if (idx === selectedIdx) {
              btnClass += " incorrect";
              icon = <XCircle size={18} />;
            }
          }

          return (
            <button
              key={idx}
              className={btnClass}
              onClick={() => handleOptionClick(idx)}
              disabled={isAnswered}
            >
              <span>{option}</span>
              {icon}
            </button>
          );
        })}
      </div>

      {isAnswered && selectedIdx === currentQuestion.correctAnswerIndex && (
        <div 
          style={{ 
            background: "rgba(255, 255, 255, 0.03)", 
            padding: "16px", 
            borderRadius: "12px", 
            marginBottom: "24px",
            borderLeft: "3px solid var(--color-yellow)",
            fontSize: "0.9rem",
            color: "var(--color-text-muted)"
          }}
        >
          {currentQuestion.explanation}
        </div>
      )}

      {isAnswered && selectedIdx === currentQuestion.correctAnswerIndex && (
        <button className="btn btn-primary" onClick={handleNext}>
          {currentIdx === QUIZ_QUESTIONS.length - 1 ? "Complete Challenge!" : "Next Question"} 
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
}
