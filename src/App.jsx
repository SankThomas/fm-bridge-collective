import Header from "./components/Header"
import ImpactGrid from "./components/ImpactGrid";

export default function App(){
  return (
    <div className="site-shell">
      <Header />

      <main id="top" className="page-grid">
        <section className="intro-panel">
          <div className="intro-content">
            <p className="eyebrow">Education for all</p>

            <h1>
              A classroom <br className="desktop-break" /> for every child.
            </h1>

            <p className="intro-copy">
              We fund the schools, train the teachers, and measure what works —
              so every child we reach today becomes a graduate tomorrow.
            </p>
          </div>
        </section>

        <ImpactGrid />
      </main>

      <footer className="site-footer">
        <span>&copy; {new Date().getFullYear()} Bridge Collective</span>
        <span>Registered charity 12345678</span>
      </footer>
    </div>
  );
}