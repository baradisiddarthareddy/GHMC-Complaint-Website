export default function SummaryCard({ title, value }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 text-center">
      <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">
        {title}
      </h3>
      <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400 mt-2">
        {value}
      </h1>
    </div>
  );
}
