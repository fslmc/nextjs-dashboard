export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">My Portfolio</h1>
        <p className="text-lg text-gray-700 mb-10">
          Welcome to my portfolio! Here are some of my featured projects.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Project 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Project One</h2>
            <p className="text-gray-600 mb-4">
              A brief description of Project One. This project showcases my skills in React and Next.js.
            </p>
            <a
              href="#"
              className="inline-block text-blue-500 hover:underline font-medium"
            >
              View Project
            </a>
          </div>
          {/* Project 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Project Two</h2>
            <p className="text-gray-600 mb-4">
              A brief description of Project Two. This project demonstrates my experience with Tailwind CSS.
            </p>
            <a
              href="#"
              className="inline-block text-blue-500 hover:underline font-medium"
            >
              View Project
            </a>
          </div>
          {/* Project 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Project Three</h2>
            <p className="text-gray-600 mb-4">
              A brief description of Project Three. This project highlights my backend development skills.
            </p>
            <a
              href="#"
              className="inline-block text-blue-500 hover:underline font-medium"
            >
              View Project
            </a>
          </div>
          {/* Project 4 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Project Four</h2>
            <p className="text-gray-600 mb-4">
              A brief description of Project Four. This project is focused on UI/UX design.
            </p>
            <a
              href="#"
              className="inline-block text-blue-500 hover:underline font-medium"
            >
              View Project
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}