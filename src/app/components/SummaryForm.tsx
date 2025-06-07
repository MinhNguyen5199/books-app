'use client';

import { useState } from 'react';

type SummaryFormProps = {
  onSubmit: (title: string, author: string, review: string) => Promise<void>;
};

export default function SummaryForm({ onSubmit }: SummaryFormProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [review, setReview] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      await onSubmit(title, author, review);
      setResult('Your book summary was generated successfully! (Stubbed)');
    } catch (err) {
      setError('Failed to generate summary.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Generate Book Summary & Review</h2>

      {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
      {result && <div className="mb-4 text-green-600 font-semibold">{result}</div>}

      <label htmlFor="title" className="block mb-2 font-semibold">Book Title</label>
      <input
        id="title"
        type="text"
        required
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <label htmlFor="author" className="block mb-2 font-semibold">Author</label>
      <input
        id="author"
        type="text"
        required
        value={author}
        onChange={e => setAuthor(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />

      <label htmlFor="review" className="block mb-2 font-semibold">Your Review or Notes</label>
      <textarea
        id="review"
        required
        value={review}
        onChange={e => setReview(e.target.value)}
        rows={4}
        className="w-full mb-6 p-2 border rounded resize-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
      >
        {loading ? 'Generating...' : 'Generate Summary'}
      </button>
    </form>
  );
}
