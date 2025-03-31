export default function PaymentFailed() {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-xl font-semibold mb-2">Payment Failed</h1>
          <p className="text-gray-400">Something went wrong. Please try again.</p>
        </div>
      </div>
    );
  }
  