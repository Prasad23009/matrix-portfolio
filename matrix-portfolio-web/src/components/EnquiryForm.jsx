import { useState } from 'react';

export default function EnquiryForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const res = await fetch('https://matrix-api-a9fk.onrender.com/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setStatus('Enquiry submitted successfully!');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('Submission failed. Please try again.');
      }
    } catch {
      setStatus('Network error. Check connection.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-4 my-8">
      <h3 className="text-xl font-bold text-white">Request Project Guidance</h3>
      <input
        type="text"
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        className="w-full bg-gray-800 border border-gray-700 rounded p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
      />
      <input
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
        className="w-full bg-gray-800 border border-gray-700 rounded p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
      />
      <textarea
        placeholder="Describe your project topic or requirements..."
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        required
        rows={4}
        className="w-full bg-gray-800 border border-gray-700 rounded p-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded font-medium transition-colors"
      >
        Send Enquiry
      </button>
      {status && <p className="text-center text-xs text-indigo-400 mt-2">{status}</p>}
    </form>
  );
}