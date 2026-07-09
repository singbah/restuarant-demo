export default function AlertCard({
    open,
    title,
    message,
    onClose,
    status,
    action,
    linkTo
}) {
    if (!open) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs`}>

            <div
                className={`w-full max-w-md rounded-2xl bg-white p-6 shadow-xl`}>

                <h2 className="text-2xl font-bold">
                    {title}
                </h2>

                <p className="mt-4 text-gray-600">
                    {message}
                </p>

                <article className="flex gap-8">
                    <button
                    onClick={onClose}
                    className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-bold text-white hover:bg-blue-700"
                >
                    Close
                </button>
                {action && (<button
                    style={{backgroundColor: status==="success"?"green":"red"}}
                    onClick={action}
                    className="mt-6 w-full rounded-lg bg-green-600 py-3 font-bold text-white hover:bg-greeb-700"
                >
                    {linkTo?linkTo:"Yes"}
                </button>)}
                </article>
            </div>

        </div>
    );
}