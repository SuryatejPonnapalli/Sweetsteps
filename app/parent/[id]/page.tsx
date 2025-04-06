export default function WeekTasksPicker() {
  const days = [
    {
      name: "Monday",
      bg: "bg-red-200",
      text: "text-red-400",
      ring: "focus:ring-red-300",
    },
    {
      name: "Tuesday",
      bg: "bg-green-200",
      text: "text-green-800",
      ring: "focus:ring-green-300",
    },
    {
      name: "Wednesday",
      bg: "bg-red-300",
      text: "text-red-700",
      ring: "focus:ring-red-400",
    },
    {
      name: "Thursday",
      bg: "bg-yellow-200",
      text: "text-yellow-600",
      ring: "focus:ring-yellow-300",
    },
    {
      name: "Friday",
      bg: "bg-blue-200",
      text: "text-blue-600",
      ring: "focus:ring-blue-300",
    },
    {
      name: "Saturday",
      bg: "bg-purple-200",
      text: "text-purple-700",
      ring: "focus:ring-purple-300",
    },
  ];

  const taskOptions = ["Workout", "Meeting", "Coding", "Reading"];

  return (
    <div className="w-screen min-h-screen bg-[#FEECCF] flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-md flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-pink-400">
          <img
            src="https://i.pravatar.cc/100"
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-black font-bold text-2xl">Task’s</h1>

        <div className="w-10 h-10 rounded-full bg-pink-400 flex flex-col items-center justify-center space-y-[4px] p-2">
          <span className="block w-4 h-0.5 bg-white rounded"></span>
          <span className="block w-4 h-0.5 bg-white rounded"></span>
          <span className="block w-4 h-0.5 bg-white rounded"></span>
        </div>
      </div>

      <div className="w-full max-w-md mb-4">
        <h2 className="text-green-900 font-bold text-sm">Assign Task’s</h2>
      </div>

      <div className="w-full max-w-md px-4 h-auto flex flex-col gap-4">
        {days.map((day) => (
          <div key={day.name} className={`rounded-xl p-0 ${day.bg}`}>
            <select
              className={`w-full px-4 py-6 rounded-xl font-semibold text-md border-none appearance-none ${day.text} bg-transparent bg-[url("data:image/svg+xml,%3Csvg viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' outline-none px-8 py-10 stroke='%23444' stroke-width='2' fill='none'/%3E%3C/svg%3E")] bg-no-repeat bg-right pr-8 ${day.ring}`}
              defaultValue={day.name}
            >
              <option value={day.name}>{day.name}</option>
              {taskOptions.map((task) => (
                <option key={task} value={task.toLowerCase()}>
                  {task}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
