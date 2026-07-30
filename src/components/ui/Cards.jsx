export default function AnalyticCard({ Icon, Num, title }) {
  return (
    <article className="w-full bg-white rounded-2xl border border-gray-100 p-4 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      {/* Card Header: Icon + Title */}
      <div className="flex items-center gap-2 mb-2">
        {Icon && (
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            {Icon}
          </div>
        )}
        <p className="text-xs font-semibold text-gray-500 line-clamp-1">
          {title}
        </p>
      </div>

      {/* Card Metric Value */}
      <div className="flex items-baseline justify-between">
        <span className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
          {Num !== undefined && Num !== null ? Num : 0}
        </span>
      </div>
    </article>
  );
}
