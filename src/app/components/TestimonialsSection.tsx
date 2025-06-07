export default function TestimonialsSection() {
    return (
      <section className="max-w-4xl mx-auto my-12 text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Alice',
              quote: 'This platform saved me hours of reading time!',
            },
            {
              name: 'Bob',
              quote: 'The AI summaries are surprisingly accurate and insightful.',
            },
            {
              name: 'Cara',
              quote: 'Upgrading to VIP was the best decision for my book club.',
            },
          ].map(({ name, quote }) => (
            <blockquote
              key={name}
              className="bg-white p-6 rounded shadow text-gray-800 italic"
            >
              “{quote}”
              <footer className="mt-4 font-semibold text-right">— {name}</footer>
            </blockquote>
          ))}
        </div>
      </section>
    );
  }
  