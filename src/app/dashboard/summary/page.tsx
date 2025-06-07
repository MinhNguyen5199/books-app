'use client';

import SummaryForm from '../../../app/components/SummaryForm';

async function fakeGenerateSummary(
  title: string,
  author: string,
  review: string
) {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Summary for "${title}" by ${author} generated!`);
    }, 1500);
  });
}

export default function SummaryPage() {
  const handleGenerate = async (
    title: string,
    author: string,
    review: string
  ) => {
    await fakeGenerateSummary(title, author, review);
  };

  return <SummaryForm onSubmit={handleGenerate} />;
}
