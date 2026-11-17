const branches = ["ALL", "CSE", "ECE", "IT", "EEE"];

export default function ProjectFilter({ selectedBranch, setSelectedBranch }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        margin: '16px 0 24px 0',
      }}
    >
      {branches.map((branch) => {
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
  );
}