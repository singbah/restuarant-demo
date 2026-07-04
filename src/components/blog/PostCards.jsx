import { Link } from "react-router-dom";

import { API_URL } from "../../../libs/api";
import { formatDistanceToNow } from "date-fns";

export default function PostCard({ content }) {
    if (!content) {
        return (
            <div className="rounded-2xl bg-white shadow p-6">
                <h2 className="text-xl font-semibold text-gray-500">
                    Post not found
                </h2>
            </div>
        );
    }

    return (
        <article className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 m-4 ">

            {content.featured_image && (
                <img
                    src={content.featured_image}
                    alt={content.title}
                    loading="lazy"
                    className="w-full h-56 object-cover"
                />
            )}

            <div className="p-6">

                <p className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(content.created_at))}
                </p>

                <h2 className="text-2xl font-bold mt-2 line-clamp-2">
                    {content.title}
                </h2>

                {content.excert && (
                    <p className="text-gray-600 mt-4 line-clamp-3">
                        {content.excert}
                    </p>
                )}

                <div className="mt-6">
                    <Link
                        to={`/post/${content.slug}`}
                        className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition"
                    >
                        Read More →
                    </Link>
                </div>

            </div>
        </article>
    );
}