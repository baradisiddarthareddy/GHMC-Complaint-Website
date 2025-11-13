export default function StatusTimeline({ status }) {
  const steps = ["Pending", "In Progress", "Resolved"];

  return (
    <div className="flex flex-col gap-4 mt-4">
      {steps.map((step, i) => {
        const active = steps.indexOf(status) >= i;

        return (
          <div key={i} className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full ${
                active ? "bg-green-600" : "bg-gray-400"
              }`}
            ></div>
            <p
              className={`font-medium ${
                active ? "text-green-600" : "text-gray-500"
              }`}
            >
              {step}
            </p>
          </div>
        );
      })}
    </div>
  );
}
