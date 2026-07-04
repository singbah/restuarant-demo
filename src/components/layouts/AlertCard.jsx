export default function AlertCard({
    open,
    title = "Notice",
    message,
    onClose,
    status='success'
}) {
    if (!open) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs`}>

            <div 
                className={`w-full max-w-md ${status === 'success' ? 'bg-green-500/40' : 'bg-red-500/40'} rounded-2xl bg-white p-6 shadow-xl`}>

                <h2 className="text-2xl font-bold">
                    {title}
                </h2>

                <p className="mt-4 text-gray-600">
                    {message}
                </p>

                <button
                    onClick={onClose}
                    className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-bold text-white hover:bg-blue-700"
                >
                    Close
                </button>

            </div>

        </div>
    );
}