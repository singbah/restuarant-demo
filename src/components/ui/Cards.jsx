export default function AnalyticCard({ Icon, Num, title }) {
  return (
    <article className="border h-20 w-40 rounded-lg shadow shadow-red-400 border-white">
      <p className="p-2 font-bold text-center text-green-500">{title}</p>
      <section className="flex justify-center">
        {Icon}
        <p className="mx-4 font-bold text-xl text-blue-500">{Num}</p>
      </section>
    </article>
  );
}
