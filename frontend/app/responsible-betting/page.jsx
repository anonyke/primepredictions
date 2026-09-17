export const metadata = {
  title: 'Responsible Gaming & Transparency — PrimePredict',
  description: 'Responsible betting guidelines, platform transparency, and support resources.',
};

export default function ResponsibleBettingPage() {
  return (
    <div className="min-h-screen bg-[#0b1329] text-slate-100 py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8 bg-[#1e293b] border border-slate-800 p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-white tracking-tight border-b border-slate-800 pb-4">
          Responsible Gaming & Transparency
        </h1>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-400">Statistical Analysis vs. Guaranteed Outcomes</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            PrimePredict provides mathematical modeling, historical head-to-head records, and team form analysis.
            We explicitly state that <strong>no football outcome is guaranteed</strong>. Football involves countless
            unpredictable variables, and past statistical performance is no guarantee of future match results.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-400">Rules for Responsible Participation</h2>
          <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
            <li>Never stake funds you cannot afford to lose comfortably.</li>
            <li>Treat predictions as entertainment and informational analysis, not financial investments.</li>
            <li>Set strict daily and weekly limits on any gaming activities.</li>
            <li>Do not chase losses; step away when outcomes do not align with statistical projections.</li>
            <li>Strictly 18+ only. Underage participation is prohibited.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-400">Where to Seek Support</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            If you or someone you know is struggling with gambling-related issues in Kenya or internationally,
            confidential assistance is available:
          </p>
          <div className="bg-[#0f172a] p-4 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
            <p><strong>Kenya Helpline:</strong> Betting Control and Licensing Board (BCLB) Information Services</p>
            <p><strong>International Support:</strong> Gambling Therapy (www.gamblingtherapy.org)</p>
          </div>
        </section>
      </div>
    </div>
  );
}
