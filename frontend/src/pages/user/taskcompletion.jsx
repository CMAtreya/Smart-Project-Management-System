export default function TaskCompletionBar() {
    return (
      <div>
        <h2 className="text-lg font-semibold mb-1">Task Completion</h2>
        <div className="h-3 w-full bg-slate-600 rounded-full overflow-hidden">
          <div className="h-full w-[75%] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-700" />
        </div>
      </div>
    );
  }