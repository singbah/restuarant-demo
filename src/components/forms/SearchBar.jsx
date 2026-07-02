import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function fetchResults(search) {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        `http://127.0.0.1:8000/posts/search/blog?q=${search}`
      );

      setResults(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResults(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      {/* input */}
      <div className="relative">
        <SearchIcon className="absolute right-3 top-3 text-gray-500" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShow(true)}
          placeholder="Search blogs..."
          className="w-full rounded-xl border px-4 py-2 pr-10 shadow-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* dropdown */}
      {show && (
        <div className="absolute z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-xl border bg-white shadow-lg">
          {loading && (
            <p className="p-3 text-sm text-gray-500">
              Searching...
            </p>
          )}

          {!loading &&
            results.map((blog) => (
              <div
                key={blog.slug}
                onMouseDown={() => {
                  navigate(`/post/${blog.slug}`);
                  setShow(false);
                }}
                className="cursor-pointer border-b p-3 hover:bg-gray-100"
              >
                <p className="font-semibold text-black">
                  {blog.title}
                </p>

                {blog.category && (
                  <p className="text-xs text-black">
                    {blog.category}
                  </p>
                )}
              </div>
            ))}

          {!loading &&
            query &&
            results.length === 0 && (
              <p className="p-3 text-sm text-gray-500">
                No results found.
              </p>
            )}
        </div>
      )}
    </div>
  );
}