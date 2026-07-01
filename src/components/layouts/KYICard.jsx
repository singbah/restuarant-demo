export default function KyiCard({
  title,
  value,
  percentage = 0,
  icon,
  onClick,
}) {
  const isPositive = percentage >= 0;

  return (
    <div
      onClick={onClick}
      className="w-full rounded-2xl bg-white border border-gray-200 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
    >
      <div className="flex items-start justify-between">
        {icon}

        <span
          className={`text-sm font-semibold ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? "▲" : "▼"} {Math.abs(percentage)}%
        </span>
      </div>

      <h3 className="mt-5 text-gray-500 font-medium">
        {title}
      </h3>

      <h2 className="mt-1 text-3xl font-bold">
        {value}
      </h2>

      <p className="mt-2 text-sm text-gray-400">
        Compared to last 7 days
      </p>
    </div>
  );
}