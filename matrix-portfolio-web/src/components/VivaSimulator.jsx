import { useState } from 'react';

const mockQuestions = {
  CSE: [
    "Why did you choose PostgreSQL over a NoSQL database for this architecture?",
    "How does your application handle concurrent requests without race conditions?",
    "Explain how your authentication tokens (JWT) are validated securely."
  ],
  IT: [
    "What strategies did you use for multi-cloud cost optimization?",
    "How does your CI/CD pipeline handle rollbacks if a deployment fails?",
    "Explain how tenant isolation is maintained in your SaaS boilerplate."
  ],
  ECE: [
    "How do you handle packet loss or latency drops in your MQTT telemetry stream?",
    "What are the power consumption trade-offs on your edge hardware?",
    "Explain how firmware updates are cryptographically verified."
  ],
  EEE: [
    "How does your PID controller handle sudden load spikes in the simulation?",
    "What parameters are used to calculate the State-of-Charge (SoC) accurately?",
    "Explain how harmonic distortion is suppressed in your active filter design."
  ]
};

export default function VivaSimulator() {
  const [selectedBranch, setSelectedBranch] = useState('CSE');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  const questions = mockQuestions[selectedBranch] || [];

  const handleEvaluate = (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    setFeedback({
      score: 'Strong Answer',
      text: "Good structural explanation. Make sure to emphasize performance trade-offs, scalability constraints, and security logging when presenting this to your external examiner."
    });
  };

  return (
    <section className="section" style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">INTERACTIVE TOOL</p>
          <h2>Viva Voce Mock Simulator</h2>
        </div>
        <p>Practice answering common external examiner questions for your engineering branch.</p>
      </div>

      {/* Clean high-contrast branch buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {Object.keys(mockQuestions).map((branch) => {
          const isActive = selectedBranch === branch;
          return (
            <button
              key={branch}
              type="button"
              onClick={() => { setSelectedBranch(branch); setCurrentQIndex(0); setFeedback(null); setUserAnswer(''); }}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: '700',
                cursor: 'pointer',
                border: isActive ? '1px solid #6366f1' : '1px solid #374151',
                backgroundColor: isActive ? '#4f46e5' : '#1f2937',
                color: '#ffffff',
                boxShadow: isActive ? '0 0 12px rgba(79, 70, 229, 0.5)' : 'none',
                transition: 'all 0.15s ease-in-out',
              }}
            >
              {branch}
            </button>
          );
        })}
      </div>

      <div className="service-card" style={{ padding: '24px', background: '#111827', borderRadius: '12px', border: '1px solid #374151' }}>
        <p style={{ fontSize: '0.8rem', color: '#818cf8', fontWeight: 'bold', marginBottom: '8px' }}>
          QUESTION {currentQIndex + 1} OF {questions.length}
        </p>
        <h3 style={{ fontSize: '1.1rem', color: '#f3f4f6', marginBottom: '16px' }}>
          &quot;{questions[currentQIndex]}&quot;
        </h3>

        <form onSubmit={handleEvaluate} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type how you would explain your answer to the examiner..."
            rows={4}
            required
            style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#1f2937', border: '1px solid #4b5563', color: '#fff', fontSize: '0.9rem', boxSizing: 'border-box' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button type="submit" className="button primary" style={{ padding: '8px 16px', fontSize: '0.85rem', cursor: 'pointer' }}>
              Evaluate Answer →
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentQIndex((prev) => (prev + 1) % questions.length);
                setFeedback(null);
                setUserAnswer('');
              }}
              style={{ background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Next Question ↻
            </button>
          </div>
        </form>

        {feedback && (
          <div style={{ marginTop: '20px', padding: '16px', background: '#064e3b', borderRadius: '8px', border: '1px solid #059669' }}>
            <strong style={{ color: '#34d399', display: 'block', marginBottom: '4px' }}>💡 Examiner Feedback: {feedback.score}</strong>
            <p style={{ color: '#ecfdf5', fontSize: '0.9rem', margin: 0 }}>{feedback.text}</p>
          </div>
        )}
      </div>
    </section>
  );
}