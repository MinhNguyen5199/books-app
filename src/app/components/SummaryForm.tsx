// // src/components/SummaryForm.tsx
// 'use client';

// import React, { useState } from 'react';
// import { BookOpen, Link as LinkIcon, Upload, Brain, Sparkles, FileText } from 'lucide-react';
// import { useAI } from '../hooks/useAI'; // Stubbed AI hook

// const SummaryForm = () => {
//   const [bookInput, setBookInput] = useState('');
//   const [inputType, setInputType] = useState<'text' | 'link' | 'upload'>('text');
//   const [summaryLength, setSummaryLength] = useState('medium'); // short, medium, long
//   const [focusArea, setFocusArea] = useState(''); // e.g., "key takeaways", "character analysis"
//   const [isLoading, setIsLoading] = useState(false);
//   const [summaryResult, setSummaryResult] = useState<string | null>(null);
//   const { generateSummary } = useAI(); // Using the stubbed AI hook

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setSummaryResult(null); // Clear previous result

//     console.log('Generating summary with:', { bookInput, inputType, summaryLength, focusArea });

//     try {
//       // Simulate AI summary generation
//       const result = await generateSummary(bookInput, summaryLength, focusArea);
//       setSummaryResult(result);
//     } catch (error) {
//       console.error('Failed to generate summary:', error);
//       setSummaryResult('Failed to generate summary. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const dummySummary = `
//     "The Alchemist" by Paulo Coelho is an allegorical novel that tells the mystical story of Santiago, an Andalusian shepherd boy who dreams of a treasure buried at the foot of the Egyptian pyramids. Driven by this recurring dream and the encouragement of a mysterious old king, Melchizedek, Santiago embarks on a journey to Africa. Along the way, he encounters various figures who guide him, including a crystal merchant who teaches him about patience and the importance of pursuing one's Personal Legend, and an Englishman searching for the Elixir of Life, introducing Santiago to alchemy.

//     In the Sahara Desert, Santiago joins a caravan and meets Fatima, a woman he falls in love with at an oasis. He also encounters a wise alchemist who becomes his true mentor, teaching him about the Soul of the World, the interconnectedness of all things, and the importance of listening to his heart. The alchemist challenges Santiago to transform himself into the wind, a test of his faith and understanding.

//     Ultimately, Santiago reaches the pyramids, only to find the treasure is not there. Instead, he learns through a vision that the true treasure was hidden back in his homeland, under a sycamore tree near where he first had his dream. The journey itself, with all its lessons and encounters, becomes the treasure. The novel emphasizes themes of destiny, the pursuit of dreams, the interconnectedness of nature, and spiritual growth, illustrating that true happiness is found not just in the destination, but in the journey and the lessons learned along the way.
//   `;


//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 animate-fade-in-up">
//       <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-sky-500 dark:from-teal-300 dark:to-sky-300">
//         Generate Your Next Summary
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Input Type Selection */}
//         <div className="flex justify-center space-x-4 mb-6">
//           <button
//             type="button"
//             onClick={() => setInputType('text')}
//             className={`flex items-center px-6 py-3 rounded-full text-lg font-medium transition-all duration-200
//               ${inputType === 'text'
//                 ? 'bg-indigo-600 text-white shadow-md'
//                 : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
//               }`}
//           >
//             <BookOpen className="w-5 h-5 mr-2" /> Text
//           </button>
//           <button
//             type="button"
//             onClick={() => setInputType('link')}
//             className={`flex items-center px-6 py-3 rounded-full text-lg font-medium transition-all duration-200
//               ${inputType === 'link'
//                 ? 'bg-indigo-600 text-white shadow-md'
//                 : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
//               }`}
//           >
//             <LinkIcon className="w-5 h-5 mr-2" /> Link
//           </button>
//           <button
//             type="button"
//             onClick={() => setInputType('upload')}
//             className={`flex items-center px-6 py-3 rounded-full text-lg font-medium transition-all duration-200
//               ${inputType === 'upload'
//                 ? 'bg-indigo-600 text-white shadow-md'
//                 : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
//               }`}
//           >
//             <Upload className="w-5 h-5 mr-2" /> Upload
//           </button>
//         </div>

//         {/* Input Field */}
//         <div className="relative">
//           <label htmlFor="bookInput" className="sr-only">
//             {inputType === 'text' ? 'Book Text' : inputType === 'link' ? 'Book URL' : 'Upload File'}
//           </label>
//           {inputType === 'text' && (
//             <textarea
//               id="bookInput"
//               rows={8}
//               placeholder="Paste your book text here or type about the book you want summarized..."
//               value={bookInput}
//               onChange={(e) => setBookInput(e.target.value)}
//               required
//               className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 bg-gray-50 dark:bg-gray-700 sm:text-sm sm:leading-6 transition-colors duration-200"
//             />
//           )}
//           {inputType === 'link' && (
//             <input
//               type="url"
//               id="bookInput"
//               placeholder="Enter book URL (e.g., Goodreads, Project Gutenberg link)"
//               value={bookInput}
//               onChange={(e) => setBookInput(e.target.value)}
//               required
//               className="block w-full rounded-full border-0 py-3 px-4 pl-10 text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 bg-gray-50 dark:bg-gray-700 sm:text-sm sm:leading-6 transition-colors duration-200"
//             />
//           )}
//           {inputType === 'upload' && (
//             <input
//               type="file"
//               id="bookInput"
//               onChange={(e) => {
//                 // Handle file upload logic here
//                 if (e.target.files && e.target.files[0]) {
//                   setBookInput(e.target.files[0].name); // Just show file name for now
//                   console.log('File selected:', e.target.files[0]);
//                 }
//               }}
//               required
//               className="block w-full text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 dark:file:bg-indigo-900 file:text-indigo-700 dark:file:text-indigo-200 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-800 cursor-pointer rounded-lg ring-1 ring-inset ring-gray-300 dark:ring-gray-700 bg-gray-50 dark:bg-gray-700 py-3 px-4 transition-colors duration-200"
//             />
//           )}
//           {(inputType === 'link' || inputType === 'upload') && (
//             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//               {inputType === 'link' ? <LinkIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" /> : <Upload className="h-5 w-5 text-gray-400 dark:text-gray-500" />}
//             </div>
//           )}
//         </div>

//         {/* Summary Options */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           <div>
//             <label htmlFor="summaryLength" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
//               Summary Length
//             </label>
//             <select
//               id="summaryLength"
//               value={summaryLength}
//               onChange={(e) => setSummaryLength(e.target.value)}
//               className="block w-full rounded-full border-0 py-3 px-4 text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 bg-gray-50 dark:bg-gray-700 sm:text-sm sm:leading-6 transition-colors duration-200"
//             >
//               <option value="short">Short (approx. 200 words)</option>
//               <option value="medium">Medium (approx. 500 words)</option>
//               <option value="long">Long (approx. 1000 words)</option>
//             </select>
//           </div>
//           <div>
//             <label htmlFor="focusArea" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
//               Focus Area (Optional)
//             </label>
//             <input
//               type="text"
//               id="focusArea"
//               placeholder="e.g., 'key takeaways', 'character analysis'"
//               value={focusArea}
//               onChange={(e) => setFocusArea(e.target.value)}
//               className="block w-full rounded-full border-0 py-3 px-4 text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 bg-gray-50 dark:bg-gray-700 sm:text-sm sm:leading-6 transition-colors duration-200"
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading || !bookInput}
//           className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:bg-gradient-to-r dark:from-teal-500 dark:to-sky-500 dark:hover:from-teal-600 dark:hover:to-sky-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isLoading ? (
//             <span className="flex items-center">
//               <Sparkles className="animate-spin mr-3 w-5 h-5" /> Generating...
//             </span>
//           ) : (
//             <>
//               <Brain className="mr-3 w-5 h-5" /> Generate Summary
//             </>
//           )}
//         </button>
//       </form>

//       {summaryResult && (
//         <div className="mt-10 p-8 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-inner border border-gray-200 dark:border-gray-600 animate-fade-in-up [animation-delay:0.3s]">
//           <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
//             <FileText className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" /> Your Summary
//           </h3>
//           <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
//             <p className="whitespace-pre-wrap">{dummySummary}</p> {/* Use dummy summary for now */}
//           </div>
//           <div className="mt-6 flex flex-wrap justify-end gap-3">
//             <button
//               onClick={() => {
//                 // In a real app, handle export to PDF
//                 console.log('Exporting to PDF...');
//               }}
//               className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm"
//             >
//               Export PDF
//             </button>
//             <button
//               onClick={() => {
//                 // In a real app, handle export to Markdown
//                 console.log('Exporting to Markdown...');
//               }}
//               className="px-5 py-2 border border-gray-300 dark:border-gray-600 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm"
//             >
//               Export Markdown
//             </button>
//           </div>

//           {/* --- Ad Placement: Below Summary Result --- */}
//           <div className="mt-8 p-4 bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 rounded-xl text-center shadow-inner">
//             <p className="text-yellow-800 dark:text-yellow-200 font-semibold text-lg">
//               [Ad Placeholder: Get the full book on sale!]
//             </p>
//             <a href="#" className="text-yellow-600 dark:text-yellow-400 hover:underline text-sm">
//               Shop Now
//             </a>
//           </div>
//           {/* --- End Ad Placement --- */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SummaryForm;