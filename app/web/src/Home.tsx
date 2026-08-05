interface HomeProps {
  projects: string[];
  onOpen: (id: string) => void;
  onNew: () => void;
}

// CapCut-style project gallery. One card per video project.
export function Home({ projects, onOpen, onNew }: HomeProps) {
  return (
    <div className="home">
      <div className="grid">
        <button className="card new" onClick={onNew}>
          <div className="plus">+</div>
          <div className="name">New video</div>
        </button>
        {projects.map((p) => (
          <button key={p} className="card" onClick={() => onOpen(p)}>
            <div className="thumb" />
            <div className="name">{p}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
