import { Link } from "react-router-dom";
import useFetch from "../hooks/UseFetch";

export default function RelatedPosts({ postSlug }) {

    console.log("Post slug", postSlug)
    const { data, loading, error } = useFetch(`/posts/related/${postSlug}`);
    console.log(data)
    if (loading) {
        return (
            <div className="mt-10">
                <h2 className="text-xl font-bold mb-3">
                    Related Posts
                </h2>
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (error || !data || data.length === 0) {
        return null;
    }

    return (
        <div className="mt-10">

            <h2 className="text-2xl font-bold mb-4">
                Related Posts
            </h2>

            <div className="space-y-3">

                {data && data.map((post) => (
                    <Link
                        key={post.id}
                        to={`/post/${post.slug}`}
                        className="block p-4 rounded-xl border hover:bg-gray-50 transition"
                    >
                        <h3 className="font-semibold line-clamp-1">
                            {post.title}
                        </h3>

                        {post.excert && (
                            <p className="text-sm text-gray-500 line-clamp-2">
                                {post.excert}
                            </p>
                        )}
                    </Link>
                ))}

            </div>
        </div>
    );
}