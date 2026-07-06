import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {useEffect} from "react"

import LayoutScreen from "../layouts/Layout";
import useFetch from "../hooks/UseFetch";
import { API_URL, api } from "../../../libs/api";
import dateFormator from "../../../libs/DateFormating";
import markdowncomponents from "./MarkdownComponents"
import Tagbadges from "./TagBadges";
import logo from "../../logo.jpg";
import { formatDistanceToNow } from "date-fns";
import RelatedPosts from "./RelatedPosts";

export default function PostDetails() {
    const { postSlug } = useParams();

    const { data, loading, error } = useFetch(`/posts/post/${postSlug}`);


    useEffect(() => {
    if (!postSlug) return;
        const doView = async () =>{
            try{
            const resp = await api.post(`/posts/view/${postSlug}`);
            console.log(resp)
        }catch(error){
            console.log(error)
        }
        }

        doView();
    }, [postSlug]);

    if (loading) {
        return (
            <LayoutScreen
                compo={
                    <div className="flex justify-center items-center py-20">
                        <h2 className="text-2xl font-bold">
                            Loading article...
                        </h2>
                    </div>
                }
            />
        );
    }

    if (error || !data) {
        return (
            <LayoutScreen
                compo={
                    <div className="flex flex-col justify-center items-center py-20">
                        <h1 className="text-4xl font-bold">
                            Article not found
                        </h1>

                        <p className="text-gray-500 mt-4">
                            This article may have been deleted or moved.
                        </p>
                    </div>
                }
            />
        );
    }

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.title,
        description: data.excert,
        image: `${API_URL}posts/send_file?filename=${data.featured_image}`,
        datePublished: data.created_at,
        author: {
            "@type": "Person",
            name: "John P. Singbah",
        },
        publisher: {
            "@type": "Organization",
            name: "Easi Tech Lr.",
            logo: {
                "@type": "ImageObject",
                url: logo,
            },
        },
        mainEntityOfPage: `https://monroviamoney.com/post/${postSlug}`,
    };

    return (
        <LayoutScreen
            compo={
                <>
                    <Helmet>
                        <title>{data.title} | Easi Tech</title>

                        <meta
                            name="description"
                            content={data.excert}
                        />

                        <link
                            rel="canonical"
                            href={`${API_URL}/post/${postSlug}`}
                        />

                        <script type="application/ld+json">
                            {JSON.stringify(articleSchema)}
                        </script>
                    </Helmet>

                    <article className="bg-white rounded-2xl shadow-lg p-6 lg:p-10">

                        <p className="text-sm text-gray-500 mb-2">
                            Published {formatDistanceToNow(new Date((data.created_at)))}
                        </p>

                        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                            {data.title}
                        </h1>

                        {data.excert && (
                            <p className="text-xl italic text-gray-600 border-l-4 border-blue-500 pl-4 my-6">
                                {data.excert}
                            </p>
                        )}

                        {data.featured_image && (
                            <img
                                loading="lazy"
                                className="rounded-xl w-full max-h-[500px] object-cover my-8"
                                src={data.featured_image}
                                alt={data.title}
                            />
                        )}

                        <div className="prose prose-lg max-w-none">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={markdowncomponents}
                            >
                                {data.content}
                            </ReactMarkdown>
                            <p>Viws {data.views}</p>
                        </div>

                        <div className="mt-10 border-t pt-6">
                            <RelatedPosts postSlug={postSlug}/>
                        </div>

                    </article>
                </>
            }
        />
    );
}