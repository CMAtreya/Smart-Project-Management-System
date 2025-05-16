import { useEffect, useState } from 'react';

const quotes = [
  "Believe you can and you're halfway there.",
  "Start where you are. Use what you have. Do what you can.",
  "Your limitation—it’s only your imagination.",
  "Push yourself, because no one else is going to do it for you."
];

export default function MotivationalPopup() {
  const [show, setShow] = useState(true);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
    setTimeout(() => setShow(false), 5000);
  }, []);

  return show ? (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-bounce">
      <p className="text-center font-semibold">{quote}</p>
    </div>
  ) : null;
}