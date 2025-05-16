export default function TaskSummary() {
    return (
      <div className="bg-slate-800 p-4 rounded-xl shadow-lg space-y-3">
        <h3 className="text-lg font-semibold">Today's Tasks</h3>
        <div className="flex justify-around text-center">
          <div>
            <p className="text-yellow-300 text-xl">🟡</p>
            <p>Ongoing</p>
            <p>1</p>
          </div>
          <div>
            <p className="text-green-400 text-xl">✅</p>
            <p>Completed</p>
            <p>5</p>
          </div>
          <div>
            <p className="text-red-400 text-xl">🕓</p>
            <p>Pending</p>
            <p>2</p>
          </div>
        </div>
      </div>
    );
  }