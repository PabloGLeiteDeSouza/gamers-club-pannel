const LoadingScreen: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-6">
                    <span className="animate-pulse">C</span>
                    <span className="animate-pulse">a</span>
                    <span className="animate-pulse">r</span>
                    <span className="animate-pulse">r</span>
                    <span className="animate-pulse">e</span>
                    <span className="animate-pulse">g</span>
                    <span className="animate-pulse">a</span>
                    <span className="animate-pulse">n</span>
                    <span className="animate-pulse">d</span>
                    <span className="animate-pulse">o</span>
                    <span className="animate-pulse">...</span>
                </h1>
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            </div>
        </div>
    )
}

export default LoadingScreen;