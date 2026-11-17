import { useState } from 'react';

export default function ProjectEstimator() {
  const [techStack, setTechStack] = useState('React, Node.js, PostgreSQL');
  const [weeks, setWeeks] = useState(4);
  const [estimate, setEstimate] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    
    // Generate calculated milestones based on timeframe
    const generatedMilestones = [
      {
        week: 'Week 1: Architecture & Setup',
        tasks: 'Database schema design, repository setup, API routing boilerplate.',
        commit: 'git commit -m "chore: initialize core architecture and DB schema"'
      },
      {
        week: `Week 2: Core Logic & Integration`,
        tasks: 'Implement primary CRUD endpoints, core algorithms, and state management.',
        commit: 'git commit -m "feat: implement core backend modules and routing"'
      },
      {
        week: `Week 3: UI & Feature Integration`,
        tasks: 'Connect frontend interface to backend APIs, handle error states & validation.',
        commit: 'git commit -m "feat: integrate frontend UI with API endpoints"'
      },
      {
        week: `Week 4: Testing, Polish & Report`,
        tasks: 'End-to-end testing, bug fixing, documentation, and PPT presentation prep.',
        commit: 'git commit -m "docs: finalize project report and deployment config"'
      }
    ];

    setEstimate({
      timeframe: `${weeks} Weeks`,
      stack: techStack,
      milestones: generatedMilestones.slice(0, Math.min(weeks, 4))
    });
  };

  return (
    <section className="section" style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">INTERACTIVE TOOL</p>
          <h2>Project Scope & Timeline Estimator</h2>
        </div>
        <p>Generate a milestone-by-milestone development schedule and Git commit plan for your academic report.</p>
      </div>

      <div className="service-card" style={{ padding: '24px', background: '#111827', borderRadius: '12px', border: '1px solid #374151' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <label style={{ color: '#f3f4f6', fontSize: '0.9rem', fontWeight: '600' }}>
            Your Tech Stack (e.g., Python, FastAPI, React)
            <input
              type="text"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', marginTop: '6px', borderRadius: '8px', background: '#1f2937', border: '1px solid #4b5563', color: '#fff', fontSize: '0.9rem', boxSizing: 'border-box' }}
            />
          </label>

          <label style={{ color: '#f3f4f6', fontSize: '0.9rem', fontWeight: '600' }}>
            Target Timeline: {weeks} Weeks
            <input
              type="range"
              min="2"
              max="6"
              value={weeks}
              onChange={(e) => setWeeks(Number(e.target.value))}
              style={{ width: '100%', marginTop: '8px', accentColor: '#4f46e5' }}
            />
          </label>

          <button type="submit" className="button primary" style={{ padding: '10px 16px', fontSize: '0.88rem', cursor: 'pointer', alignSelf: 'flex-start' }}>
            Generate Timeline Schedule →
          </button>
        </form>

        {estimate && (
          <div style={{ marginTop: '24px', borderTop: '1px solid #374151', paddingTop: '20px' }}>
            <h3 style={{ color: '#f5c14f', fontSize: '1.05rem', marginBottom: '16px' }}>
              📦 Estimated Schedule ({estimate.timeframe} for {estimate.stack})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {estimate.milestones.map((m, idx) => (
                <div key={idx} style={{ background: '#1f2937', padding: '14px', borderRadius: '8px', border: '1px solid #374151' }}>
                  <strong style={{ color: '#818cf8', display: 'block', marginBottom: '4px' }}>{m.week}</strong>
                  <p style={{ color: '#d1d5db', fontSize: '0.88rem', margin: '0 0 8px 0' }}>{m.tasks}</p>
                  <code style={{ fontSize: '0.78rem', color: '#34d399', background: '#030712', padding: '4px 8px', borderRadius: '4px', display: 'inline-block' }}>
                    {m.commit}
                  </code>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}