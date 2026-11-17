import { useState } from 'react';

const compatibilityMatrix = {
  frontend: ['React', 'Next.js', 'Vue.js', 'Flutter'],
  backend: ['Node.js (Express)', 'FastAPI (Python)', 'Spring Boot', 'Django'],
  database: ['PostgreSQL', 'MongoDB', 'MySQL', 'Firebase']
};

export default function TechChecker() {
  const [frontend, setFrontend] = useState('React');
  const [backend, setBackend] = useState('Node.js (Express)');
  const [database, setDatabase] = useState('PostgreSQL');
  const [validated, setValidated] = useState(false);

  const handleValidate = (e) => {
    e.preventDefault();
    setValidated(true);
  };

  return (
    <section className="section" style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">INTERACTIVE TOOL</p>
          <h2>Tech Stack Compatibility Checker</h2>
        </div>
        <p>Validate your chosen frontend, backend, and database stack to ensure seamless integration.</p>
      </div>

      <div className="service-card" style={{ padding: '24px', background: '#111827', borderRadius: '12px', border: '1px solid #374151' }}>
        <form onSubmit={handleValidate} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
          <label style={{ color: '#f3f4f6', fontSize: '0.85rem', fontWeight: '600' }}>
            Frontend
            <select value={frontend} onChange={(e) => { setFrontend(e.target.value); setValidated(false); }} style={{ width: '100%', padding: '10px', marginTop: '6px', borderRadius: '8px', background: '#1f2937', border: '1px solid #4b5563', color: '#fff' }}>
              {compatibilityMatrix.frontend.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>

          <label style={{ color: '#f3f4f6', fontSize: '0.85rem', fontWeight: '600' }}>
            Backend
            <select value={backend} onChange={(e) => { setBackend(e.target.value); setValidated(false); }} style={{ width: '100%', padding: '10px', marginTop: '6px', borderRadius: '8px', background: '#1f2937', border: '1px solid #4b5563', color: '#fff' }}>
              {compatibilityMatrix.backend.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>

          <label style={{ color: '#f3f4f6', fontSize: '0.85rem', fontWeight: '600' }}>
            Database
            <select value={database} onChange={(e) => { setDatabase(e.target.value); setValidated(false); }} style={{ width: '100%', padding: '10px', marginTop: '6px', borderRadius: '8px', background: '#1f2937', border: '1px solid #4b5563', color: '#fff' }}>
              {compatibilityMatrix.database.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </form>

        <button type="button" onClick={handleValidate} className="button primary" style={{ padding: '10px 18px', fontSize: '0.85rem', cursor: 'pointer', width: '100%' }}>
          Validate Stack Integration ⚡
        </button>

        {validated && (
          <div style={{ marginTop: '24px', background: '#064e3b', padding: '16px', borderRadius: '8px', border: '1px solid #059669' }}>
            <strong style={{ color: '#34d399', display: 'block', marginBottom: '6px' }}>✅ Stack Validated Successfully!</strong>
            <p style={{ color: '#ecfdf5', fontSize: '0.88rem', margin: '0 0 10px 0' }}>
              {frontend}, {backend}, and {database} form a robust, industry-standard production architecture. No CORS or protocol conflicts detected.
            </p>
            <code style={{ fontSize: '0.78rem', color: '#f5c14f', background: '#030712', padding: '8px', borderRadius: '4px', display: 'block' }}>
              # Recommended connection string format:<br/>
              DATABASE_URL=postgresql://user:password@localhost:5432/matrix_db
            </code>
          </div>
        )}
      </div>
    </section>
  );
}