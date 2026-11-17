import { useState } from 'react';

const branchArchitectures = {
  CSE: {
    title: "Full-Stack AI & RAG Architecture",
    code: `graph TD\n    A[React Frontend] -->|HTTP / REST| B(FastAPI Gateway)\n    B --> C{LangChain Engine}\n    C -->|Hybrid Search| D[(Pinecone Vector DB)]\n    C --> E[OpenAI LLM API]\n    style A fill:#4f46e5,stroke:#fff,stroke-width:2px\n    style B fill:#059669,stroke:#fff,stroke-width:2px`
  },
  IT: {
    title: "Cloud Native GitOps Pipeline",
    code: `graph LR\n    A[GitHub Repo] -->|Webhook| B(ArgoCD Controller)\n    B --> C[Kubernetes Cluster]\n    C --> D[Prometheus Monitoring]\n    C --> E[Grafana Dashboard]\n    style A fill:#2563eb,stroke:#fff,stroke-width:2px\n    style C fill:#7c3aed,stroke:#fff,stroke-width:2px`
  },
  ECE: {
    title: "Edge IoT & Computer Vision Pipeline",
    code: `graph TD\n    A[Camera / Sensors] -->|MQTT Protocol| B(Jetson Nano Edge Node)\n    B --> C(YOLOv8 & OpenCV Engine)\n    C --> D[Cloud Telemetry Dashboard]\n    style A fill:#0d9488,stroke:#fff,stroke-width:2px\n    style B fill:#d97706,stroke:#fff,stroke-width:2px`
  },
  EEE: {
    title: "Smart Grid Simulation & Control Model",
    code: `graph TD\n    A[Substation Sensors] -->|ESP32 Microcontroller| B(MQTT Broker)\n    B --> C[Python XGBoost Forecaster]\n    C --> D[Substation Load Balancing Relay]\n    style A fill:#dc2626,stroke:#fff,stroke-width:2px\n    style C fill:#4f46e5,stroke:#fff,stroke-width:2px`
  }
};

export default function DiagramGenerator() {
  const [selectedBranch, setSelectedBranch] = useState('CSE');
  const [copied, setCopied] = useState(false);

  const currentArch = branchArchitectures[selectedBranch];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentArch.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section" style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">INTERACTIVE TOOL</p>
          <h2>Architecture Diagram & Mermaid Export</h2>
        </div>
        <p>Generate clean system architecture diagrams for your project synopsis and reports.</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {Object.keys(branchArchitectures).map((branch) => {
          const isActive = selectedBranch === branch;
          return (
            <button
              key={branch}
              type="button"
              onClick={() => setSelectedBranch(branch)}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ color: '#f3f4f6', fontSize: '1.05rem', margin: 0 }}>{currentArch.title}</h3>
          <button
            type="button"
            onClick={handleCopy}
            className="button primary"
            style={{ padding: '6px 14px', fontSize: '0.8rem', cursor: 'pointer' }}
          >
            {copied ? 'Copied Code!' : 'Copy Mermaid Code 📋'}
          </button>
        </div>

        <pre style={{ background: '#030712', padding: '16px', borderRadius: '8px', border: '1px solid #374151', color: '#34d399', fontSize: '0.85rem', overflowX: 'auto', margin: 0 }}>
          <code>{currentArch.code}</code>
        </pre>
        <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '12px', marginBot: 0 }}>
          💡 Tip: You can paste this code directly into <a href="https://mermaid.live" target="_blank" rel="noreferrer" style={{ color: '#818cf8', textDecoration: 'underline' }}>mermaid.live</a> to instantly download it as a high-res PNG for your report.
        </p>
      </div>
    </section>
  );
}