import { useState } from 'react';

export default function StressMonitor() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-slate-800 p-4 rounded-xl shadow-lg text-center">
      <h3 className="text-lg font-semibold mb-2">Stress Monitor</h3>
      <div
        onClick={() => setShowModal(true)}
        className="cursor-pointer">
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-green-400 via-yellow-500 to-red-500 flex items-center justify-center text-black font-bold text-xl">
          😌
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg space-y-4">
            <h2 className="text-xl font-semibold">Take a Break</h2>
            <p className="text-sm">How are you feeling today?</p>
            <input type="range" min="1" max="10" className="w-full" />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setShowModal(false)}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}