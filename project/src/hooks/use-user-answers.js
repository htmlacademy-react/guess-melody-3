import {useState} from 'react';

export const useUserAnswers = (question, onAnswer) => {
  const answersCount = question.answers.length;
  const [answers, setAnswers] = useState(new Array(answersCount).fill(false));

  const handleAnswer = () => {
    onAnswer(question, answers);
  };

  const handleAnswerChange = (id, value) => {
    const userAnswers = answers.slice(0);
    userAnswers[id] = value;
    setAnswers(userAnswers);
  };

  return [answers, handleAnswer, handleAnswerChange];
};
