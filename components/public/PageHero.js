export default function PageHero({ icon, eyebrow, title, text }) {
  return (
    <section className="page-hero">
      <div className="container">
        {eyebrow && (
          <div className="eyebrow">
            {icon && <i className={`bi ${icon} me-1`} />}
            {eyebrow}
          </div>
        )}
        <h1 className="fw-bold mb-2">{title}</h1>
        {text && <p className="lead mb-0">{text}</p>}
      </div>
    </section>
  );
}
