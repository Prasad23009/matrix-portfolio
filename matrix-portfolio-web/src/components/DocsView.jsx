export default function DocsView() {
  const apiUrl = "https://matrix-api-a9fk.onrender.com";

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-100">
      <h2 className="text-3xl font-bold mb-4">Matrix API Documentation</h2>
      <p className="text-gray-400 mb-6">
        Base URL: <code className="bg-gray-800 px-2 py-1 rounded text-indigo-400">{apiUrl}</code>
      </p>

      <div className="space-y-6">
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
          <span className="bg-green-600 text-xs px-2 py-1 rounded font-bold mr-3">GET</span>
          <span className="font-mono text-lg">/health</span>
          <p className="text-gray-300 mt-2 text-sm">Returns service health status.</p>
        </div>

        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
          <span className="bg-green-600 text-xs px-2 py-1 rounded font-bold mr-3">GET</span>
          <span className="font-mono text-lg">/api/projects</span>
          <p className="text-gray-300 mt-2 text-sm">Fetches all technical projects. Supports optional <code className="text-indigo-300">?branch=CSE</code> query filtering.</p>
        </div>

        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
          <span className="bg-blue-600 text-xs px-2 py-1 rounded font-bold mr-3">POST</span>
          <span className="font-mono text-lg">/api/enquiries</span>
          <p className="text-gray-300 mt-2 text-sm">Submits a student guidance enquiry or project discussion request.</p>
        </div>
      </div>
    </div>
  );
}