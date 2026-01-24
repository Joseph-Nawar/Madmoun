export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <header className="glass-container gradient-border rounded-3xl p-6">
        <h1 className="text-2xl font-semibold text-white font-display">Profile</h1>
        <p className="mt-2 text-sm text-slate-300">
          Manage account security and preferences.
        </p>
      </header>
      <section className="glass-container gradient-border rounded-3xl p-6 text-sm text-slate-300">
        <p>User details will appear here.</p>
      </section>
    </div>
  );
}
