export default function DashboardHome() {
    return (
      <section className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-extrabold mb-4">Welcome to Your Dashboard</h1>
        <p className="mb-6 text-gray-700">
          Use the links above to generate summaries, upgrade your plan, or join the Silly Sh!t Challenge game.
        </p>
        <div className="space-x-4">
          <a href="/dashboard/summary" className="btn-blue">Generate Summary</a>
          <a href="/dashboard/upgrade" className="btn-blue">Upgrade Plan</a>
          <a href="/dashboard/challenge" className="btn-blue">Play Challenge</a>
        </div>
      </section>
    );
  }
  