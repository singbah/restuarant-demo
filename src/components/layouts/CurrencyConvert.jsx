import { useEffect, useState } from "react";

export default function CurrencyConvertor() {
  const [exchangeRate, setExchangeRate] = useState(184);

  const [usd, setUsd] = useState(1);
  const [lrd, setLrd] = useState(exchangeRate);

  useEffect(() => {
    // Later replace this with your API call
    const rate = 184;
    setExchangeRate(rate);
    setLrd(rate);
  }, []);

  const handleUsd = (e) => {
    const value = Number(e.target.value);

    setUsd(value);
    setLrd((value * exchangeRate).toFixed(2));
  };

  const handleLrd = (e) => {
    const value = Number(e.target.value);

    setLrd(value);
    setUsd((value / exchangeRate).toFixed(2));
  };

  return (
    <div className="self-start rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-center">
        Currency Converter
      </h2>

      <p className="mt-2 text-center text-gray-500">
        Today's Rate
      </p>
      <p className="mt-2 text-center text-gray-500">
        1 USD = {exchangeRate} LRD
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block font-medium">
            USD
          </label>

          <input
            type="number"
            value={usd}
            onChange={handleUsd}
            className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            LRD
          </label>

          <input
            type="number"
            value={lrd}
            onChange={handleLrd}
            className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <p className="bg-black text-white font-bold text-center p-2 rounded">Brought To You By Easi Tech Lr.</p>
      </div>
    </div>
  );
}