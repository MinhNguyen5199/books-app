export default function FAQSection() {
    return (
      <section className="max-w-4xl mx-auto my-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-semibold text-lg">Is this platform really free?</dt>
            <dd className="text-gray-700 ml-4">
              Yes! Basic tier is free and supported by ads. You can upgrade anytime.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-lg">Can I generate unlimited summaries?</dt>
            <dd className="text-gray-700 ml-4">
              Unlimited summaries are available on Pro and VIP plans.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-lg">How do I upgrade my plan?</dt>
            <dd className="text-gray-700 ml-4">
              Visit the Upgrade page from your dashboard and select the plan you want.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-lg">What is the Silly Sh!t Challenge?</dt>
            <dd className="text-gray-700 ml-4">
              It’s a fun gamified way to get creative with book summaries using wacky prompts.
            </dd>
          </div>
        </dl>
      </section>
    );
  }
  