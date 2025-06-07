import TestimonialsSection from '../app/components/TestimonialsSection';
import FAQSection from '../app/components/FAQSection';

export default function HomePage() {
  return (
    <>
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">Instant AI Book Summaries & Reviews</h1>
        <p className="text-lg text-gray-700 mb-8">
          Save time and discover your next favorite book with AI-powered summaries and personalized recommendations.
        </p>
        <a
          href="/register"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition"
        >
          Get Started — It’s Free
        </a>
      </section>

      <TestimonialsSection />
      <FAQSection />
    </>
  );
}
