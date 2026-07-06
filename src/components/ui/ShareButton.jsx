import {
    FaWhatsapp,
    FaFacebook,
    FaLinkedin,
    FaXTwitter,
    FaLink,
    FaShareNodes
} from "react-icons/fa6";

export default function ShareButtons({ title }) {

    const url = window.location.href;

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const share = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title,
                    text: title,
                    url,
                });
                return;
            }

            await navigator.clipboard.writeText(url);
            alert("Link copied to clipboard!");
        } catch (err) {
            console.log(err);
        }
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            alert("Link copied to clipboard!");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className="my-10 border-t border-b py-6">

            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaShareNodes />
                Share this article
            </h3>

            <div className="flex flex-wrap items-center gap-4">

                {/* Native Share */}
                <button
                    onClick={share}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                >
                    <FaShareNodes />
                    Share
                </button>

                {/* WhatsApp */}
                <a
                    href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition"
                    title="Share on WhatsApp"
                >
                    <FaWhatsapp
                        size={30}
                        className="text-green-600"
                    />
                </a>

                {/* Facebook */}
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition"
                    title="Share on Facebook"
                >
                    <FaFacebook
                        size={30}
                        className="text-blue-600"
                    />
                </a>

                {/* X */}
                <a
                    href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition"
                    title="Share on X"
                >
                    <FaXTwitter size={30} />
                </a>

                {/* LinkedIn */}
                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition"
                    title="Share on LinkedIn"
                >
                    <FaLinkedin
                        size={30}
                        className="text-blue-700"
                    />
                </a>

                {/* Copy Link */}
                <button
                    onClick={copyLink}
                    className="hover:scale-110 transition"
                    title="Copy Link"
                >
                    <FaLink size={28} />
                </button>

            </div>

        </section>
    );
}