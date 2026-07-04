export default {
    h1: ({ children }) => (
        <h1 className="text-4xl font-bold mt-10 mb-6">
            {children}
        </h1>
    ),

    h2: ({ children }) => (
        <h2 className="text-3xl font-bold mt-8 mb-4">
            {children}
        </h2>
    ),

    h3: ({ children }) => (
        <h3 className="text-2xl font-semibold mt-6 mb-3">
            {children}
        </h3>
    ),

    p: ({ children }) => (
        <p className="leading-8 mb-5">
            {children}
        </p>
    ),

    ul: ({ children }) => (
        <ul className="list-disc pl-6 mb-5">
            {children}
        </ul>
    ),

    ol: ({ children }) => (
        <ol className="list-decimal pl-6 mb-5">
            {children}
        </ol>
    ),

    blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-blue-500 bg-blue-50 italic px-4 py-2 my-6">
            {children}
        </blockquote>
    ),

    img: ({ src, alt }) => (
        <img
            src={src}
            alt={alt}
            className="rounded-xl w-full my-6"
            loading="lazy"
        />
    ),

    table: ({ children }) => (
        <div className="overflow-x-auto my-6">
            <table className="w-full border border-gray-300">
                {children}
            </table>
        </div>
    ),

    thead: ({ children }) => (
        <thead className="bg-gray-100">
            {children}
        </thead>
    ),

    th: ({ children }) => (
        <th className="border p-3 text-left font-bold">
            {children}
        </th>
    ),

    td: ({ children }) => (
        <td className="border p-3">
            {children}
        </td>
    ),

    a: ({ href, children }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
        >
            {children}
        </a>
    ),

    code: ({ children }) => (
        <code className="bg-gray-200 rounded px-1">
            {children}
        </code>
    ),

    pre: ({ children }) => (
        <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
            {children}
        </pre>
    ),
};