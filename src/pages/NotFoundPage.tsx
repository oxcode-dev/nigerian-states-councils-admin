
const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
            <p className="text-lg mt-2">Sorry, the page you are looking for does not exist.</p>
            <a href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                Go to Homepage
            </a>
        </div>
    );
};

export default NotFoundPage;