import { useState } from 'react';

const branchSyllabusProjects = {
  CSE: [
    { title: "AI-Powered Automated Code Review & Refactoring Agent", focus: "Software Engineering & LLMs" },
    { title: "Secure Federated Learning Framework for Healthcare Diagnostics", focus: "Data Privacy & AI" }
  ],
  IT: [
    { title: "Multi-Cloud Resource Rightsizing & Cost Optimization Engine", focus: "Cloud Computing & DevOps" },
    { title: "Zero-Trust Microservices Access Control Gateway", focus: "Cybersecurity" }
  ],
  ECE: [
    { title: "Edge-Computed Computer Vision for Smart Traffic Monitoring", focus: "Embedded Systems & YOLOv8" },
    { title: "Cryptographically Secure Firmware Update Pipeline for IoT", focus: "IoT Security" }
  ],
  EEE: [
    { title: "Smart Grid Energy Forecasting & Load-Shedding Simulator", focus: "Power Systems & Machine Learning" },
    { title: "Active Harmonic Suppression Filter Design using PID Control", focus: "Power Electronics" }
  ],
  Mechanical: [
    { title: "IoT-Enabled Predictive Maintenance System for Industrial Motors", focus: "Mechatronics & Sensors" },
    { title: "CFD Analysis of Aerodynamic Drag on Electric Vehicle Chassis", focus: "Thermal & Fluid Engineering" }
  ],
  Civil: [
    { title: "AI-Based Structural Crack Detection & Damage Severity Estimator", focus: "Smart Infrastructure & CV" },
    { title: "BIM-Integrated Construction Waste Minimization Framework", focus: "Construction Management" }
  ]
};

export default function SyllabusRecommender() {
  const [selectedBranch, setSelectedBranch] = useState('CSE');
  const suggestions = branchSyllabusProjects[selectedBranch] || [];

  return (
    <section className="section" style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">UNIVERSAL ACADEMIC TOOL</p>
          <h2>Branch Syllabus & Project Recommender</h2>
        </div>
        <p>Explore curated, university-approved final-year project topics tailored for every engineering branch.</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {Object.keys(branchSyllabusProjects).map((branch) => {
          const isActive = selectedBranch === branch;
          return (
            <button
              key={branch}
              type="button"
              onClick={() => setSelectedBranch(branch)}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: '700',
                cursor: 'pointer',
                border: isActive ? '1px solid #6366f1' : '1px solid #374151',
                backgroundColor: isActive ? '#4f46e5' : '#1f2937',
                color: '#ffffff',
                boxShadow: isActive ? '0 0 10px rgba(79, 70, 229, 0.4)' : 'none',
                transition: 'all 0.15s ease-in-out',
              }}
            >
              {branch}
            </button>
          );
        })}
      </div>

      <div className="service-card" style={{ padding: '24px', background: '#111827', borderRadius: '12px', border: '1px solid #374151' }}>
        <h3 style={{ color: '#f3f4f6', fontSize: '1.05rem', marginBottom: '16px' }}>
          Recommended Topics for {selectedBranch} Students
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {suggestions.map((item, idx) => (
            <div key={idx} style={{ background: '#1f2937', padding: '14px', borderRadius: '8px', border: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <strong style={{ color: '#f5c14f', display: 'block', marginBottom: '4px', fontSize: '0.95rem' }}>{item.title}</strong>
                <span style={{ color: '#9ca3af', fontSize: '0.8rem', background: '#030712', padding: '2px 8px', borderRadius: '4px' }}>Focus: {item.focus}</span>
              </div>
              <a 
                href={`https://wa.me/916281402892?text=${encodeURIComponent(`Hello Matrix, I am from ${selectedBranch} and want guidance on this project topic: ${item.title}`)}`}
                target="_blank" 
                rel="noreferrer"
                className="button primary" 
                style={{ padding: '6px 12px', fontSize: '0.78rem', textDecoration: 'none' }}
              >
                Get Guidance ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}